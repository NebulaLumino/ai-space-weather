"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const APP_NAME = "Space Weather Forecaster";
const TAGLINE = "Solar flare, CME & aurora predictions with satellite impact analysis";
const ACCENT = "hsl(180, 70%, 45%)";
const ACCENT_MID = "hsl(180, 60%, 35%)";

export default function SpaceWeatherPage() {
  const [dateRange, setDateRange] = useState("");
  const [location, setLocation] = useState("");
  const [solarActivity, setSolarActivity] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!dateRange || !location) { setOutput("⚠️ Please fill in the date range and location."); return; }
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `You are an expert space weather scientist and heliophysicist. Generate a comprehensive space weather forecast for the specified date range and location.

**Forecast Parameters:**
- Date Range: ${dateRange}
- Location (for aurora viewing): ${location}
- Solar Activity Level: ${solarActivity || "Average/Routine"}

Please provide:

## ☀️ Solar Activity Forecast
Assess expected solar activity including:
- Estimated sunspot number and F10.7cm radio flux for the period
- Likelihood and intensity of solar flares (B, C, M, X-class)
- Coronal Mass Ejection (CME) probability and predicted geoeffectiveness
- Solar energetic particle (SEP) event risk

## 🌊 Geomagnetic Storm Outlook
Provide a Kp index forecast and NOAA G-scale storm rating (G1–G5):
- Quiet (Kp 0–3), Unsettled (Kp 4), Active (Kp 5), G1 Minor (Kp 6), G2 Moderate (Kp 7), G3 Strong (Kp 8), G4 Severe (Kp 9), G5 Extreme (Kp 10)
- Duration and recovery phase estimates

## 🌌 Aurora Visibility Probability
Based on location (${location}) and forecast geomagnetic activity:
- Aurora oval latitude prediction for this location
- Best viewing times (night hours, typically 22:00–02:00 local)
- KP threshold required for visible aurora at this latitude
- Moon phase consideration
- Optimal sky conditions

## 🛰️ Satellite & Electronics Impact Warning
Assess impacts on:
- GPS/GNSS accuracy degradation
- HF radio communications blackouts
- Satellite drag in LEO
- Power grid GIC (Geomagnetically Induced Current) risk
- Aviation radiation exposure on polar routes

## ⚡ Communication & Navigation Disruption
Assess impacts on VLF/HF radio, satellite communications (Starlink, Iridium), and navigation systems.

## 📋 Plain-Language Summary`,
        }),
      });
      const data = await res.json();
      setOutput(data.result || data.error || "No response received.");
    } catch { setOutput("❌ Error generating forecast. Please try again."); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #111 0%, #0a0a0a 50%, #111 100%)", color: "#e5e7eb", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <header style={{ borderBottom: `1px solid ${ACCENT}33`, padding: "1.5rem 2rem", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: ACCENT, boxShadow: `0 0 12px ${ACCENT}` }} />
            <span style={{ color: ACCENT, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>AI x Astronomy</span>
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "0.5rem", color: "#f9fafb", letterSpacing: "-0.02em" }}>{APP_NAME}</h1>
          <p style={{ color: "#9ca3af", fontSize: "0.9rem", marginTop: "0.25rem" }}>{TAGLINE}</p>
        </div>
      </header>
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem" }}>
        <div style={{ height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${ACCENT_MID}, ${ACCENT}, ${ACCENT_MID})`, marginBottom: "2rem" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <div>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "1.75rem" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#f3f4f6", marginBottom: "1.25rem" }}>Forecast Parameters</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>Date Range *</label>
                  <input type="text" value={dateRange} onChange={(e) => setDateRange(e.target.value)} placeholder="e.g., June 2026, next 30 days, December 2026" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Location (for aurora) *</label>
                  <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Alaska, Scotland, New York, Southern Australia" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Solar Activity Level (optional)</label>
                  <select value={solarActivity} onChange={(e) => setSolarActivity(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                    <option value="">Average / Routine</option>
                    <option value="quiet">Quiet (Solar Minimum conditions)</option>
                    <option value="elevated">Elevated (Above average activity)</option>
                    <option value="high">High (Solar Maximum period)</option>
                    <option value="storm">Storm Watch (CME incoming)</option>
                  </select>
                </div>
                <button onClick={handleGenerate} disabled={loading} style={{ ...buttonStyle, background: loading ? "rgba(0,160,160,0.3)" : ACCENT, cursor: loading ? "not-allowed" : "pointer", boxShadow: loading ? "none" : `0 0 20px ${ACCENT}55` }}>
                  {loading ? "⏳ Forecasting..." : "🌞 Generate Forecast"}
                </button>
              </div>
            </div>
            <div style={{ marginTop: "1rem", background: "rgba(0,160,160,0.05)", border: `1px solid ${ACCENT}22`, borderRadius: 12, padding: "1rem 1.25rem" }}>
              <p style={{ fontSize: "0.78rem", color: "#9ca3af", lineHeight: 1.6 }}>
                <span style={{ color: ACCENT, fontWeight: 600 }}>💡 Info:</span> The Kp index (0–10) measures geomagnetic activity globally. Aurora is typically visible at latitudes within ~3 degrees of the auroral oval. NOAA Space Weather Prediction Center issues watches and warnings.
              </p>
            </div>
          </div>
          <div>
            {output ? (
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "1.75rem", minHeight: 400 }}>
                <h2 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#d1d5db", marginBottom: "1.25rem" }}>Space Weather Forecast</h2>
                <div style={{ color: "#d1d5db", fontSize: "0.875rem", lineHeight: 1.75, overflowY: "auto", maxHeight: "calc(100vh - 380px)" }}>
                  <ReactMarkdown>{output}</ReactMarkdown>
                </div>
              </div>
            ) : (
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "1.75rem", minHeight: 400, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", border: `2px solid ${ACCENT}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>🌞</div>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", textAlign: "center" }}>Enter date range and location<br /><strong style={{ color: "#9ca3af" }}>for a space weather forecast</strong></p>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer style={{ borderTop: `1px solid ${ACCENT}22`, padding: "1.25rem 2rem", textAlign: "center", color: "#4b5563", fontSize: "0.75rem", marginTop: "2rem" }}>AI x Astronomy · Cycle 67 · Powered by DeepSeek · For educational and research purposes</footer>
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#9ca3af", marginBottom: "0.35rem", letterSpacing: "0.04em", textTransform: "uppercase" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "0.6rem 0.85rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#f3f4f6", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" };
const buttonStyle: React.CSSProperties = { width: "100%", padding: "0.75rem 1rem", borderRadius: 10, border: "none", color: "#fff", fontSize: "0.875rem", fontWeight: 700, transition: "all 0.2s", marginTop: "0.5rem" };
