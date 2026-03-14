"use client";

import React, { useEffect } from "react";
import "./landing.css";

const exactHtml = `
<div class="bg"><span></span><span></span><span></span></div>

<!-- LANDING -->
<div class="wrap">
  <nav>
    <div class="logo"><i>🌱</i>AgriSmart</div>
    <div class="nav-links">
      <button class="nl" onclick="openAt(1)">Soil Analysis</button>
      <button class="nl" onclick="openAt(2)">AI Crops</button>
      <button class="nl" onclick="openAt(3)">Weather</button>
      <button class="nl" onclick="openAt(4)">Market</button>
    </div>
    <button class="cta-btn" onclick="openAt(1)">Get Started Free 🌾</button>
  </nav>

  <section class="hero">
    <div class="badge"><span class="dot"></span>Powered by Gemini 3.1 Pro · 5 Indian Languages</div>
    <h1>Smart farming starts<br/>with <span class="hl">your soil</span></h1>
    <p class="sub">Enter your soil data, get AI-powered crop recommendations, real-time weather alerts and live market signals — in under 5 minutes.</p>
    <div class="hero-btns">
      <button class="btn-primary" onclick="openAt(1)">🌾 Get Started Free</button>
      <button class="btn-ghost">▶ Watch Demo</button>
    </div>
    <div class="pills">
      <div class="pill"><div class="v">100M+</div><div class="l">Farmers Target</div></div>
      <div class="pill"><div class="v">5 min</div><div class="l">To Recommendation</div></div>
      <div class="pill"><div class="v">15+</div><div class="l">Crops in DB</div></div>
      <div class="pill"><div class="v">5 🇮🇳</div><div class="l">Languages</div></div>
      <div class="pill"><div class="v">Free</div><div class="l">To Start</div></div>
    </div>
  </section>

  <div class="feature-preview">
    <div class="fp" onclick="openAt(1)"><span class="fp-arrow">↗</span><div class="fp-num">01</div><span class="fp-icon">🧪</span><div class="fp-title">Soil Intelligence</div><p class="fp-desc">Enter N-P-K, pH & soil type or upload your lab report PDF. Gemini parses it automatically and scores your soil health.</p></div>
    <div class="fp" onclick="openAt(2)"><span class="fp-arrow">↗</span><div class="fp-num">02</div><span class="fp-icon">🤖</span><div class="fp-title">AI Crop Recommendations</div><p class="fp-desc">Gemini 3.1 Pro cross-matches soil data, weather & seasonal patterns to rank top 3 crops with suitability scores.</p></div>
    <div class="fp" onclick="openAt(3)"><span class="fp-arrow">↗</span><div class="fp-num">03</div><span class="fp-icon">🌤</span><div class="fp-title">Weather Intelligence</div><p class="fp-desc">7-day hyperlocal forecast with drought, flood & frost alerts. Know exactly when to plant and when to protect your crop.</p></div>
    <div class="fp" onclick="openAt(4)"><span class="fp-arrow">↗</span><div class="fp-num">04</div><span class="fp-icon">💰</span><div class="fp-title">Market Intelligence</div><p class="fp-desc">Live mandi prices, regional demand signals and a profit estimator. Grow what will actually sell at the best price.</p></div>
    <div class="fp" onclick="openAt(5)"><span class="fp-arrow">↗</span><div class="fp-num">05</div><span class="fp-icon">🌐</span><div class="fp-title">5 Indian Languages</div><p class="fp-desc">Every recommendation, alert and advisory speaks the farmer's own language — Hindi, Telugu, Kannada, Tamil or English.</p></div>
  </div>
</div>

<!-- OVERLAY -->
<div class="overlay" id="overlay">
  <div class="ov-topbar">
    <div class="ov-logo"><span>🌱</span>AgriSmart</div>
    <div class="steprow">
      <div class="step active" id="st1" onclick="goTo(1)"><div class="snum"><span class="snum-n">1</span></div><div class="slbl">Dashboard</div></div>
      <div class="sconn" id="sc1"></div>
      <div class="step" id="st2" onclick="goTo(2)"><div class="snum"><span class="snum-n">2</span></div><div class="slbl">Soil Analysis</div></div>
      <div class="sconn" id="sc2"></div>
      <div class="step" id="st3" onclick="goTo(3)"><div class="snum"><span class="snum-n">3</span></div><div class="slbl">AI Crops</div></div>
      <div class="sconn" id="sc3"></div>
      <div class="step" id="st4" onclick="goTo(4)"><div class="snum"><span class="snum-n">4</span></div><div class="slbl">Weather</div></div>
      <div class="sconn" id="sc4"></div>
      <div class="step" id="st5" onclick="goTo(5)"><div class="snum"><span class="snum-n">5</span></div><div class="slbl">Market</div></div>
      <div class="sconn" id="sc5"></div>
      <div class="step" id="st6" onclick="goTo(6)"><div class="snum"><span class="snum-n">6</span></div><div class="slbl">Languages</div></div>
    </div>
    <div class="x-btn" onclick="closeOverlay()">✕</div>
  </div>
  <div class="progress-bar"><div class="progress-fill" id="prog" style="width:16.6%"></div></div>

  <div class="ov-content" id="ovcontent">

    <!-- PANEL 1: FARMER DASHBOARD -->
    <div class="panel on" id="p1"><div class="panel-inner"><div class="wrap">
      <div class="shead">
        <div class="stag">🏡 Feature 1 of 6</div>
        <h2>Farmer Dashboard</h2>
        <p>Tell us about your farm — land size, location and what you're currently growing. This lets AgriSmart personalise every recommendation just for you.</p>
      </div>

      <!-- Top summary bar (updates live) -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:32px" id="dashSummary">
        <div class="card r" style="text-align:center;padding:20px">
          <div style="font-size:32px;margin-bottom:8px">🌾</div>
          <div style="font-family:var(--fd);font-size:28px;font-weight:900;color:var(--gm)" id="ds-acres">—</div>
          <div style="font-size:11px;font-weight:800;color:var(--gl);text-transform:uppercase;letter-spacing:.5px">Total Acres</div>
        </div>
        <div class="card r d1" style="text-align:center;padding:20px">
          <div style="font-size:32px;margin-bottom:8px">📍</div>
          <div style="font-family:var(--fd);font-size:18px;font-weight:900;color:var(--gm);min-height:36px;display:flex;align-items:center;justify-content:center" id="ds-loc">—</div>
          <div style="font-size:11px;font-weight:800;color:var(--gl);text-transform:uppercase;letter-spacing:.5px">Location</div>
        </div>
        <div class="card r d2" style="text-align:center;padding:20px">
          <div style="font-size:32px;margin-bottom:8px">🌱</div>
          <div style="font-family:var(--fd);font-size:18px;font-weight:900;color:var(--gm);min-height:36px;display:flex;align-items:center;justify-content:center" id="ds-plots">—</div>
          <div style="font-size:11px;font-weight:800;color:var(--gl);text-transform:uppercase;letter-spacing:.5px">Active Plots</div>
        </div>
        <div class="card r d3" style="text-align:center;padding:20px">
          <div style="font-size:32px;margin-bottom:8px">🌿</div>
          <div style="font-family:var(--fd);font-size:18px;font-weight:900;color:var(--gm);min-height:36px;display:flex;align-items:center;justify-content:center" id="ds-crops">—</div>
          <div style="font-size:11px;font-weight:800;color:var(--gl);text-transform:uppercase;letter-spacing:.5px">Crops Growing</div>
        </div>
      </div>

      <!-- Farm details form -->
      <div style="display:grid;grid-template-columns:1.1fr .9fr;gap:28px;align-items:start">
        <div class="card r">
          <div class="card-head"><div class="card-ico">🏡</div><div><div class="card-ttl">Farm Profile</div><div class="card-sub">Enter your farm details to get started</div></div></div>

          <div class="row2">
            <div class="fg"><label class="lbl">👨🌾 Farmer Name</label><input class="inp" type="text" id="d-name" placeholder="e.g. Ravi Kumar" oninput="updateDash()"></div>
            <div class="fg"><label class="lbl">📱 Mobile Number</label><input class="inp" type="tel" id="d-phone" placeholder="+91 98765 43210"></div>
          </div>

          <div class="row2">
            <div class="fg"><label class="lbl">📍 Village / Town</label><input class="inp" type="text" id="d-village" placeholder="e.g. Puttur" oninput="updateDash()"></div>
            <div class="fg"><label class="lbl">🗺 District</label><input class="inp" type="text" id="d-district" placeholder="e.g. Dakshina Kannada" oninput="updateDash()"></div>
          </div>

          <div class="row2">
            <div class="fg"><label class="lbl">🏛 State</label>
              <select class="sel" id="d-state" onchange="updateDash()">
                <option value="">Select State</option>
                <option>Karnataka</option><option>Telangana</option><option>Andhra Pradesh</option>
                <option>Tamil Nadu</option><option>Kerala</option><option>Maharashtra</option>
                <option>Madhya Pradesh</option><option>Uttar Pradesh</option><option>Punjab</option><option>Rajasthan</option>
              </select>
            </div>
            <div class="fg"><label class="lbl">🌍 GPS Coordinates</label><input class="inp" type="text" id="d-gps" placeholder="e.g. 12.8703, 74.8436" oninput="updateDash()"></div>
          </div>

          <div class="fg" style="margin-bottom:16px">
            <label class="lbl">📐 Total Farm Area (Acres)</label>
            <input class="inp" type="number" id="d-acres" placeholder="e.g. 4.5" oninput="updateDash()">
          </div>

          <div class="fg" style="margin-bottom:0">
            <label class="lbl">🌐 Preferred Language</label>
            <select class="sel" id="d-lang">
              <option>English</option><option>हिंदी (Hindi)</option><option>తెలుగు (Telugu)</option>
              <option>ಕನ್ನಡ (Kannada)</option><option>தமிழ் (Tamil)</option>
            </select>
          </div>
        </div>

        <!-- Right: Plot cards -->
        <div style="display:flex;flex-direction:column;gap:16px">
          <div class="card r d1">
            <div class="card-ttl" style="margin-bottom:14px">🌾 Add Your Plots</div>
            <div id="plotList" style="display:flex;flex-direction:column;gap:10px;margin-bottom:14px"></div>
            <button class="btn-full" onclick="addPlot()" style="background:var(--g4);color:var(--gm);border-color:var(--g3);box-shadow:none;font-size:14px;padding:11px">
              + Add Another Plot
            </button>
          </div>

          <!-- Live map-style location card -->
          <div class="card r d2" style="background:linear-gradient(145deg,var(--gm),var(--gd));border-color:var(--gd);color:#fff">
            <div style="font-size:13px;font-weight:700;opacity:.65;margin-bottom:6px">📍 Farm Location</div>
            <div style="font-family:var(--fd);font-size:20px;font-weight:900;margin-bottom:4px" id="loc-village-display">Your village will appear here</div>
            <div style="font-size:13px;opacity:.7" id="loc-state-display">Enter village & state above</div>
            <div style="margin-top:14px;background:rgba(255,255,255,.12);border-radius:14px;padding:12px;font-size:12px;font-weight:600;line-height:1.6" id="loc-gps-display">
              GPS: Not set · Click fields above to personalise
            </div>
          </div>
        </div>
      </div>

      <!-- Soil Intelligence unlock button (only active after form is filled) -->
      <div style="margin-top:32px;background:var(--white);border:3px solid var(--g3);border-radius:var(--r);padding:24px;display:flex;align-items:center;justify-content:space-between;gap:20px;box-shadow:var(--sh)" id="soilUnlockBar">
        <div>
          <div style="font-family:var(--fd);font-size:17px;font-weight:900;color:var(--gd)">🔒 Soil Intelligence — Next Step</div>
          <div style="font-size:13px;font-weight:600;color:var(--gl);margin-top:3px" id="unlockHint">Fill in your farm details and at least one plot to unlock</div>
        </div>
        <button class="btn-full" id="soilUnlockBtn" onclick="goTo(2)" style="width:auto;padding:13px 28px;background:var(--g3);color:var(--gm);border-color:var(--g3);box-shadow:none;cursor:not-allowed;opacity:.7" disabled>
          🔒 Unlock Soil Analysis
        </button>
      </div>

      <div class="pnav">
        <div style="font-size:13px;font-weight:700;color:var(--gl);display:flex;align-items:center;gap:8px"><span style="font-size:18px">🏡</span>Step 1 of 6 — Set up your farm</div>
        <button class="pnav-btn pnav-next" id="dashNextBtn" onclick="goTo(2)" style="opacity:.5;cursor:not-allowed" disabled>Save Dashboard &amp; Continue → Soil Analysis 🧪</button>
      </div>
    </div></div></div>

    <!-- PANEL 2: SOIL (was p1) -->
    <div class="panel" id="p2"><div class="panel-inner"><div class="wrap">
      <div class="shead"><div class="stag">🧪 Feature 2 of 6</div><h2>Soil Intelligence</h2><p>Enter your N-P-K values, pH & soil type — or upload your lab report PDF. Gemini reads it automatically and gives you an instant soil health score.</p></div>
      <div style="display:grid;grid-template-columns:1.1fr .9fr;gap:28px;align-items:start">
        <div class="card r">
          <div class="card-head"><div class="card-ico">🧪</div><div><div class="card-ttl">Soil Test Input</div><div class="card-sub">Enter your latest lab values</div></div></div>
          <div class="row3">
            <div class="fg"><label class="lbl">🟢 Nitrogen (N)</label><input class="inp" type="number" id="nit" value="240" oninput="updateBars()"></div>
            <div class="fg"><label class="lbl">🟡 Phosphorus (P)</label><input class="inp" type="number" id="pho" value="180" oninput="updateBars()"></div>
            <div class="fg"><label class="lbl">🔵 Potassium (K)</label><input class="inp" type="number" id="pot" value="310" oninput="updateBars()"></div>
          </div>
          <div class="ph-wrap fg">
            <label class="lbl ph-lbl-row">⚗️ Soil pH <span class="ph-pill" id="phD">6.5</span></label>
            <input type="range" min="0" max="14" step="0.1" value="6.5" id="phR" oninput="updatePh(this.value)">
            <div class="ph-scale"><span>0 — Acidic</span><span>7 — Neutral</span><span>14 — Alkaline</span></div>
          </div>
          <div class="row2" style="margin-top:14px">
            <div class="fg"><label class="lbl">🏔 Soil Type</label><select class="sel"><option>Loamy</option><option>Sandy</option><option>Clay</option><option>Silty</option><option>Peaty</option></select></div>
            <div class="fg"><label class="lbl">📅 Season</label><select class="sel"><option>Kharif (Jun–Oct)</option><option>Rabi (Nov–Mar)</option><option>Zaid (Apr–Jun)</option></select></div>
          </div>
          <div class="upload" onclick="this.children[1].textContent='✅ Lab report uploaded successfully!'">
            <div style="font-size:28px;margin-bottom:7px">📄</div>
            <div style="font-size:13px;font-weight:700;color:var(--gm)">Upload Lab Report PDF (optional)</div>
            <div style="font-size:11px;color:var(--gl);margin-top:3px">Max 10MB · Gemini 3.1 Pro extracts N-P-K values automatically</div>
          </div>
          <button class="btn-full" onclick="doAnalyse()">🔬 Analyse Soil &amp; Get AI Recommendations →</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:18px">
          <div class="card r d1">
            <div class="card-ttl" style="margin-bottom:14px">📂 Soil Test History</div>
            <div class="hist"><div class="hdot" style="background:var(--g2)"></div><div><div class="hname">North Field — Plot A</div><div class="hdate">15 Feb 2025</div></div><div class="htag">Latest</div></div>
            <div class="hist"><div class="hdot" style="background:var(--gold)"></div><div><div class="hname">South Field — Plot B</div><div class="hdate">12 Jan 2025</div></div><div class="htag">Jan</div></div>
            <div class="hist"><div class="hdot" style="background:var(--gl)"></div><div><div class="hname">East Field — Plot C</div><div class="hdate">5 Oct 2024</div></div><div class="htag">Oct</div></div>
          </div>
          <div class="card r d2">
            <div class="card-ttl" style="margin-bottom:14px">📊 Nutrient Levels</div>
            <div class="bar-row"><div class="bar-lbl"><span>🟢 Nitrogen</span><span id="nv">240 ppm</span></div><div class="bar-track"><div class="bar-fill bf-n" id="nb" style="width:72%"></div></div></div>
            <div class="bar-row"><div class="bar-lbl"><span>🟡 Phosphorus</span><span id="pv">180 ppm</span></div><div class="bar-track"><div class="bar-fill bf-p" id="pb" style="width:54%"></div></div></div>
            <div class="bar-row"><div class="bar-lbl"><span>🔵 Potassium</span><span id="kv">310 ppm</span></div><div class="bar-track"><div class="bar-fill bf-k" id="kb" style="width:88%"></div></div></div>
            <div class="bar-row"><div class="bar-lbl"><span>⚗️ pH</span><span id="phv">6.5</span></div><div class="bar-track"><div class="bar-fill bf-ph" id="phb" style="width:46%"></div></div></div>
            <div class="score-box"><div class="score-num">84</div><div><div class="score-title">Soil Health Score</div><div class="score-sub">Good · Suitable for high-value crops</div></div></div>
          </div>
        </div>
      </div>
      <div class="pnav">
        <button class="pnav-btn pnav-back" onclick="goTo(1)">← Back to Dashboard</button>
        <button class="pnav-btn pnav-next" onclick="doAnalyse()">Analyse &amp; Continue → AI Crops 🤖</button>
      </div>
    </div></div></div>
    <!-- PANEL 3: AI CROPS (was p2) -->
    <div class="panel" id="p3"><div class="panel-inner"><div class="wrap">
      <div class="shead"><div class="stag">🤖 Feature 3 of 6</div><h2>AI Crop Recommendations</h2><p>Gemini 3.1 Pro cross-matches your soil data with the 7-day weather forecast and seasonal patterns to rank the top 3 crops — with full reasoning.</p></div>
      <div class="ai-loader" id="aiLoader">
        <div style="font-size:44px;margin-bottom:12px">🧠</div>
        <div style="font-family:var(--fd);font-size:22px;font-weight:900;color:var(--gd)">Gemini 3.1 Pro is analysing your soil…</div>
        <div class="tdots"><div class="td"></div><div class="td"></div><div class="td"></div></div>
        <div style="font-size:13px;color:var(--gm);font-weight:600">Cross-referencing N-P-K · Checking 7-day rainfall · Scanning mandi prices</div>
      </div>
      <div id="recoWrap">
        <div class="crop-grid">
          <div class="crop-card top r">
            <div class="rpin">🥇 Best Match</div><span class="crop-em">🥭</span>
            <div class="crop-name">Mango</div><div class="crop-local">आम · మామిడి · ಮಾವು · மாம்பழம்</div>
            <div class="ring-wrap"><div class="ring"><svg viewBox="0 0 64 64" width="64" height="64"><circle class="rb" cx="32" cy="32" r="26"/><circle class="rf" cx="32" cy="32" r="26" stroke-dasharray="163.4" stroke-dashoffset="13.1" style="stroke:var(--gold)"/></svg><div class="ring-n">92%</div></div><div><div class="ri-lbl">Suitability Score</div><div class="ri-txt">High potassium (310 ppm) matches mango's requirements. pH 6.5 is perfect.</div></div></div>
            <div class="ctags"><span class="ctag">💧 Low Water</span><span class="ctag">📅 180 days</span><span class="ctag gold">💰 High Value</span></div>
            <div class="mkt-row"><span class="mkt-lbl">Market Signal</span><span class="mkt-val" style="color:var(--gm)">High Demand 🟢</span></div>
          </div>
          <div class="crop-card r d1">
            <div class="rpin">🥈 Good Match</div><span class="crop-em">🌽</span>
            <div class="crop-name">Maize</div><div class="crop-local">मक्का · మొక్కజొన్న · ಜೋಳ · சோளம்</div>
            <div class="ring-wrap"><div class="ring"><svg viewBox="0 0 64 64" width="64" height="64"><circle class="rb" cx="32" cy="32" r="26"/><circle class="rf" cx="32" cy="32" r="26" stroke-dasharray="163.4" stroke-dashoffset="40.9"/></svg><div class="ring-n">75%</div></div><div><div class="ri-lbl">Suitability Score</div><div class="ri-txt">Nitrogen (240 ppm) ideal for kharif maize. Quick 90-day cycle.</div></div></div>
            <div class="ctags"><span class="ctag">💧 Medium Water</span><span class="ctag">📅 90 days</span><span class="ctag">📈 Stable</span></div>
            <div class="mkt-row"><span class="mkt-lbl">Market Signal</span><span class="mkt-val" style="color:var(--gl)">Stable Prices 🟡</span></div>
          </div>
          <div class="crop-card r d2">
            <div class="rpin">🥉 Alternative</div><span class="crop-em">🌻</span>
            <div class="crop-name">Sunflower</div><div class="crop-local">सूरजमुखी · పొద్దుతిరుగుడు · ಸೂರ್ಯಕಾಂತಿ · சூரியகாந்தி</div>
            <div class="ring-wrap"><div class="ring"><svg viewBox="0 0 64 64" width="64" height="64"><circle class="rb" cx="32" cy="32" r="26"/><circle class="rf" cx="32" cy="32" r="26" stroke-dasharray="163.4" stroke-dashoffset="62.1"/></svg><div class="ring-n">62%</div></div><div><div class="ri-lbl">Suitability Score</div><div class="ri-txt">Drought-tolerant. Good phosphorus match for sandy-loam soil.</div></div></div>
            <div class="ctags"><span class="ctag">💧 Low Water</span><span class="ctag">📅 100 days</span><span class="ctag">🌿 Organic</span></div>
            <div class="mkt-row"><span class="mkt-lbl">Market Signal</span><span class="mkt-val" style="color:var(--gold)">Growing Demand 🟠</span></div>
          </div>
        </div>
        <div class="advisory r">
          <div class="card-head"><div class="card-ico">🤖</div><div><div class="card-ttl">Gemini 3.1 Pro Advisory</div><div class="card-sub">AI-generated seasonal farming insight</div></div></div>
          <div class="adv-body">🌾 <strong>Kharif Season Advisory:</strong> Your loamy soil with pH 6.5 and high potassium (310 ppm) is in excellent condition. Mango is your strongest bet — K levels support deep root anchoring and fruit quality.<br/><br/>⚠️ <strong>Nutrient Watch:</strong> Phosphorus is moderate (180 ppm). Apply DAP 3 weeks before sowing maize. Avoid over-irrigation — heavy rain forecast this weekend.<br/><br/>💰 <strong>Market Tip:</strong> Alphonso mango from Karnataka commands premium prices in Bengaluru and Mumbai. Consider APMC direct procurement registration.</div>
        </div>
        <div style="text-align:center" class="r">
          <button class="gen-btn" onclick="regenAI()"><span class="spk">✨</span>Regenerate with New Parameters<span class="spk">✨</span></button>
        </div>
      </div>
      <div class="pnav">
        <button class="pnav-btn pnav-back" onclick="goTo(2)">← Back to Soil</button>
        <button class="pnav-btn pnav-next" onclick="goTo(4)">Continue → Weather Intelligence 🌤</button>
      </div>
    </div></div></div>

    <!-- PANEL 4: WEATHER (was p3) -->
    <div class="panel" id="p4"><div class="panel-inner"><div class="wrap">
      <div class="shead"><div class="stag">🌤 Feature 4 of 6</div><h2>Weather Intelligence</h2><p>Hyperlocal 7-day forecast plus drought, flood and frost alerts — powered by OpenWeatherMap for your exact farm GPS coordinates.</p></div>
      <div class="wx-grid">
        <div class="wx-card r">
          <div class="wx-loc">📍 Mangaluru, Karnataka — Farm Location</div>
          <div class="wx-date">Saturday, 14 March 2026 · Kharif Season</div>
          <div class="wx-top"><div class="wx-em">⛅</div><div><div class="wx-temp">28°C</div><div class="wx-desc">Partly Cloudy · Good for farming</div></div></div>
          <div class="wx-dets">
            <div class="wxd"><div class="v">72%</div><div class="l">Humidity</div></div>
            <div class="wxd"><div class="v">12mm</div><div class="l">Rainfall</div></div>
            <div class="wxd"><div class="v">14 km/h</div><div class="l">Wind</div></div>
          </div>
          <div class="fc-strip">
            <div class="fcd today"><div class="dn">TODAY</div><div class="di">⛅</div><div class="dt">28°</div><div class="dr">12mm</div></div>
            <div class="fcd"><div class="dn">SAT</div><div class="di">🌧</div><div class="dt">25°</div><div class="dr">38mm</div></div>
            <div class="fcd"><div class="dn">SUN</div><div class="di">🌧</div><div class="dt">24°</div><div class="dr">42mm</div></div>
            <div class="fcd"><div class="dn">MON</div><div class="di">🌤</div><div class="dt">27°</div><div class="dr">5mm</div></div>
            <div class="fcd"><div class="dn">TUE</div><div class="di">☀️</div><div class="dt">31°</div><div class="dr">0mm</div></div>
            <div class="fcd"><div class="dn">WED</div><div class="di">🌤</div><div class="dt">30°</div><div class="dr">2mm</div></div>
            <div class="fcd"><div class="dn">THU</div><div class="di">☀️</div><div class="dt">32°</div><div class="dr">0mm</div></div>
          </div>
        </div>
        <div class="alertz">
          <div class="al warn r d1">
            <div class="al-top"><div class="al-ico">⚠️</div><div class="al-title">Heavy Rain Alert</div><div class="al-badge">Sat–Sun</div></div>
            <div class="al-body">38–42mm expected this weekend. Avoid pesticide application. Clear drainage channels to prevent waterlogging.</div>
          </div>
          <div class="al good r d2">
            <div class="al-top"><div class="al-ico">🌿</div><div class="al-title">Optimal Planting Window</div><div class="al-badge">Mon–Tue</div></div>
            <div class="al-body">Clear skies Mon–Tue are ideal for sowing maize or transplanting mango saplings. Temperature in optimal 27–31°C range.</div>
          </div>
          <div class="seasonal r d3">
            <div style="font-family:var(--fd);font-size:16px;font-weight:900;color:var(--gd);margin-bottom:15px">📅 30-Day Seasonal Outlook</div>
            <div class="sb-row"><div class="sb-lbl"><span>🌧 Cumulative Rainfall</span><span>92mm</span></div><div class="sb-track"><div class="sb-fill" style="width:65%;background:linear-gradient(90deg,var(--g2),var(--gm))"></div></div></div>
            <div class="sb-row"><div class="sb-lbl"><span>🌡 Avg Temperature</span><span>29°C</span></div><div class="sb-track"><div class="sb-fill" style="width:72%;background:linear-gradient(90deg,#FFD166,var(--gold))"></div></div></div>
            <div class="sb-row"><div class="sb-lbl"><span>☀️ Sunshine Hours</span><span>7.2h/day</span></div><div class="sb-track"><div class="sb-fill" style="width:80%;background:linear-gradient(90deg,var(--g1),var(--gd))"></div></div></div>
            <div style="margin-top:13px;background:var(--g4);border-radius:13px;padding:11px 14px">
              <div style="font-size:13px;font-weight:700;color:var(--gm)">🌾 Verdict: <strong style="color:var(--gd)">Good for Kharif Crops</strong></div>
              <div style="font-size:11px;color:var(--gl);margin-top:3px">Adequate rainfall · No drought risk in next 30 days</div>
            </div>
          </div>
        </div>
      </div>
      <div class="pnav">
        <button class="pnav-btn pnav-back" onclick="goTo(3)">← Back to AI Crops</button>
        <button class="pnav-btn pnav-next" onclick="goTo(5)">Continue → Market Intelligence 💰</button>
      </div>
    </div></div></div>

    <!-- PANEL 5: MARKET (was p4) -->
    <div class="panel" id="p5"><div class="panel-inner"><div class="wrap">
      <div class="shead"><div class="stag">💰 Feature 5 of 6</div><h2>Market Intelligence</h2><p>Live mandi prices, regional demand signals, FPO coordination and a real-time profit estimator — so you always grow what sells.</p></div>
      <div class="mkt-grid">
        <div class="card r">
          <div class="card-head"><div class="card-ico">📈</div><div><div class="card-ttl">Live Mandi Prices</div><div class="card-sub">Karnataka APMC · Updated 2hrs ago</div></div></div>
          <div class="price-row"><div class="pr-l"><div class="pr-em">🥭</div><div><div class="pr-nm">Alphonso Mango</div><div class="pr-rg">Bengaluru APMC</div></div></div><div class="pr-r"><div class="pr-val">₹4,200/qt</div><div class="pr-chg up">▲ 12.4% this week</div></div></div>
          <div class="price-row"><div class="pr-l"><div class="pr-em">🌽</div><div><div class="pr-nm">Maize (Yellow)</div><div class="pr-rg">Mangaluru Mandi</div></div></div><div class="pr-r"><div class="pr-val">₹1,840/qt</div><div class="pr-chg up">▲ 3.1%</div></div></div>
          <div class="price-row"><div class="pr-l"><div class="pr-em">🌻</div><div><div class="pr-nm">Sunflower Seed</div><div class="pr-rg">Dharwad APMC</div></div></div><div class="pr-r"><div class="pr-val">₹5,600/qt</div><div class="pr-chg up">▲ 8.7%</div></div></div>
          <div class="price-row"><div class="pr-l"><div class="pr-em">🧅</div><div><div class="pr-nm">Onion (Red)</div><div class="pr-rg">Hubli Mandi</div></div></div><div class="pr-r"><div class="pr-val">₹2,100/qt</div><div class="pr-chg dn2">▼ 5.2%</div></div></div>
          <div class="price-row"><div class="pr-l"><div class="pr-em">🍅</div><div><div class="pr-nm">Tomato</div><div class="pr-rg">Chikkaballapur</div></div></div><div class="pr-r"><div class="pr-val">₹1,200/qt</div><div class="pr-chg dn2">▼ 18.3% — Oversupplied</div></div></div>
        </div>
        <div class="card r d1">
          <div class="card-head"><div class="card-ico">🧮</div><div><div class="card-ttl">Profit Estimator</div><div class="card-sub">Quick break-even calculator</div></div></div>
          <div class="fg" style="margin-bottom:12px"><label class="lbl">🌱 Crop</label><select class="sel" id="cropSel" onchange="calcProfit()"><option value="4200">🥭 Mango — ₹4,200/qt</option><option value="1840">🌽 Maize — ₹1,840/qt</option><option value="5600">🌻 Sunflower — ₹5,600/qt</option></select></div>
          <div class="row2"><div class="fg"><label class="lbl">📐 Land (Acres)</label><input class="inp" type="number" id="acres" value="2" oninput="calcProfit()"></div><div class="fg"><label class="lbl">📦 Yield (qt/ac)</label><input class="inp" type="number" id="yld" value="18" oninput="calcProfit()"></div></div>
          <div class="row2"><div class="fg"><label class="lbl">💸 Input Cost (₹)</label><input class="inp" type="number" id="cost" value="12000" oninput="calcProfit()"></div><div class="fg"><label class="lbl">👷 Labour Cost (₹)</label><input class="inp" type="number" id="labour" value="8000" oninput="calcProfit()"></div></div>
          <div class="pr-res" id="profitRes"><div style="font-size:12px;opacity:.7;margin-bottom:5px">Estimated Net Profit</div><div class="pr-est" id="profitNum">₹1,31,200</div><div style="font-size:12px;opacity:.6;margin-top:4px">for 2 acres · after all costs</div></div>
        </div>
        <div class="card r d2">
          <div class="card-head"><div class="card-ico">🗺</div><div><div class="card-ttl">Regional Demand Signals</div><div class="card-sub">South India · March 2026</div></div></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:11px">
            <div style="background:var(--g4);border:2px solid var(--g3);border-radius:17px;padding:15px;text-align:center"><div style="font-size:26px;margin-bottom:6px">🥭</div><div style="font-family:var(--fd);font-size:14px;font-weight:900;color:var(--gd)">Mango</div><div style="margin:7px 0;height:9px;background:var(--g3);border-radius:10px;overflow:hidden"><div style="width:88%;height:100%;background:linear-gradient(90deg,var(--g2),var(--gm));border-radius:10px"></div></div><div style="font-size:10px;font-weight:800;color:var(--gl)">88% Demand Score</div></div>
            <div style="background:var(--gl2);border:2px solid var(--gold);border-radius:17px;padding:15px;text-align:center"><div style="font-size:26px;margin-bottom:6px">🌻</div><div style="font-family:var(--fd);font-size:14px;font-weight:900;color:var(--gd)">Sunflower</div><div style="margin:7px 0;height:9px;background:#FDE8A0;border-radius:10px;overflow:hidden"><div style="width:74%;height:100%;background:linear-gradient(90deg,#FFD166,var(--gold));border-radius:10px"></div></div><div style="font-size:10px;font-weight:800;color:var(--gld)">74% Demand Score</div></div>
            <div style="background:var(--g5);border:2px solid var(--g4);border-radius:17px;padding:15px;text-align:center"><div style="font-size:26px;margin-bottom:6px">🌽</div><div style="font-family:var(--fd);font-size:14px;font-weight:900;color:var(--gd)">Maize</div><div style="margin:7px 0;height:9px;background:var(--g4);border-radius:10px;overflow:hidden"><div style="width:62%;height:100%;background:linear-gradient(90deg,var(--g2),var(--gm));border-radius:10px"></div></div><div style="font-size:10px;font-weight:800;color:var(--gl)">62% Demand Score</div></div>
            <div style="background:var(--redl);border:2px solid #FBBCBC;border-radius:17px;padding:15px;text-align:center"><div style="font-size:26px;margin-bottom:6px">🍅</div><div style="font-family:var(--fd);font-size:14px;font-weight:900;color:var(--gd)">Tomato</div><div style="margin:7px 0;height:9px;background:#FDD;border-radius:10px;overflow:hidden"><div style="width:28%;height:100%;background:linear-gradient(90deg,#FF9999,var(--red));border-radius:10px"></div></div><div style="font-size:10px;font-weight:800;color:var(--red)">28% — Oversupplied</div></div>
          </div>
        </div>
        <div class="card r d3">
          <div class="card-head"><div class="card-ico">🤝</div><div><div class="card-ttl">FPO Coordination</div><div class="card-sub">47 members · Mangaluru Cooperative</div></div></div>
          <p style="font-size:13px;font-weight:600;color:var(--gm);margin-bottom:14px;line-height:1.6">Crop distribution across your cooperative prevents market glut and stabilises income for all members:</p>
          <div style="display:flex;flex-direction:column;gap:9px">
            <div style="display:flex;align-items:center;gap:11px;padding:10px 13px;background:var(--g4);border-radius:14px"><span style="font-size:19px">🥭</span><div style="flex:1"><div style="font-size:12px;font-weight:800;color:var(--gd)">Mango — 18 farmers</div><div style="height:7px;background:var(--g3);border-radius:10px;margin-top:5px;overflow:hidden"><div style="width:38%;height:100%;background:var(--gm);border-radius:10px"></div></div></div><span style="font-size:12px;font-weight:900;color:var(--gl)">38%</span></div>
            <div style="display:flex;align-items:center;gap:11px;padding:10px 13px;background:var(--g4);border-radius:14px"><span style="font-size:19px">🌽</span><div style="flex:1"><div style="font-size:12px;font-weight:800;color:var(--gd)">Maize — 15 farmers</div><div style="height:7px;background:var(--g3);border-radius:10px;margin-top:5px;overflow:hidden"><div style="width:32%;height:100%;background:var(--gm);border-radius:10px"></div></div></div><span style="font-size:12px;font-weight:900;color:var(--gl)">32%</span></div>
            <div style="display:flex;align-items:center;gap:11px;padding:10px 13px;background:var(--gl2);border:1.5px solid var(--gold);border-radius:14px"><span style="font-size:19px">🌻</span><div style="flex:1"><div style="font-size:12px;font-weight:800;color:var(--gd)">Sunflower — 14 farmers</div><div style="height:7px;background:#FDE8A0;border-radius:10px;margin-top:5px;overflow:hidden"><div style="width:30%;height:100%;background:var(--gold);border-radius:10px"></div></div></div><span style="font-size:12px;font-weight:900;color:var(--gld)">30%</span></div>
          </div>
          <div style="margin-top:13px;font-size:12px;font-weight:700;color:var(--gl)">✅ Balanced distribution — no oversupply risk this season</div>
        </div>
      </div>
      <div class="pnav">
        <button class="pnav-btn pnav-back" onclick="goTo(4)">← Back to Weather</button>
        <button class="pnav-btn pnav-next" onclick="goTo(6)">Continue → Languages 🌐</button>
      </div>
    </div></div></div>
    <!-- PANEL 6: LANGUAGES (was p5) -->
    <div class="panel" id="p6"><div class="panel-inner"><div class="wrap">
      <div class="shead"><div class="stag">🌐 Feature 6 of 6</div><h2>5 Indian Languages</h2><p>Gemini responds in the farmer's own language. Every recommendation, weather alert and market advisory is fully localised. Tap a language to see it live.</p></div>
      <div class="lang-grid">
        <div class="lcard sel" onclick="setLang('en',this)"><div class="lflag">🇬🇧</div><div class="lname">English</div><div class="lscript">English</div></div>
        <div class="lcard" onclick="setLang('hi',this)"><div class="lflag">🇮🇳</div><div class="lname">Hindi</div><div class="lscript">हिंदी</div></div>
        <div class="lcard" onclick="setLang('te',this)"><div class="lflag">🌾</div><div class="lname">Telugu</div><div class="lscript">తెలుగు</div></div>
        <div class="lcard" onclick="setLang('kn',this)"><div class="lflag">🏔</div><div class="lname">Kannada</div><div class="lscript">ಕನ್ನಡ</div></div>
        <div class="lcard" onclick="setLang('ta',this)"><div class="lflag">🌊</div><div class="lname">Tamil</div><div class="lscript">தமிழ்</div></div>
      </div>
      <div class="demo r">
        <div style="font-size:13px;font-weight:700;color:var(--gl);margin-bottom:8px">🤖 Live AI Recommendation Preview</div>
        <div class="demo-crop" id="dCrop">🥭 Mango</div>
        <div class="demo-adv" id="dAdv">Your loamy soil with pH 6.5 and high potassium (310 ppm) is ideal for mango cultivation this Kharif season. Expected yield: 18–22 quintals per acre. Apply DAP before sowing complementary maize.</div>
        <div class="demo-lang" id="dLang">🌐 Displaying in English</div>
      </div>

      <!-- FINAL SUMMARY — no Get Started Free button -->
      <div class="final-cta r d1">
        <div style="font-size:54px;margin-bottom:14px">🎉</div>
        <div style="font-family:var(--fd);font-size:36px;font-weight:900;color:var(--gd);margin-bottom:12px">You've explored all 5 features!</div>
        <div style="font-size:15px;font-weight:600;color:var(--gm);max-width:500px;margin:0 auto 28px;line-height:1.7">AgriSmart gives every Indian farmer the power of AI — soil intelligence, crop matching, weather foresight, market data and their own language. All in one platform.</div>
        <button class="btn-ghost" onclick="goTo(1)" style="margin:0 auto">↩ Explore Features Again</button>
      </div>

      <div class="pnav">
        <button class="pnav-btn pnav-back" onclick="goTo(5)">← Back to Market</button>
        <button class="pnav-btn pnav-back" onclick="closeOverlay()" style="border-color:var(--gd);color:var(--gd)">✕ Close</button>
      </div>
    </div></div></div>

  </div>
</div>
`;

