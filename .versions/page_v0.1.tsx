"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "./landing.css";

const LD = {
  en: { crop: '🥭 Mango', adv: 'Your loamy soil with pH 6.5 and high potassium (310 ppm) is ideal for mango cultivation this Kharif season. Expected yield: 18–22 quintals per acre. Apply DAP before sowing complementary maize.', lang: '🌐 Displaying in English' },
  hi: { crop: '🥭 आम', adv: 'आपकी दोमट मिट्टी (pH 6.5) और उच्च पोटेशियम (310 ppm) इस खरीफ सीज़न में आम की खेती के लिए आदर्श है। अपेक्षित उपज: 18–22 क्विंटल प्रति एकड़। बुआई से पहले DAP डालें।', lang: '🇮🇳 हिंदी में दिखाया जा रहा है' },
  te: { crop: '🥭 మామిడి', adv: 'మీ నేల (pH 6.5) మరియు అధిక పొటాషియం (310 ppm) ఈ ఖరీఫ్ సీజన్లో మామిడి సాగుకు అనువైనవి. అంచనా దిగుబడి: ఎకరాకు 18–22 క్వింటాళ్లు. మొక్కజొన్న విత్తే ముందు DAP వేయండి.', lang: '🌾 తెలుగులో చూపిస్తున్నారు' },
  kn: { crop: '🥭 ಮಾವು', adv: 'ನಿಮ್ಮ ಮಣ್ಣು (pH 6.5) ಮತ್ತು ಅಧಿಕ ಪೊಟ್ಯಾಸಿಯಮ್ (310 ppm) ಈ ಖರೀಫ್ ಋತುವಿನಲ್ಲಿ ಮಾವು ಬೇಸಾಯಕ್ಕೆ ಸೂಕ್ತ. ಇಳುವರಿ: ಎಕರೆಗೆ 18–22 ಕ್ವಿಂಟಾಲ್. ಜೋಳ ಬಿತ್ತನೆ ಮೊದಲು DAP ಹಾಕಿ.', lang: '🏔 ಕನ್ನಡದಲ್ಲಿ ತೋರಿಸಲಾಗುತ್ತಿದೆ' },
  ta: { crop: '🥭 மாம்பழம்', adv: 'உங்கள் மண் (pH 6.5) மற்றும் அதிக பொட்டாசியம் (310 ppm) இந்த கரீஃப் சீசனில் மாங்காய் சாகுபடிக்கு ஏற்றது. எதிர்பார்க்கப்படும் விளைச்சல்: ஏக்கருக்கு 18–22 குவிண்டால். விதைப்பதற்கு முன் DAP இடவும்.', lang: '🌊 தமிழில் காட்டப்படுகிறது' }
} as const;

