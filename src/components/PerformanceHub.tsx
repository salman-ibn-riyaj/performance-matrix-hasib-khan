"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

type TabKey = "overview" | "campaigns" | "adsets" | "optimization";
type ChartKey = "spend" | "roas" | "purchases";

interface ITab {
  key: TabKey;
  label: string;
  icon: string;
}

interface IKpi {
  title: string;
  icon: string;
  note: string;
  tag: string;
  tagColor: string;
  tagBg: string;
}

const tabs: ITab[] = [
  { key: "overview", label: "Overview & Trends", icon: "▦" },
  { key: "campaigns", label: "Campaigns & Budget Pacing", icon: "ıl" },
  { key: "adsets", label: "Ad Sets & Ads Drill-Down", icon: "▤" },
  { key: "optimization", label: "Optimization Intelligence", icon: "☆" },
];

const chartTabs: { key: ChartKey; label: string }[] = [
  { key: "spend", label: "Spend & Revenue" },
  { key: "roas", label: "ROAS" },
  { key: "purchases", label: "Purchases & CPA" },
];

const blue = { c: "#60a5fa", bg: "rgba(59,130,246,0.18)" };
const green = { c: "#34d399", bg: "rgba(16,185,129,0.18)" };
const purple = { c: "#c084fc", bg: "rgba(168,85,247,0.18)" };

const kpiRow1: IKpi[] = [
  { title: "TOTAL AD SPEND", icon: "$", note: "Budget investment", tag: "Active", tagColor: blue.c, tagBg: blue.bg },
  { title: "TOTAL PURCHASES", icon: "🛒", note: "Completed orders", tag: "Conversions", tagColor: green.c, tagBg: green.bg },
  { title: "CONVERSION VALUE", icon: "◈", note: "Gross revenue", tag: "Revenue", tagColor: green.c, tagBg: green.bg },
  { title: "BLENDED ROAS", icon: "◎", note: "Return on ad spend", tag: "Target > 2.0x", tagColor: purple.c, tagBg: purple.bg },
  { title: "COST PER PURCHASE", icon: "☺", note: "Acquisition cost (CPA)", tag: "Efficiency", tagColor: blue.c, tagBg: blue.bg },
  { title: "CPM (COST / 1K)", icon: "◉", note: "Impression cost", tag: "Reach", tagColor: blue.c, tagBg: blue.bg },
];

const kpiRow2: IKpi[] = [
  { title: "CPC (COST / CLICK)", icon: "↗", note: "Traffic cost", tag: "Traffic", tagColor: blue.c, tagBg: blue.bg },
  { title: "CTR (CLICK-THROUGH)", icon: "∿", note: "Ad resonance", tag: "Creative", tagColor: purple.c, tagBg: purple.bg },
  { title: "IMPRESSIONS / REACH", icon: "👥", note: "Reach: --", tag: "Audience", tagColor: blue.c, tagBg: blue.bg },
  { title: "LINK CLICKS", icon: "🔗", note: "ATC: -- | IC: --", tag: "Inbound", tagColor: green.c, tagBg: green.bg },
];

const summary: { label: string; value: string }[] = [
  { label: "BLENDED ROAS", value: "--" },
  { label: "REVENUE GENERATED", value: "--" },
  { label: "PURCHASES", value: "--" },
  { label: "COST PER PURCHASE", value: "--" },
];

const s: Record<string, CSSProperties> = {
  page: { minHeight: "100vh", background: "#0b1120", color: "#e5e7eb", fontFamily: "Inter, system-ui, sans-serif", padding: "20px 24px" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 18, borderBottom: "1px solid #1c2640", flexWrap: "wrap", gap: 12 },
  logo: { width: 40, height: 40, borderRadius: 10, background: "#1877f2", display: "grid", placeItems: "center", color: "#fff", fontWeight: 800, fontSize: 22 },
  title: { margin: 0, fontSize: 20, fontWeight: 700, color: "#fff" },
  sub: { margin: "4px 0 0", fontSize: 13, color: "#94a3b8" },
  badge: { fontSize: 11, color: "#93c5fd", background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.35)", borderRadius: 6, padding: "2px 8px", marginLeft: 8 },
  btn: { background: "#111a2e", color: "#e5e7eb", border: "1px solid #25314f", borderRadius: 8, padding: "8px 14px", fontSize: 13, cursor: "pointer" },
  tabs: { display: "flex", gap: 6, margin: "18px 0", flexWrap: "wrap" },
  card: { background: "#0f172a", border: "1px solid #1c2640", borderRadius: 12 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 14, marginBottom: 14 },
  spinner: { width: 20, height: 20, border: "2px solid #25314f", borderTopColor: "#60a5fa", borderRadius: "50%", animation: "hub-spin 0.9s linear infinite" },
};