export default function ExactPage() {
  useEffect(() => {
    const win = window as any;

    win.openAt = function(n: number) {
      document.getElementById('overlay')?.classList.add('open','animIn');
      document.body.style.overflow='hidden';
      setTimeout(()=>document.getElementById('overlay')?.classList.remove('animIn'),500);
      win.cur=0; win.goTo(n);
    }
    
    win.closeOverlay = function() {
      document.getElementById('overlay')?.classList.remove('open');
      document.body.style.overflow='';
    }
    
    win.cur=1;
    const TOTAL=6;
    
    win.goTo = function(n: number) {
      if(win.cur>=1){
        document.getElementById('p'+win.cur)?.classList.remove('on');
        document.getElementById('st'+win.cur)?.classList.remove('active');
        if(n>win.cur)document.getElementById('st'+win.cur)?.classList.add('done');
        else document.getElementById('st'+win.cur)?.classList.remove('done');
      }
      win.cur=n;
      const panel=document.getElementById('p'+n);
      if(panel) panel.classList.add('on');
      document.getElementById('st'+n)?.classList.add('active');
      document.getElementById('st'+n)?.classList.remove('done');
      const prog = document.getElementById('prog');
      if (prog) prog.style.width=((n/TOTAL)*100)+'%';
      for(let i=1;i<=5;i++) document.getElementById('sc'+i)?.classList.toggle('lit',i<n);
      const ov = document.getElementById('ovcontent');
      if (ov) ov.scrollTo({top:0,behavior:'smooth'});
      setTimeout(()=>{
        panel?.querySelectorAll('.r').forEach(el=>{
          el.classList.remove('v');
          void (el as HTMLElement).offsetWidth;
          setTimeout(()=>el.classList.add('v'),60);
        });
      },80);
    }

    win.plots=[];
    const CROP_OPTIONS=['🥭 Mango','🌽 Maize','🌻 Sunflower','🍅 Tomato','🌶 Chilli','🧅 Onion','🍚 Paddy','🌾 Wheat','🫘 Soybean','🥜 Groundnut','🌿 Cotton','☕ Coffee'];
    
    win.addPlot = function(){
      const id=win.plots.length+1;
      win.plots.push({id,acres:'',crop:''});
      win.renderPlots();
    }
    
    win.renderPlots = function(){
      const list=document.getElementById('plotList');
      if (!list) return;
      if(!win.plots.length){
        list.innerHTML='<div style="text-align:center;padding:18px;color:var(--gl);font-size:13px;font-weight:600">No plots added yet.<br/>Click below to add your first plot.</div>';
        return;
      }
      list.innerHTML=win.plots.map((p:any,i:number)=>`
        <div style="background:var(--g5);border:2px solid var(--g3);border-radius:16px;padding:13px 14px">
          <div style="font-size:11px;font-weight:900;color:var(--gl);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Plot ${p.id}</div>
          <div style="display:grid;grid-template-columns:1fr 1fr auto;gap:9px;align-items:center">
            <input class="inp" type="number" placeholder="Acres e.g. 1.5" value="${p.acres}" style="padding:9px 12px;font-size:13px"
              oninput="window.plots[${i}].acres=this.value;window.updateDash()">
            <select class="sel" style="padding:9px 12px;font-size:13px" onchange="window.plots[${i}].crop=this.value;window.updateDash()">
              <option value="">Select Crop</option>
              ${CROP_OPTIONS.map(c=>`<option${p.crop===c?' selected':''}>${c}</option>`).join('')}
            </select>
            <button onclick="window.removePlot(${i})" style="width:32px;height:32px;background:var(--redl);border:2px solid #FBBCBC;border-radius:10px;cursor:pointer;font-size:16px;color:var(--red);display:grid;place-items:center;flex-shrink:0">×</button>
          </div>
        </div>
      `).join('');
    }
    
    win.removePlot = function(i: number){
      win.plots.splice(i,1);
      win.plots.forEach((p:any,idx:number)=>p.id=idx+1);
      win.renderPlots();
      win.updateDash();
    }
    
    win.updateDash = function(){
      const dName = document.getElementById('d-name') as HTMLInputElement;
      const dVill = document.getElementById('d-village') as HTMLInputElement;
      const dDist = document.getElementById('d-district') as HTMLInputElement;
      const dState = document.getElementById('d-state') as HTMLSelectElement;
      const dGps = document.getElementById('d-gps') as HTMLInputElement;
      const dAcres = document.getElementById('d-acres') as HTMLInputElement;
      
      const name = dName?.value.trim() || '';
      const village = dVill?.value.trim() || '';
      const district = dDist?.value.trim() || '';
      const state = dState?.value || '';
      const gps = dGps?.value.trim() || '';
      const acresVal = dAcres?.value || '';
      
      const totalA = acresVal ? parseFloat(acresVal) : win.plots.reduce((s:number,p:any)=>s+(parseFloat(p.acres)||0),0);
      const dsAcres = document.getElementById('ds-acres');
      if (dsAcres) dsAcres.textContent = totalA ? totalA+' ac' : '—';
      
      const locStr = village&&state ? `${village}, ${state}` : village||state||'—';
      const dsLoc = document.getElementById('ds-loc');
      if (dsLoc) dsLoc.textContent=locStr;
      
      const vd = document.getElementById('loc-village-display');
      if (vd) vd.textContent = village&&state ? `${village}, ${district||state}` : 'Your village will appear here';
      const sd = document.getElementById('loc-state-display');
      if (sd) sd.textContent = state||'Enter village & state above';
      const gd = document.getElementById('loc-gps-display');
      if (gd) gd.textContent = gps ? `📍 GPS: ${gps}`:'GPS: Not set · Click fields above to personalise';
      
      const activePlots = win.plots.filter((p:any)=>p.acres&&p.crop).length;
      const dsPlots = document.getElementById('ds-plots');
      if (dsPlots) dsPlots.textContent = activePlots || win.plots.length || '—';
      
      const crops=[...new Set(win.plots.filter((p:any)=>p.crop).map((p:any)=>p.crop.split(' ').slice(1).join(' ')))];
      const dsCrops = document.getElementById('ds-crops');
      if (dsCrops) dsCrops.textContent = crops.length ? crops.join(', ') : '—';
      
      const ready = name && village && state && (acresVal||win.plots.some((p:any)=>p.acres)) && win.plots.some((p:any)=>p.crop);
      const btn = document.getElementById('soilUnlockBtn') as HTMLButtonElement | null;
      const nextBtn = document.getElementById('dashNextBtn') as HTMLButtonElement | null;
      const hint = document.getElementById('unlockHint');
      
      if(ready){
        if(btn) {
          btn.disabled=false;
          btn.style.cssText='width:auto;padding:13px 28px;cursor:pointer;opacity:1;background:var(--gm);color:#fff;border-color:var(--gd);box-shadow:var(--sh-lg);border-radius:18px;font-family:var(--fb);font-weight:900;font-size:15px;display:flex;align-items:center;gap:8px';
          btn.innerHTML='🔓 Go to Soil Analysis →';
        }
        if(nextBtn) {
          nextBtn.disabled=false;
          nextBtn.style.opacity='1';
          nextBtn.style.cursor='pointer';
        }
        if(hint) {
          hint.textContent=`✅ Farm saved for ${name} · ${activePlots||win.plots.length} plot(s) ready`;
          hint.style.color='var(--gm)';
        }
      } else {
        if (btn) {
          btn.disabled=true;
          btn.style.cssText='width:auto;padding:13px 28px;cursor:not-allowed;opacity:.55;background:var(--g3);color:var(--gm);border:3px solid var(--g3);border-radius:18px;font-family:var(--fb);font-weight:900;font-size:15px';
          btn.innerHTML='🔒 Unlock Soil Analysis';
        }
        if (nextBtn) {
          nextBtn.disabled=true;
          nextBtn.style.opacity='.5';
          nextBtn.style.cursor='not-allowed';
        }
        const missing=[];
        if(!name) missing.push('name');
        if(!village) missing.push('village');
        if(!state) missing.push('state');
        if(!win.plots.length) missing.push('at least one plot');
        else if(!win.plots.some((p:any)=>p.crop)) missing.push('a crop on your plot');
        
        if (hint) {
          hint.textContent=missing.length ? `Still needed: ${missing.join(', ')}` : 'Fill details and add a plot to unlock';
          hint.style.color='var(--gl)';
        }
      }
    }

    win.doAnalyse = function(){
      const btn=document.querySelector('#p2 .btn-full');
      if (btn) {
        btn.innerHTML='⏳ Analysing soil…';
        (btn as HTMLButtonElement).disabled=true;
      }
      document.getElementById('aiLoader')?.classList.add('on');
      const rw = document.getElementById('recoWrap');
      if (rw) rw.style.cssText='opacity:.1;pointer-events:none';
      win.goTo(3);
      setTimeout(()=>{
        document.getElementById('aiLoader')?.classList.remove('on');
        if (rw) rw.style.cssText='opacity:1;transition:opacity .5s;pointer-events:auto';
        if (btn) {
          btn.innerHTML='🔬 Analyse Soil &amp; Get AI Recommendations →';
          (btn as HTMLButtonElement).disabled=false;
        }
      },2800);
    }
    
    win.regenAI = function(){
      const w=document.getElementById('recoWrap');
      document.getElementById('aiLoader')?.classList.add('on');
      if (w) w.style.cssText='opacity:.1;pointer-events:none';
      setTimeout(()=>{
        document.getElementById('aiLoader')?.classList.remove('on');
        if (w) w.style.cssText='opacity:1;transition:opacity .5s;pointer-events:auto';
      },2200);
    }
    
    win.updatePh = function(v: any){
      const phd = document.getElementById('phD');
      if (phd) phd.textContent=v;
      const phv = document.getElementById('phv');
      if (phv) phv.textContent=v;
      const p=(v/14)*100;
      const phb = document.getElementById('phb');
      if (phb) phb.style.width=p+'%';
      const phr = document.getElementById('phR');
      if (phr) phr.style.background=`linear-gradient(to right,var(--g2) 0%,var(--g2) ${p}%,var(--g3) ${p}%,var(--g3) 100%)`;
    }
    
    win.updateBars = function(){
      const ninp = document.getElementById('nit') as HTMLInputElement;
      const pinp = document.getElementById('pho') as HTMLInputElement;
      const kinp = document.getElementById('pot') as HTMLInputElement;
      const n = +(ninp?.value)||0, p = +(pinp?.value)||0, k = +(kinp?.value)||0;
      
      const nb = document.getElementById('nb');
      if (nb) nb.style.width=Math.min((n/500)*100,100)+'%';
      const pb = document.getElementById('pb');
      if (pb) pb.style.width=Math.min((p/500)*100,100)+'%';
      const kb = document.getElementById('kb');
      if (kb) kb.style.width=Math.min((k/500)*100,100)+'%';
      
      const nv = document.getElementById('nv');
      if (nv) nv.textContent=n+' ppm';
      const pv = document.getElementById('pv');
      if (pv) pv.textContent=p+' ppm';
      const kv = document.getElementById('kv');
      if (kv) kv.textContent=k+' ppm';
    }
    
    win.calcProfit = function(){
      const sel = document.getElementById('cropSel') as HTMLInputElement;
      const a = document.getElementById('acres') as HTMLInputElement;
      const y = document.getElementById('yld') as HTMLInputElement;
      const c = document.getElementById('cost') as HTMLInputElement;
      const l = document.getElementById('labour') as HTMLInputElement;
      
      const price = +(sel?.value)||4200;
      const acres = +(a?.value)||2;
      const yld = +(y?.value)||18;
      const cost = +(c?.value)||12000;
      const labour = +(l?.value)||8000;
      
      const net=price*acres*yld-cost-labour;
      const el=document.getElementById('profitNum');
      if(el) {
        el.textContent=(net>=0?'₹':'−₹')+Math.abs(net).toLocaleString('en-IN');
        el.style.color=net>=0?'#fff':'#FFB3B3';
      }
    }
    
    const LD = {
      en:{crop:'🥭 Mango',adv:'Your loamy soil with pH 6.5 and high potassium (310 ppm) is ideal for mango cultivation this Kharif season. Expected yield: 18–22 quintals per acre. Apply DAP before sowing complementary maize.',lang:'🌐 Displaying in English'},
      hi:{crop:'🥭 आम',adv:'आपकी दोमट मिट्टी (pH 6.5) और उच्च पोटेशियम (310 ppm) इस खरीफ सीज़न में आम की खेती के लिए आदर्श है। अपेक्षित उपज: 18–22 क्विंटल प्रति एकड़।',lang:'🇮🇳 हिंदी में दिखाया जा रहा है'},
      te:{crop:'🥭 మామిడి',adv:'మీ నేల (pH 6.5) మరియు అధిక పొటాషియం (310 ppm) ఈ ఖరీఫ్ సీజన్లో మామిడి సాగుకు అనువైనవి. అంచనా దిగుబడి: ఎకరాకు 18–22 క్వింటాళ్లు.',lang:'🌾 తెలుగులో చూపిస్తున్నారు'},
      kn:{crop:'🥭 ಮಾವు',adv:'ನಿಮ್ಮ ಮಣ್ಣು (pH 6.5) ಮತ್ತು ಅಧಿಕ ಪೊಟ್ಯಾಸಿಯಮ್ (310 ppm) ಈ ಖರೀಫ್ ಋತುವಿನಲ್ಲಿ ಮಾವು ಬೇಸಾಯಕ್ಕೆ ಸೂಕ್ತ. ಇಳುವರಿ: ಎಕರೆಗೆ 18–22 ಕ್ವಿಂಟಾಲ್.',lang:'🏔 ಕನ್ನಡದಲ್ಲಿ ತೋರಿಸಲಾಗುತ್ತಿದೆ'},
      ta:{crop:'🥭 மாம்பழம்',adv:'உங்கள் மண் (pH 6.5) மற்றும் அதிக பொட்டாசியம் (310 ppm) இந்த கரீஃப் சீசனில் மாங்காய் சாகுபடிக்கு ஏற்றது. எதிர்பார்க்கப்படும் விளைச்சல்: ஏக்கருக்கு 18–22 குவிண்டால்.',lang:'🌊 தமிழில் காட்டப்படுகிறது'}
    };
    
    win.setLang = function(l: keyof typeof LD, el: HTMLElement){
      document.querySelectorAll('.lcard').forEach(c=>c.classList.remove('sel'));
      el.classList.add('sel');
      const d=LD[l];
      const c=document.getElementById('dCrop'), a=document.getElementById('dAdv'), b=document.getElementById('dLang');
      if(c) c.style.opacity='0';
      if(a) a.style.opacity='0';
      setTimeout(()=>{
        if(c) c.textContent=d.crop;
        if(a) a.textContent=d.adv;
        if(b) b.textContent=d.lang;
        if(c) c.style.opacity='1';
        if(a) a.style.opacity='1';
      },250);
    }
    
    const obs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('v')})},{threshold:.08});
    document.querySelectorAll('.r').forEach(el=>obs.observe(el));
    
    win.calcProfit();
    win.updatePh(6.5);
    win.renderPlots();
    
    return () => obs.disconnect();
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: exactHtml }} />;
}