export default function LandingPage() {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [animIn, setAnimIn] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const ovContentRef = useRef<HTMLDivElement>(null);

  const [analyzing, setAnalyzing] = useState(false);
  const [regenActive, setRegenActive] = useState(false);

  const [nitrogen, setNitrogen] = useState(240);
  const [phosphorus, setPhosphorus] = useState(180);
  const [potassium, setPotassium] = useState(310);
  const [ph, setPh] = useState(6.5);

  const [cropPrice, setCropPrice] = useState(4200);
  const [acres, setAcres] = useState(2);
  const [yieldRate, setYieldRate] = useState(18);
  const [cost, setCost] = useState(12000);
  const [labour, setLabour] = useState(8000);

  const [lang, setLangKey] = useState<keyof typeof LD>('en');

  // Reveal observer
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('v');
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.r').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [overlayOpen, activeStep]);

  const openAt = (n: number) => {
    setOverlayOpen(true);
    setAnimIn(true);
    document.body.style.overflow = 'hidden';
    setTimeout(() => setAnimIn(false), 500);
    goTo(n, false);
  };

  const closeOverlay = () => {
    setOverlayOpen(false);
    document.body.style.overflow = '';
  };

  const goTo = (n: number, smoothScroll = true) => {
    setActiveStep(n);
    setTimeout(() => {
      if (ovContentRef.current && smoothScroll) {
         ovContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
      const panel = document.getElementById('p' + n);
      if(panel) {
        panel.querySelectorAll('.r').forEach(el => {
          el.classList.remove('v');
          void (el as HTMLElement).offsetWidth;
          setTimeout(() => el.classList.add('v'), 60);
        });
      }
    }, 50);
  };

  const doAnalyse = () => {
    setAnalyzing(true);
    const btn = document.getElementById('analyse-btn');
    if (btn) btn.innerHTML = '⏳ Analysing...';
    goTo(2);
    setTimeout(() => {
      setAnalyzing(false);
      if (btn) btn.innerHTML = '🔬 Analyse Soil &amp; Get AI Recommendations →';
    }, 2800);
  };

  const regenAI = () => {
    setRegenActive(true);
    setTimeout(() => {
      setRegenActive(false);
    }, 2200);
  };

  const profit = cropPrice * acres * yieldRate - cost - labour;
  const minLit = (n: number) => activeStep >= n ? 'lit' : '';

  return (
    <>
      <div className="bg">
        <span></span><span></span><span></span>
      </div>

      <div className="wrap">
        <nav>
          <div className="logo"><i>🌱</i>AgriSmart</div>
          <div className="nav-links">
            <button className="nl" onClick={() => openAt(1)}>Soil Analysis</button>
            <button className="nl" onClick={() => openAt(2)}>AI Crops</button>
            <button className="nl" onClick={() => openAt(3)}>Weather</button>
            <button className="nl" onClick={() => openAt(4)}>Market</button>
          </div>
          <button className="cta-btn" onClick={() => openAt(1)}>Get Started Free 🌾</button>
        </nav>

        <section className="hero">
          <div className="badge"><span className="dot"></span>Powered by Gemini 3.1 Pro · 5 Indian Languages</div>
          <h1>Smart farming starts<br/>with <span className="hl">your soil</span></h1>
          <p className="sub">Enter your soil data, get AI-powered crop recommendations, real-time weather alerts and live market signals — in under 5 minutes.</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => openAt(1)}>🌾 Get Started Free</button>
            <button className="btn-ghost" onClick={() => openAt(2)}>▶ Watch Demo</button>
          </div>
          <div className="pills">
            <div className="pill"><div className="v">100M+</div><div className="l">Farmers Target</div></div>
            <div className="pill"><div className="v">5 min</div><div className="l">To Recommendation</div></div>
            <div className="pill"><div className="v">15+</div><div className="l">Crops in DB</div></div>
            <div className="pill"><div className="v">5 🇮🇳</div><div className="l">Languages</div></div>
            <div className="pill"><div className="v">Free</div><div className="l">To Start</div></div>
          </div>
        </section>

        <div className="feature-preview">
          <div className="fp" onClick={() => openAt(1)}>
            <span className="fp-arrow">↗</span>
            <div className="fp-num">01</div>
            <span className="fp-icon">🧪</span>
            <div className="fp-title">Soil Intelligence</div>
            <p className="fp-desc">Enter N-P-K, pH &amp; soil type or upload your lab report PDF. Gemini parses it automatically and scores your soil health.</p>
          </div>
          <div className="fp" onClick={() => openAt(2)}>
            <span className="fp-arrow">↗</span>
            <div className="fp-num">02</div>
            <span className="fp-icon">🤖</span>
            <div className="fp-title">AI Crop Recommendations</div>
            <p className="fp-desc">Gemini 3.1 Pro cross-matches soil data, weather &amp; seasonal patterns to rank top 3 crops with suitability scores.</p>
          </div>
          <div className="fp" onClick={() => openAt(3)}>
            <span className="fp-arrow">↗</span>
            <div className="fp-num">03</div>
            <span className="fp-icon">🌤</span>
            <div className="fp-title">Weather Intelligence</div>
            <p className="fp-desc">7-day hyperlocal forecast with drought, flood &amp; frost alerts. Know exactly when to plant and when to protect your crop.</p>
          </div>
          <div className="fp" onClick={() => openAt(4)}>
            <span className="fp-arrow">↗</span>
            <div className="fp-num">04</div>
            <span className="fp-icon">💰</span>
            <div className="fp-title">Market Intelligence</div>
            <p className="fp-desc">Live mandi prices, regional demand signals and a profit estimator. Grow what will actually sell at the best price.</p>
          </div>
          <div className="fp" onClick={() => openAt(5)}>
            <span className="fp-arrow">↗</span>
            <div className="fp-num">05</div>
            <span className="fp-icon">🌐</span>
            <div className="fp-title">5 Indian Languages</div>
            <p className="fp-desc">Every recommendation, alert and advisory speaks the farmer&apos;s own language — Hindi, Telugu, Kannada, Tamil or English.</p>
          </div>
        </div>
      </div>

      {overlayOpen && (
        <div className={`overlay open ${animIn ? 'animIn' : ''}`} id="overlay" style={{ display: 'flex' }}>
          <div className="ov-topbar">
            <div className="ov-logo"><span>🌱</span>AgriSmart</div>

            <div className="steprow">
              <div className={`step ${activeStep === 1 ? 'active' : ''} ${activeStep > 1 ? 'done' : ''}`} id="st1" onClick={() => goTo(1)}>
                <div className="snum">{activeStep > 1 ? '' : <span className="snum-n">1</span>}</div>
                <div className="slbl">Soil Analysis</div>
              </div>
              <div className={`sconn ${minLit(2)}`} id="sc1"></div>
              
              <div className={`step ${activeStep === 2 ? 'active' : ''} ${activeStep > 2 ? 'done' : ''}`} id="st2" onClick={() => goTo(2)}>
                <div className="snum">{activeStep > 2 ? '' : <span className="snum-n">2</span>}</div>
                <div className="slbl">AI Crops</div>
              </div>
              <div className={`sconn ${minLit(3)}`} id="sc2"></div>
              
              <div className={`step ${activeStep === 3 ? 'active' : ''} ${activeStep > 3 ? 'done' : ''}`} id="st3" onClick={() => goTo(3)}>
                <div className="snum">{activeStep > 3 ? '' : <span className="snum-n">3</span>}</div>
                <div className="slbl">Weather</div>
              </div>
              <div className={`sconn ${minLit(4)}`} id="sc3"></div>
              
              <div className={`step ${activeStep === 4 ? 'active' : ''} ${activeStep > 4 ? 'done' : ''}`} id="st4" onClick={() => goTo(4)}>
                <div className="snum">{activeStep > 4 ? '' : <span className="snum-n">4</span>}</div>
                <div className="slbl">Market</div>
              </div>
              <div className={`sconn ${minLit(5)}`} id="sc4"></div>
              
              <div className={`step ${activeStep === 5 ? 'active' : ''} ${activeStep > 5 ? 'done' : ''}`} id="st5" onClick={() => goTo(5)}>
                <div className="snum">{activeStep > 5 ? '' : <span className="snum-n">5</span>}</div>
                <div className="slbl">Languages</div>
              </div>
            </div>

            <div className="x-btn" onClick={closeOverlay}>✕</div>
          </div>

          <div className="progress-bar">
            <div className="progress-fill" id="prog" style={{ width: `${(activeStep / 5) * 100}%` }}></div>
          </div>

          <div className="ov-content" id="ovcontent" ref={ovContentRef}>
            
            {/* PANEL 1: SOIL INPUT */}
            <div className={`panel ${activeStep === 1 ? 'on' : ''}`} id="p1">
             <div className="panel-inner">
              <div className="wrap">
                <div className="shead">
                  <div className="stag">🧪 Feature 1 of 5</div>
                  <h2>Soil Intelligence</h2>
                  <p>Enter your N-P-K values, pH &amp; soil type — or upload your lab report PDF. Gemini reads it automatically and gives you an instant soil health score.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 28, alignItems: 'start' }}>
                  <div className="card r">
                    <div className="card-head">
                      <div className="card-ico">🧪</div>
                      <div><div className="card-ttl">Soil Test Input</div><div className="card-sub">Enter your latest lab values</div></div>
                    </div>

                    <div className="row3">
                      <div className="fg"><label className="lbl">🟢 Nitrogen (N)</label><input className="inp" type="number" value={nitrogen} onChange={e => setNitrogen(Number(e.target.value))} /></div>
                      <div className="fg"><label className="lbl">🟡 Phosphorus (P)</label><input className="inp" type="number" value={phosphorus} onChange={e => setPhosphorus(Number(e.target.value))} /></div>
                      <div className="fg"><label className="lbl">🔵 Potassium (K)</label><input className="inp" type="number" value={potassium} onChange={e => setPotassium(Number(e.target.value))} /></div>
                    </div>

                    <div className="ph-wrap fg">
                      <label className="lbl ph-lbl-row">⚗️ Soil pH <span className="ph-pill" id="phD">{ph}</span></label>
                      <input type="range" min="0" max="14" step="0.1" value={ph} onChange={e => setPh(Number(e.target.value))} id="phR" style={{ background: `linear-gradient(to right,var(--g2) 0%,var(--g2) ${(ph/14)*100}%,var(--g3) ${(ph/14)*100}%,var(--g3) 100%)` }} />
                      <div className="ph-scale"><span>0 — Acidic</span><span>7 — Neutral</span><span>14 — Alkaline</span></div>
                    </div>

                    <div className="row2" style={{ marginTop: 14 }}>
                      <div className="fg"><label className="lbl">🏔 Soil Type</label>
                        <select className="sel"><option>Loamy</option><option>Sandy</option><option>Clay</option><option>Silty</option><option>Peaty</option></select></div>
                      <div className="fg"><label className="lbl">📅 Season</label>
                        <select className="sel"><option>Kharif (Jun–Oct)</option><option>Rabi (Nov–Mar)</option><option>Zaid (Apr–Jun)</option></select></div>
                    </div>

                    <div className="upload" onClick={(e) => { const el = e.currentTarget.children[1]; el.textContent='✅ Lab report uploaded successfully!' }}>
                      <div style={{ fontSize: 28, marginBottom: 7 }}>📄</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gm)' }}>Upload Lab Report PDF (optional)</div>
                      <div style={{ fontSize: 11, color: 'var(--gl)', marginTop: 3 }}>Max 10MB · Gemini 3.1 Pro extracts N-P-K values automatically</div>
                    </div>

                    <button className="btn-full" id="analyse-btn" onClick={doAnalyse}>
                      {analyzing ? '⏳ Analysing... ' : '🔬 Analyse Soil & Get AI Recommendations →'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <div className="card r d1">
                      <div className="card-ttl" style={{ marginBottom: 14 }}>📂 Soil Test History</div>
                      <div className="hist"><div className="hdot" style={{ background: 'var(--g2)' }}></div><div><div className="hname">North Field — Plot A</div><div className="hdate">15 Feb 2025</div></div><div className="htag">Latest</div></div>
                      <div className="hist"><div className="hdot" style={{ background: 'var(--gold)' }}></div><div><div className="hname">South Field — Plot B</div><div className="hdate">12 Jan 2025</div></div><div className="htag">Jan</div></div>
                      <div className="hist"><div className="hdot" style={{ background: 'var(--gl)' }}></div><div><div className="hname">East Field — Plot C</div><div className="hdate">5 Oct 2024</div></div><div className="htag">Oct</div></div>
                    </div>

                    <div className="card r d2">
                      <div className="card-ttl" style={{ marginBottom: 14 }}>📊 Nutrient Levels</div>
                      <div className="bar-row"><div className="bar-lbl"><span>🟢 Nitrogen</span><span>{nitrogen} ppm</span></div><div className="bar-track"><div className="bar-fill bf-n" style={{ width: `${Math.min((nitrogen/500)*100, 100)}%` }}></div></div></div>
                      <div className="bar-row"><div className="bar-lbl"><span>🟡 Phosphorus</span><span>{phosphorus} ppm</span></div><div className="bar-track"><div className="bar-fill bf-p" style={{ width: `${Math.min((phosphorus/500)*100, 100)}%` }}></div></div></div>
                      <div className="bar-row"><div className="bar-lbl"><span>🔵 Potassium</span><span>{potassium} ppm</span></div><div className="bar-track"><div className="bar-fill bf-k" style={{ width: `${Math.min((potassium/500)*100, 100)}%` }}></div></div></div>
                      <div className="bar-row"><div className="bar-lbl"><span>⚗️ pH</span><span>{ph}</span></div><div className="bar-track"><div className="bar-fill bf-ph" style={{ width: `${(ph/14)*100}%` }}></div></div></div>
                      <div className="score-box">
                        <div className="score-num">84</div>
                        <div className="score-txt"><div className="score-title">Soil Health Score</div><div className="score-sub">Good · Suitable for high-value crops</div></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pnav">
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gl)', display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontSize: 18 }}>🌱</span> Step 1 of 5 — Start here</div>
                  <button className="pnav-btn pnav-next" onClick={doAnalyse}>Analyse &amp; Continue → AI Crops 🤖</button>
                </div>
              </div>
             </div>
            </div>

            {/* PANEL 2: AI REC */}
            <div className={`panel ${activeStep === 2 ? 'on' : ''}`} id="p2">
             <div className="panel-inner">
              <div className="wrap">
                <div className="shead">
                  <div className="stag">🤖 Feature 2 of 5</div>
                  <h2>AI Crop Recommendations</h2>
                  <p>Gemini 3.1 Pro cross-matches your soil data with the 7-day weather forecast and seasonal patterns to rank the top 3 crops — with full reasoning.</p>
                </div>

                <div className={`ai-loader ${analyzing || regenActive ? 'on' : ''}`} id="aiLoader">
                  <div style={{ fontSize: 44, marginBottom: 12 }}>🧠</div>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: 22, fontWeight: 900, color: 'var(--gd)' }}>Gemini 3.1 Pro is analysing your soil…</div>
                  <div className="tdots"><div className="td"></div><div className="td"></div><div className="td"></div></div>
                  <div style={{ fontSize: 13, color: 'var(--gm)', fontWeight: 600 }}>Cross-referencing N-P-K · Checking 7-day rainfall · Scanning mandi prices</div>
                </div>

                <div id="recoWrap" style={{ opacity: (regenActive || analyzing) ? 0.1 : 1, pointerEvents: (regenActive || analyzing) ? 'none' : 'auto', transition: 'opacity .5s' }}>
                  <div className="crop-grid">
                    <div className="crop-card top r">
                      <div className="rpin">🥇 Best Match</div>
                      <span className="crop-em">🥭</span>
                      <div className="crop-name">Mango</div>
                      <div className="crop-local">आम · మామిడి · ಮಾವು · மாம்பழம்</div>
                      <div className="ring-wrap">
                        <div className="ring">
                          <svg viewBox="0 0 64 64" width="64" height="64"><circle className="rb" cx="32" cy="32" r="26"/><circle className="rf" cx="32" cy="32" r="26" strokeDasharray="163.4" strokeDashoffset="13.1" style={{ stroke: 'var(--gold)' }}/></svg>
                          <div className="ring-n">92%</div>
                        </div>
                        <div className="ring-info">
                          <div className="ri-lbl">Suitability Score</div>
                          <div className="ri-txt">High potassium (310 ppm) matches mango&apos;s requirements. pH 6.5 is perfect.</div>
                        </div>
                      </div>
                      <div className="ctags"><span className="ctag">💧 Low Water</span><span className="ctag">📅 180 days</span><span className="ctag gold">💰 High Value</span></div>
                      <div className="mkt-row"><span className="mkt-lbl">Market Signal</span><span className="mkt-val" style={{ color: 'var(--gm)' }}>High Demand 🟢</span></div>
                    </div>
                    <div className="crop-card r d1">
                      <div className="rpin">🥈 Good Match</div>
                      <span className="crop-em">🌽</span>
                      <div className="crop-name">Maize</div>
                      <div className="crop-local">मक्का · మొక్కజొన్న · ಜೋಳ · சோளம்</div>
                      <div className="ring-wrap">
                        <div className="ring">
                          <svg viewBox="0 0 64 64" width="64" height="64"><circle className="rb" cx="32" cy="32" r="26"/><circle className="rf" cx="32" cy="32" r="26" strokeDasharray="163.4" strokeDashoffset="40.9"/></svg>
                          <div className="ring-n">75%</div>
                        </div>
                        <div className="ring-info">
                          <div className="ri-lbl">Suitability Score</div>
                          <div className="ri-txt">Nitrogen (240 ppm) ideal for kharif maize. Quick 90-day cycle.</div>
                        </div>
                      </div>
                      <div className="ctags"><span className="ctag">💧 Medium Water</span><span className="ctag">📅 90 days</span><span className="ctag">📈 Stable</span></div>
                      <div className="mkt-row"><span className="mkt-lbl">Market Signal</span><span className="mkt-val" style={{ color: 'var(--gl)' }}>Stable Prices 🟡</span></div>
                    </div>
                    <div className="crop-card r d2">
                      <div className="rpin">🥉 Alternative</div>
                      <span className="crop-em">🌻</span>
                      <div className="crop-name">Sunflower</div>
                      <div className="crop-local">सूरजमुखी · పొద్దుతిరుగుడు · ಸೂರ್ಯಕಾಂತಿ · சூரியகாந்தி</div>
                      <div className="ring-wrap">
                        <div className="ring">
                          <svg viewBox="0 0 64 64" width="64" height="64"><circle className="rb" cx="32" cy="32" r="26"/><circle className="rf" cx="32" cy="32" r="26" strokeDasharray="163.4" strokeDashoffset="62.1"/></svg>
                          <div className="ring-n">62%</div>
                        </div>
                        <div className="ring-info">
                          <div className="ri-lbl">Suitability Score</div>
                          <div className="ri-txt">Drought-tolerant. Good phosphorus match for sandy-loam soil.</div>
                        </div>
                      </div>
                      <div className="ctags"><span className="ctag">💧 Low Water</span><span className="ctag">📅 100 days</span><span className="ctag">🌿 Organic</span></div>
                      <div className="mkt-row"><span className="mkt-lbl">Market Signal</span><span className="mkt-val" style={{ color: 'var(--gold)' }}>Growing Demand 🟠</span></div>
                    </div>
                  </div>

                  <div className="advisory r">
                    <div className="card-head">
                      <div className="card-ico">🤖</div>
                      <div><div className="card-ttl">Gemini 3.1 Pro Advisory</div><div className="card-sub">AI-generated seasonal farming insight for your soil profile</div></div>
                    </div>
                    <div className="adv-body">
                      🌾 <strong>Kharif Season Advisory:</strong> Your loamy soil with pH 6.5 and high potassium (310 ppm) is in excellent condition. Mango is your strongest bet this season — the K levels support deep root anchoring and fruit quality.<br/><br/>
                      ⚠️ <strong>Nutrient Watch:</strong> Phosphorus is moderate at 180 ppm. Apply DAP fertilizer 3 weeks before sowing maize to boost early root development. Avoid over-irrigation — heavy rain is forecast this weekend.<br/><br/>
                      💰 <strong>Market Tip:</strong> Alphonso mango from Karnataka is commanding premium prices in Bengaluru and Mumbai markets this year. Consider registering with APMC for direct procurement access.
                    </div>
                  </div>

                  <div style={{ textAlign: 'center' }} className="r">
                    <button className="gen-btn" onClick={regenAI}>
                      <span className="spk">✨</span> Regenerate with New Parameters <span className="spk">✨</span>
                    </button>
                  </div>
                </div>

                <div className="pnav">
                  <button className="pnav-btn pnav-back" onClick={() => goTo(1)}>← Back to Soil</button>
                  <button className="pnav-btn pnav-next" onClick={() => goTo(3)}>Continue → Weather Intelligence 🌤</button>
                </div>
              </div>
             </div>
            </div>

            {/* PANEL 3: WEATHER */}
            <div className={`panel ${activeStep === 3 ? 'on' : ''}`} id="p3">
             <div className="panel-inner">
              <div className="wrap">
                <div className="shead">
                  <div className="stag">🌤 Feature 3 of 5</div>
                  <h2>Weather Intelligence</h2>
                  <p>Hyperlocal 7-day forecast plus drought, flood and frost alerts — powered by OpenWeatherMap for your exact farm GPS coordinates.</p>
                </div>

                <div className="wx-grid">
                  <div className="wx-card r">
                    <div className="wx-loc">📍 Mangaluru, Karnataka — Farm Location</div>
                    <div className="wx-date">Saturday, 14 March 2026 · Kharif Season</div>
                    <div className="wx-top">
                      <div className="wx-em">⛅</div>
                      <div><div className="wx-temp">28°C</div><div className="wx-desc">Partly Cloudy · Good for farming</div></div>
                    </div>
                    <div className="wx-dets">
                      <div className="wxd"><div className="v">72%</div><div className="l">Humidity</div></div>
                      <div className="wxd"><div className="v">12mm</div><div className="l">Rainfall</div></div>
                      <div className="wxd"><div className="v">14 km/h</div><div className="l">Wind</div></div>
                    </div>
                    <div className="fc-strip">
                      <div className="fcd today"><div className="dn">TODAY</div><div className="di">⛅</div><div className="dt">28°</div><div className="dr">12mm</div></div>
                      <div className="fcd"><div className="dn">SAT</div><div className="di">🌧</div><div className="dt">25°</div><div className="dr">38mm</div></div>
                      <div className="fcd"><div className="dn">SUN</div><div className="di">🌧</div><div className="dt">24°</div><div className="dr">42mm</div></div>
                      <div className="fcd"><div className="dn">MON</div><div className="di">🌤</div><div className="dt">27°</div><div className="dr">5mm</div></div>
                      <div className="fcd"><div className="dn">TUE</div><div className="di">☀️</div><div className="dt">31°</div><div className="dr">0mm</div></div>
                      <div className="fcd"><div className="dn">WED</div><div className="di">🌤</div><div className="dt">30°</div><div className="dr">2mm</div></div>
                      <div className="fcd"><div className="dn">THU</div><div className="di">☀️</div><div className="dt">32°</div><div className="dr">0mm</div></div>
                    </div>
                  </div>

                  <div className="alertz">
                    <div className="al warn r d1">
                      <div className="al-top"><div className="al-ico">⚠️</div><div className="al-title">Heavy Rain Alert</div><div className="al-badge">Sat–Sun</div></div>
                      <div className="al-body">38–42mm expected this weekend. Avoid pesticide application. Clear drainage channels to prevent waterlogging in low-lying plots.</div>
                    </div>
                    <div className="al good r d2">
                      <div className="al-top"><div className="al-ico">🌿</div><div className="al-title">Optimal Planting Window</div><div className="al-badge">Mon–Tue</div></div>
                      <div className="al-body">Clear skies Mon–Tue are ideal for sowing maize or transplanting mango saplings. Temperature stays in the 27–31°C optimal range.</div>
                    </div>
                    <div className="seasonal r d3">
                      <div style={{ fontFamily:'var(--fd)', fontSize: 16, fontWeight: 900, color: 'var(--gd)', marginBottom: 15 }}>📅 30-Day Seasonal Outlook</div>
                      <div className="sb-row"><div className="sb-lbl"><span>🌧 Cumulative Rainfall</span><span>92mm</span></div><div className="sb-track"><div className="sb-fill" style={{ width: '65%', background: 'linear-gradient(90deg,var(--g2),var(--gm))' }}></div></div></div>
                      <div className="sb-row"><div className="sb-lbl"><span>🌡 Avg Temperature</span><span>29°C</span></div><div className="sb-track"><div className="sb-fill" style={{ width: '72%', background: 'linear-gradient(90deg,#FFD166,var(--gold))' }}></div></div></div>
                      <div className="sb-row"><div className="sb-lbl"><span>☀️ Sunshine Hours</span><span>7.2h/day</span></div><div className="sb-track"><div className="sb-fill" style={{ width: '80%', background: 'linear-gradient(90deg,var(--g1),var(--gd))' }}></div></div></div>
                      <div style={{ marginTop: 13, background: 'var(--g4)', borderRadius: 13, padding: '11px 14px' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gm)' }}>🌾 Verdict: <strong style={{ color: 'var(--gd)' }}>Good for Kharif Crops</strong></div>
                        <div style={{ fontSize: 11, color: 'var(--gl)', marginTop: 3 }}>Adequate rainfall · No drought risk in next 30 days</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pnav">
                  <button className="pnav-btn pnav-back" onClick={() => goTo(2)}>← Back to AI Crops</button>
                  <button className="pnav-btn pnav-next" onClick={() => goTo(4)}>Continue → Market Intelligence 💰</button>
                </div>
              </div>
             </div>
            </div>

            {/* PANEL 4: MARKET */}
            <div className={`panel ${activeStep === 4 ? 'on' : ''}`} id="p4">
             <div className="panel-inner">
              <div className="wrap">
                <div className="shead">
                  <div className="stag">💰 Feature 4 of 5</div>
                  <h2>Market Intelligence</h2>
                  <p>Live mandi prices, regional demand signals, FPO coordination and a real-time profit estimator — so you always grow what sells.</p>
                </div>

                <div className="mkt-grid">
                  <div className="card r">
                    <div className="card-head">
                      <div className="card-ico">📈</div>
                      <div><div className="card-ttl">Live Mandi Prices</div><div className="card-sub">Karnataka APMC · Updated 2hrs ago</div></div>
                    </div>
                    <div className="price-row"><div className="pr-l"><div className="pr-em">🥭</div><div><div className="pr-nm">Alphonso Mango</div><div className="pr-rg">Bengaluru APMC</div></div></div><div className="pr-r"><div className="pr-val">₹4,200/qt</div><div className="pr-chg up">▲ 12.4% this week</div></div></div>
                    <div className="price-row"><div className="pr-l"><div className="pr-em">🌽</div><div><div className="pr-nm">Maize (Yellow)</div><div className="pr-rg">Mangaluru Mandi</div></div></div><div className="pr-r"><div className="pr-val">₹1,840/qt</div><div className="pr-chg up">▲ 3.1%</div></div></div>
                    <div className="price-row"><div className="pr-l"><div className="pr-em">🌻</div><div><div className="pr-nm">Sunflower Seed</div><div className="pr-rg">Dharwad APMC</div></div></div><div className="pr-r"><div className="pr-val">₹5,600/qt</div><div className="pr-chg up">▲ 8.7%</div></div></div>
                    <div className="price-row"><div className="pr-l"><div className="pr-em">🧅</div><div><div className="pr-nm">Onion (Red)</div><div className="pr-rg">Hubli Mandi</div></div></div><div className="pr-r"><div className="pr-val">₹2,100/qt</div><div className="pr-chg dn2">▼ 5.2%</div></div></div>
                    <div className="price-row"><div className="pr-l"><div className="pr-em">🍅</div><div><div className="pr-nm">Tomato</div><div className="pr-rg">Chikkaballapur</div></div></div><div className="pr-r"><div className="pr-val">₹1,200/qt</div><div className="pr-chg dn2">▼ 18.3% — Oversupplied</div></div></div>
                  </div>

                  <div className="card r d1">
                    <div className="card-head">
                      <div className="card-ico">🧮</div>
                      <div><div className="card-ttl">Profit Estimator</div><div className="card-sub">Quick break-even calculator</div></div>
                    </div>
                    <div className="fg" style={{ marginBottom: 12 }}><label className="lbl">🌱 Crop</label>
                      <select className="sel" value={cropPrice} onChange={e => setCropPrice(Number(e.target.value))}>
                        <option value={4200}>🥭 Mango — ₹4,200/qt</option>
                        <option value={1840}>🌽 Maize — ₹1,840/qt</option>
                        <option value={5600}>🌻 Sunflower — ₹5,600/qt</option>
                      </select>
                    </div>
                    <div className="row2">
                      <div className="fg"><label className="lbl">📐 Land (Acres)</label><input className="inp" type="number" value={acres} onChange={e => setAcres(Number(e.target.value))} /></div>
                      <div className="fg"><label className="lbl">📦 Yield (qt/ac)</label><input className="inp" type="number" value={yieldRate} onChange={e => setYieldRate(Number(e.target.value))} /></div>
                    </div>
                    <div className="row2">
                      <div className="fg"><label className="lbl">💸 Input Cost (₹)</label><input className="inp" type="number" value={cost} onChange={e => setCost(Number(e.target.value))} /></div>
                      <div className="fg"><label className="lbl">👷 Labour Cost (₹)</label><input className="inp" type="number" value={labour} onChange={e => setLabour(Number(e.target.value))} /></div>
                    </div>
                    <div className="pr-res">
                      <div style={{ fontSize: 12, opacity: .7, marginBottom: 5 }}>Estimated Net Profit</div>
                      <div className="pr-est" style={{ color: profit >= 0 ? '#fff' : '#FFB3B3' }}>{profit >= 0 ? '₹' : '−₹'}{Math.abs(profit).toLocaleString('en-IN')}</div>
                      <div style={{ fontSize: 12, opacity: .6, marginTop: 4 }}>for {acres} acres · after all costs deducted</div>
                    </div>
                  </div>

                  <div className="card r d2">
                    <div className="card-head">
                      <div className="card-ico">🗺</div>
                      <div><div className="card-ttl">Regional Demand Signals</div><div className="card-sub">South India · March 2026</div></div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11 }}>
                      <div style={{ background: 'var(--g4)', border: '2px solid var(--g3)', borderRadius: 17, padding: 15, textAlign: 'center' }}><div style={{ fontSize: 26, marginBottom: 6 }}>🥭</div><div style={{ fontFamily: 'var(--fd)', fontSize: 14, fontWeight: 900, color: 'var(--gd)' }}>Mango</div><div style={{ margin: '7px 0', height: 9, background: 'var(--g3)', borderRadius: 10, overflow: 'hidden' }}><div style={{ width: '88%', height: '100%', background: 'linear-gradient(90deg,var(--g2),var(--gm))', borderRadius: 10 }}></div></div><div style={{ fontSize: 10, fontWeight: 800, color: 'var(--gl)' }}>88% Demand Score</div></div>
                      <div style={{ background: 'var(--gl2)', border: '2px solid var(--gold)', borderRadius: 17, padding: 15, textAlign: 'center' }}><div style={{ fontSize: 26, marginBottom: 6 }}>🌻</div><div style={{ fontFamily: 'var(--fd)', fontSize: 14, fontWeight: 900, color: 'var(--gd)' }}>Sunflower</div><div style={{ margin: '7px 0', height: 9, background: '#FDE8A0', borderRadius: 10, overflow: 'hidden' }}><div style={{ width: '74%', height: '100%', background: 'linear-gradient(90deg,#FFD166,var(--gold))', borderRadius: 10 }}></div></div><div style={{ fontSize: 10, fontWeight: 800, color: 'var(--gld)' }}>74% Demand Score</div></div>
                      <div style={{ background: 'var(--g5)', border: '2px solid var(--g4)', borderRadius: 17, padding: 15, textAlign: 'center' }}><div style={{ fontSize: 26, marginBottom: 6 }}>🌽</div><div style={{ fontFamily: 'var(--fd)', fontSize: 14, fontWeight: 900, color: 'var(--gd)' }}>Maize</div><div style={{ margin: '7px 0', height: 9, background: 'var(--g4)', borderRadius: 10, overflow: 'hidden' }}><div style={{ width: '62%', height: '100%', background: 'linear-gradient(90deg,var(--g2),var(--gm))', borderRadius: 10 }}></div></div><div style={{ fontSize: 10, fontWeight: 800, color: 'var(--gl)' }}>62% Demand Score</div></div>
                      <div style={{ background: 'var(--redl)', border: '2px solid #FBBCBC', borderRadius: 17, padding: 15, textAlign: 'center' }}><div style={{ fontSize: 26, marginBottom: 6 }}>🍅</div><div style={{ fontFamily: 'var(--fd)', fontSize: 14, fontWeight: 900, color: 'var(--gd)' }}>Tomato</div><div style={{ margin: '7px 0', height: 9, background: '#FDD', borderRadius: 10, overflow: 'hidden' }}><div style={{ width: '28%', height: '100%', background: 'linear-gradient(90deg,#FF9999,var(--red))', borderRadius: 10 }}></div></div><div style={{ fontSize: 10, fontWeight: 800, color: 'var(--red)' }}>28% — Oversupplied</div></div>
                    </div>
                  </div>

                  <div className="card r d3">
                    <div className="card-head">
                      <div className="card-ico">🤝</div>
                      <div><div className="card-ttl">FPO Coordination</div><div className="card-sub">47 members · Mangaluru Cooperative</div></div>
                    </div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--gm)', marginBottom: 14, lineHeight: 1.6 }}>Your cooperative distributes crops to prevent market glut and stabilise income for all members:</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 13px', background: 'var(--g4)', borderRadius: 14 }}><span style={{ fontSize: 19 }}>🥭</span><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 800, color: 'var(--gd)' }}>Mango — 18 farmers</div><div style={{ height: 7, background: 'var(--g3)', borderRadius: 10, marginTop: 5, overflow: 'hidden' }}><div style={{ width: '38%', height: '100%', background: 'var(--gm)', borderRadius: 10 }}></div></div></div><span style={{ fontSize: 12, fontWeight: 900, color: 'var(--gl)' }}>38%</span></div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 13px', background: 'var(--g4)', borderRadius: 14 }}><span style={{ fontSize: 19 }}>🌽</span><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 800, color: 'var(--gd)' }}>Maize — 15 farmers</div><div style={{ height: 7, background: 'var(--g3)', borderRadius: 10, marginTop: 5, overflow: 'hidden' }}><div style={{ width: '32%', height: '100%', background: 'var(--gm)', borderRadius: 10 }}></div></div></div><span style={{ fontSize: 12, fontWeight: 900, color: 'var(--gl)' }}>32%</span></div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 13px', background: 'var(--gl2)', border: '1.5px solid var(--gold)', borderRadius: 14 }}><span style={{ fontSize: 19 }}>🌻</span><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 800, color: 'var(--gd)' }}>Sunflower — 14 farmers</div><div style={{ height: 7, background: '#FDE8A0', borderRadius: 10, marginTop: 5, overflow: 'hidden' }}><div style={{ width: '30%', height: '100%', background: 'var(--gold)', borderRadius: 10 }}></div></div></div><span style={{ fontSize: 12, fontWeight: 900, color: 'var(--gld)' }}>30%</span></div>
                    </div>
                    <div style={{ marginTop: 13, fontSize: 12, fontWeight: 700, color: 'var(--gl)' }}>✅ Balanced distribution — no oversupply risk this season</div>
                  </div>
                </div>

                <div className="pnav">
                  <button className="pnav-btn pnav-back" onClick={() => goTo(3)}>← Back to Weather</button>
                  <button className="pnav-btn pnav-next" onClick={() => goTo(5)}>Continue → Languages 🌐</button>
                </div>
              </div>
             </div>
            </div>

            {/* PANEL 5: LANGUAGES */}
            <div className={`panel ${activeStep === 5 ? 'on' : ''}`} id="p5">
             <div className="panel-inner">
              <div className="wrap">
                <div className="shead">
                  <div className="stag">🌐 Feature 5 of 5</div>
                  <h2>5 Indian Languages</h2>
                  <p>Gemini responds in the farmer&apos;s own language. Every recommendation, weather alert and market advisory is fully localised. Tap a language to see it live.</p>
                </div>

                <div className="lang-grid">
                  <div className={`lcard ${lang === 'en' ? 'sel' : ''}`} onClick={() => setLangKey('en')}><div className="lflag">🇬🇧</div><div className="lname">English</div><div className="lscript">English</div></div>
                  <div className={`lcard ${lang === 'hi' ? 'sel' : ''}`} onClick={() => setLangKey('hi')}><div className="lflag">🇮🇳</div><div className="lname">Hindi</div><div className="lscript">हिंदी</div></div>
                  <div className={`lcard ${lang === 'te' ? 'sel' : ''}`} onClick={() => setLangKey('te')}><div className="lflag">🌾</div><div className="lname">Telugu</div><div className="lscript">తెలుగు</div></div>
                  <div className={`lcard ${lang === 'kn' ? 'sel' : ''}`} onClick={() => setLangKey('kn')}><div className="lflag">🏔</div><div className="lname">Kannada</div><div className="lscript">ಕನ್ನಡ</div></div>
                  <div className={`lcard ${lang === 'ta' ? 'sel' : ''}`} onClick={() => setLangKey('ta')}><div className="lflag">🌊</div><div className="lname">Tamil</div><div className="lscript">தமிழ்</div></div>
                </div>

                <div className="demo r">
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gl)', marginBottom: 8 }}>🤖 Live AI Recommendation Preview</div>
                  <div className="demo-crop" id="dCrop">{LD[lang].crop}</div>
                  <div className="demo-adv" id="dAdv">{LD[lang].adv}</div>
                  <div className="demo-lang" id="dLang">{LD[lang].lang}</div>
                </div>

                <div className="final-cta r d1">
                  <div style={{ fontSize: 56, marginBottom: 14 }}>🎉</div>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: 36, fontWeight: 900, color: 'var(--gd)', marginBottom: 12 }}>You&apos;ve explored all 5 features!</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--gm)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>Start your free pilot today. Input your farm&apos;s soil data and get your first AI crop recommendation in under 5 minutes — completely free, no credit card required.</div>
                  <div className="final-cta-btns">
                    <Link href="/login" passHref><button className="btn-primary" style={{ fontSize: 17, padding: '17px 40px' }}>🌱 Start Free Now</button></Link>
                    <button className="btn-ghost" onClick={() => goTo(1)}>↩ Explore Again</button>
                  </div>
                </div>

                <div className="pnav">
                  <button className="pnav-btn pnav-back" onClick={() => goTo(4)}>← Back to Market</button>
                  <Link href="/login" passHref><button className="pnav-btn pnav-finish">🌱 Start Free Trial</button></Link>
                </div>
              </div>
             </div>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}