const Spinner = () => <div style={s.spinner} aria-label="Loading" />;

const KpiCard = ({ kpi }: { kpi: IKpi }) => (
  <div style={{ ...s.card, padding: 16, minHeight: 112, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: "#cbd5e1", letterSpacing: 0.4 }}>{kpi.title}</span>
      <span style={{ width: 28, height: 28, borderRadius: 8, background: "#162033", display: "grid", placeItems: "center", fontSize: 13, color: "#94a3b8" }}>{kpi.icon}</span>
    </div>
    <Spinner />
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11 }}>
      <span style={{ color: "#94a3b8" }}>{kpi.note}</span>
      <span style={{ color: kpi.tagColor, background: kpi.tagBg, padding: "2px 7px", borderRadius: 5, fontWeight: 600 }}>{kpi.tag}</span>
    </div>
  </div>
);

const PerformanceHub = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [activeChart, setActiveChart] = useState<ChartKey>("spend");

  return (
    <div style={s.page}>
      <style>{`@keyframes hub-spin { to { transform: rotate(360deg); } }`}</style>

      {/* Header */}
      <header style={s.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={s.logo}>f</div>
          <div>
            <h1 style={s.title}>
              Performance Hub of Hasib Khan
              <span style={s.badge}>LayLay (act_617192367995980)</span>
            </h1>
            <p style={s.sub}>Full-funnel advertising analytics, return on ad spend, and campaign performance intelligence</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <select style={s.btn} defaultValue="30">
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
          </select>
          <button style={s.btn}>↻ Refresh</button>
        </div>
      </header>

      {/* Tabs */}
      <nav style={s.tabs}>
        {tabs.map((t) => {
          const active = t.key === activeTab;
          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              style={{
                background: active ? "rgba(59,130,246,0.15)" : "transparent",
                color: active ? "#93c5fd" : "#94a3b8",
                border: active ? "1px solid rgba(59,130,246,0.4)" : "1px solid transparent",
                borderRadius: 8,
                padding: "8px 14px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <span style={{ marginRight: 8 }}>{t.icon}</span>
              {t.label}
            </button>
          );
        })}
      </nav>

      {/* Diagnostic banner */}
      <section style={{ ...s.card, padding: 16, marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(16,185,129,0.15)", display: "grid", placeItems: "center", color: "#34d399" }}>↗</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#fff" }}>Campaign Efficiency Diagnostic</div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>Calculating real-time blended return on advertising spend...</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {summary.map((item) => (
            <div key={item.label}>
              <div style={{ fontSize: 10, color: "#94a3b8", letterSpacing: 0.4 }}>{item.label}</div>
              <div style={{ fontWeight: 700 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* KPI cards */}
      <div style={s.grid}>{kpiRow1.map((k) => <KpiCard key={k.title} kpi={k} />)}</div>
      <div style={s.grid}>{kpiRow2.map((k) => <KpiCard key={k.title} kpi={k} />)}</div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14 }}>
        <section style={{ ...s.card, padding: 20, minHeight: 300 }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <div>
              <div style={{ fontWeight: 600, color: "#fff" }}>Performance Trajectory & Scaling Trends</div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>Daily ad spend, purchase conversion value, and ROAS trajectory</div>
            </div>
            <div style={{ display: "flex", background: "#0b1120", border: "1px solid #1c2640", borderRadius: 8, padding: 3, height: "fit-content" }}>
              {chartTabs.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setActiveChart(c.key)}
                  style={{
                    background: c.key === activeChart ? "#1e293b" : "transparent",
                    color: c.key === activeChart ? "#fff" : "#94a3b8",
                    border: "none",
                    borderRadius: 6,
                    padding: "5px 10px",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", placeItems: "center", height: 200, color: "#94a3b8", fontSize: 12 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "grid", placeItems: "center", marginBottom: 8 }}><Spinner /></div>
              Loading trend metrics...
            </div>
          </div>
        </section>

        <section style={{ ...s.card, padding: 20, minHeight: 300 }}>
          <div style={{ fontWeight: 600, color: "#fff" }}>Conversion Funnel Velocity</div>
          <div style={{ fontSize: 12, color: "#94a3b8" }}>Drop-off efficiency from Impression to Purchase</div>
          <div style={{ display: "grid", placeItems: "center", height: 200, color: "#94a3b8", fontSize: 12 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "grid", placeItems: "center", marginBottom: 8 }}><Spinner /></div>
              Loading funnel analysis...
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PerformanceHub;