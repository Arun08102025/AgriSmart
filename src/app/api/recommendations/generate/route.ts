import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { generateCropRecommendations } from "@/lib/gemini";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { soilTestId } = await request.json();

    if (!soilTestId) {
      return NextResponse.json({ error: "soilTestId is required" }, { status: 400 });
    }

    // Fetch the soil test
    const { data: soilTest, error: soilError } = await supabase
      .from("soil_tests")
      .select("*, farms(location_lat, location_lng)")
      .eq("id", soilTestId)
      .eq("farm_id.user_id", user.id) // Ensure ownership conceptually, though RLS handles it
      .single();

    if (soilError || !soilTest) {
      return NextResponse.json({ error: "Soil test not found" }, { status: 404 });
    }

    const location = soilTest.farms ? { lat: soilTest.farms.location_lat, lng: soilTest.farms.location_lng } : null;

    // Generate recommendations using Gemini
    const aiResponse = await generateCropRecommendations(soilTest, location);

    // Filter and map the recommendations to our database schema
    if (aiResponse && aiResponse.recommendations) {
      
      const insertedRecs = [];
      for (const rec of aiResponse.recommendations) {
        // Try to find matching crop
        let { data: crop } = await supabase.from("crops").select("id").ilike("name", `%${rec.crop_name}%`).limit(1).single();
        
        let cropId = crop?.id;
        
        if (!cropId) {
          // Insert new crop if it doesn't exist
           const { data: newCrop } = await supabase.from("crops").insert({
               name: rec.crop_name,
               optimal_ph_min: 0,
               optimal_ph_max: 14,
           }).select("id").single();
           
           cropId = newCrop?.id;
        }

        if (cropId) {
           const { data: insertedRec } = await supabase.from("crop_recommendations").insert({
             soil_test_id: soilTestId,
             crop_id: cropId,
             confidence_score: rec.confidence_score,
             ai_justification: rec.justification,
           }).select("*, crops(name)").single();
           
           if(insertedRec) insertedRecs.push(insertedRec);
        }
      }

      return NextResponse.json({ recommendations: insertedRecs });
    }

    return NextResponse.json({ error: "Failed to parse recommendations" }, { status: 500 });

  } catch (error: unknown) {
    console.error("Generate recommendation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
