"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Bell,
  FileText,
  Brain,
  User,
  Code2,
  Bot,
  ChevronRight,
  Search,
  MapPin,
  Clock,
  CheckCircle2,
  Flame,
  BookOpen,
  BarChart3,
  Sparkles,
  ArrowUpRight,
  Building2,
  Star,
  LayoutDashboard,
  Settings,
  LogOut,
  Zap,
  Target,
} from "lucide-react";

const recommendedJobs = [
  {
    title: "Frontend Engineer",
    company: "Razorpay",
    location: "Bangalore",
    salary: "₹18–28 LPA",
    match: 96,
    type: "Full-time",
    posted: "2h ago",
    logo: "R",
    color: "#3B82F6",
  },
  {
    title: "SDE-2 React",
    company: "Swiggy",
    location: "Remote",
    salary: "₹22–32 LPA",
    match: 91,
    type: "Full-time",
    posted: "5h ago",
    logo: "S",
    color: "#F97316",
  },
  {
    title: "Full Stack Dev",
    company: "Zepto",
    location: "Mumbai",
    salary: "₹15–24 LPA",
    match: 88,
    type: "Hybrid",
    posted: "1d ago",
    logo: "Z",
    color: "#8B5CF6",
  },
];

const alerts = [
  { title: "React Developer", company: "PhonePe", time: "10 min ago", isNew: true },
  { title: "UI Engineer", company: "CRED", time: "1h ago", isNew: true },
  { title: "Frontend Lead", company: "Groww", time: "3h ago", isNew: false },
];

const codingStats = [
  { label: "Easy", done: 48, total: 60, color: "#22C55E" },
  { label: "Medium", done: 31, total: 80, color: "#F59E0B" },
  { label: "Hard", done: 12, total: 50, color: "#EF4444" },
];

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "#", },
  { icon: Brain, label: "Job Reco", href: "#job-recommendations" },
  { icon: Bell, label: "Alerts", href: "#job-alerts" },
  { icon: FileText, label: "Resume", href: "#resume-maker" },
  { icon: Zap, label: "AI Analyser", href: "#resume-analyser" },
  { icon: Code2, label: "Coding Hub", href: "#coding-hub" },
  { icon: Bot, label: "AI Assistant", href: "#ai-assistant" },
  { icon: User, label: "Profile", href: "#profile" },
];

export default function JobbrDashboard() {
  const [activeNav, setActiveNav] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F4F3EF",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        color: "#1A1A2E",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #D1D0CB; border-radius: 4px; }

        .nav-item {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 14px; border-radius: 10px;
          cursor: pointer; text-decoration: none; color: #6B7280;
          font-size: 0.875rem; font-weight: 500;
          transition: all 0.18s; white-space: nowrap;
        }
        .nav-item:hover { background: #ECEAE4; color: #1A1A2E; }
        .nav-item.active { background: #1A1A2E; color: #F4F3EF; }

        .card { background: #FFFFFF; border-radius: 16px; border: 1px solid #E8E6E0; }

        .job-card {
          background: #FFFFFF; border: 1px solid #E8E6E0; border-radius: 14px;
          padding: 18px; transition: all 0.2s; cursor: pointer;
          text-decoration: none; display: block;
        }
        .job-card:hover {
          border-color: #1A1A2E; transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(26,26,46,0.08);
        }

        .badge {
          display: inline-flex; align-items: center;
          padding: 3px 10px; border-radius: 999px;
          font-size: 0.72rem; font-weight: 600;
        }

        .quick-action {
          display: flex; flex-direction: column; align-items: center;
          gap: 10px; padding: 20px 14px; border-radius: 14px;
          cursor: pointer; text-decoration: none; transition: all 0.2s;
          background: #FFFFFF; border: 1px solid #E8E6E0; flex: 1;
        }
        .quick-action:hover {
          border-color: #1A1A2E; transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(26,26,46,0.07);
        }

        .search-bar {
          display: flex; align-items: center; gap: 10px;
          background: #FFFFFF; border: 1px solid #E8E6E0;
          border-radius: 12px; padding: 12px 16px; transition: border-color 0.2s;
        }
        .search-bar:focus-within { border-color: #1A1A2E; }
        .search-bar input {
          border: none; outline: none; background: transparent;
          font-size: 0.9rem; color: #1A1A2E; flex: 1; font-family: inherit;
        }
        .search-bar input::placeholder { color: #9CA3AF; }

        .stat-mini {
          background: #FFFFFF; border: 1px solid #E8E6E0;
          border-radius: 12px; padding: 16px 18px;
          display: flex; flex-direction: column; gap: 4px;
        }

        .progress-bar { height: 6px; border-radius: 999px; background: #F0EEE8; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 999px; }

        .alert-item {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 14px; border-radius: 10px;
          transition: background 0.15s; cursor: pointer;
        }
        .alert-item:hover { background: #F7F6F2; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.4s ease both; }
        .fade-up-1 { animation: fadeUp 0.4s 0.06s ease both; }
        .fade-up-2 { animation: fadeUp 0.4s 0.12s ease both; }
        .fade-up-3 { animation: fadeUp 0.4s 0.18s ease both; }

        .main-grid { display: grid; grid-template-columns: 1fr 340px; gap: 20px; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .quick-grid { display: flex; gap: 12px; }

        @media (max-width: 1100px) {
          .main-grid { grid-template-columns: 1fr; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .sidebar { display: none !important; }
          .main-content { margin-left: 0 !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .quick-grid { flex-wrap: wrap; }
          .quick-action { min-width: calc(50% - 6px); }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      {/* Sidebar */}
      <aside
        className="sidebar"
        style={{
          width: 230,
          background: "#FAFAF7",
          borderRight: "1px solid #E8E6E0",
          display: "flex",
          flexDirection: "column",
          padding: "20px 14px",
          position: "fixed",
          top: 0, left: 0, bottom: 0,
          zIndex: 50,
          overflowY: "auto",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 10px 24px" }}>
          <div
            style={{
              width: 30, height: 30, background: "#1A1A2E", borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <Briefcase size={15} color="#F4F3EF" />
          </div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.15rem", color: "#1A1A2E", letterSpacing: "-0.02em" }}>
            Jobbr
          </span>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
          {navItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`nav-item${activeNav === i ? " active" : ""}`}
                onClick={() => setActiveNav(i)}
              >
                <Icon size={16} />
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Bottom nav */}
        <div style={{ borderTop: "1px solid #E8E6E0", paddingTop: 14, display: "flex", flexDirection: "column", gap: 2 }}>
          <a href="#" className="nav-item"><Settings size={16} /> Settings</a>
          <a href="#" className="nav-item"><LogOut size={16} /> Logout</a>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className="main-content"
        style={{ marginLeft: 230, flex: 1, padding: "28px 32px", overflowY: "auto" }}
      >
        {/* Top Bar */}
        <div
          className="fade-up"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, gap: 16, flexWrap: "wrap" }}
        >
          <div>
            <p style={{ fontSize: "0.8rem", color: "#9CA3AF", fontWeight: 500 }}>Good morning 👋</p>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.6rem", letterSpacing: "-0.025em", color: "#1A1A2E" }}>
              Welcome back, Arjun
            </h1>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="search-bar" style={{ width: 240 }}>
              <Search size={15} color="#9CA3AF" />
              <input
                placeholder="Search jobs, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <a
              href="#job-alerts"
              style={{
                position: "relative", width: 40, height: 40,
                background: "#FFFFFF", border: "1px solid #E8E6E0",
                borderRadius: 10, display: "flex", alignItems: "center",
                justifyContent: "center", cursor: "pointer", textDecoration: "none", color: "#1A1A2E",
              }}
            >
              <Bell size={17} />
              <span style={{ position: "absolute", top: 8, right: 8, width: 7, height: 7, background: "#EF4444", borderRadius: "50%", border: "2px solid #F4F3EF" }} />
            </a>

            <div
              style={{
                width: 40, height: 40, background: "#1A1A2E", borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, color: "#F4F3EF", fontSize: "0.875rem",
                fontFamily: "'Syne', sans-serif",
              }}
            >
              AK
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid fade-up-1" style={{ marginBottom: 20 }}>
          {[
            { icon: Target, label: "Profile Score", value: "74%", sub: "+5% this week", color: "#3B82F6", bg: "#EFF6FF" },
            { icon: Briefcase, label: "Jobs Applied", value: "12", sub: "3 in review", color: "#8B5CF6", bg: "#F5F3FF" },
            { icon: Star, label: "Saved Jobs", value: "28", sub: "4 expiring soon", color: "#F59E0B", bg: "#FFFBEB" },
            { icon: CheckCircle2, label: "Interviews", value: "3", sub: "Next: Fri 3PM", color: "#22C55E", bg: "#F0FDF4" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="stat-mini">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.75rem", color: "#6B7280", fontWeight: 500 }}>{s.label}</span>
                  <div style={{ width: 28, height: 28, background: s.bg, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={14} color={s.color} />
                  </div>
                </div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "#1A1A2E", letterSpacing: "-0.03em" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "0.72rem", color: "#9CA3AF" }}>{s.sub}</div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="quick-grid fade-up-2" style={{ marginBottom: 20 }}>
          {[
            { icon: Brain, label: "Job Reco", href: "#job-recommendations", color: "#3B82F6", bg: "#EFF6FF" },
            { icon: FileText, label: "Resume Maker", href: "#resume-maker", color: "#8B5CF6", bg: "#F5F3FF" },
            { icon: Zap, label: "AI Analyse", href: "#resume-analyser", color: "#F59E0B", bg: "#FFFBEB" },
            { icon: Code2, label: "Coding Hub", href: "#coding-hub", color: "#22C55E", bg: "#F0FDF4" },
            { icon: Bot, label: "AI Assistant", href: "#ai-assistant", color: "#EC4899", bg: "#FDF2F8" },
          ].map((q) => {
            const Icon = q.icon;
            return (
              <a key={q.label} href={q.href} className="quick-action">
                <div style={{ width: 40, height: 40, background: q.bg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={18} color={q.color} />
                </div>
                <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#374151", textAlign: "center" }}>{q.label}</span>
              </a>
            );
          })}
        </div>

        {/* Main Grid */}
        <div className="main-grid fade-up-3">

          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* AI Banner */}
            <div
              style={{
                background: "#1A1A2E", borderRadius: 16, padding: "22px 24px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                gap: 16, position: "relative", overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", right: -30, top: -30, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)" }} />
              <div style={{ zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <Sparkles size={14} color="#F59E0B" />
                  <span style={{ fontSize: "0.75rem", color: "#9CA3AF", fontWeight: 500 }}>AI Suggestion</span>
                </div>
                <p style={{ color: "#F4F3EF", fontWeight: 600, fontSize: "0.95rem", lineHeight: 1.5, maxWidth: 380 }}>
                  Your resume lacks a Projects section. Adding 2–3 projects can boost your match rate by{" "}
                  <span style={{ color: "#6EE7B7" }}>+18%</span>.
                </p>
              </div>
              <a
                href="#resume-maker"
                style={{
                  background: "#F4F3EF", color: "#1A1A2E", padding: "10px 18px",
                  borderRadius: 10, fontWeight: 700, fontSize: "0.82rem",
                  textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0, zIndex: 1,
                  display: "flex", alignItems: "center", gap: 6,
                }}
              >
                Fix Now <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Job Recommendations */}
            <div className="card" style={{ padding: "22px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <div>
                  <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.05rem", color: "#1A1A2E" }}>
                    Recommended for You
                  </h2>
                  <p style={{ fontSize: "0.76rem", color: "#9CA3AF", marginTop: 2 }}>Based on your skills & profile</p>
                </div>
                <a href="#job-recommendations" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.78rem", color: "#3B82F6", fontWeight: 600, textDecoration: "none" }}>
                  See all <ChevronRight size={13} />
                </a>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {recommendedJobs.map((job) => (
                  <a key={job.title} href="#job-recommendations" className="job-card">
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                      <div
                        style={{
                          width: 42, height: 42,
                          background: job.color + "18",
                          border: `1px solid ${job.color}30`,
                          borderRadius: 10,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1rem",
                          color: job.color, flexShrink: 0,
                        }}
                      >
                        {job.logo}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                          <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1A1A2E" }}>{job.title}</span>
                          <span className="badge" style={{ background: "#F0FDF4", color: "#16A34A", border: "1px solid #BBF7D0" }}>
                            {job.match}% match
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 5 }}>
                          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.78rem", color: "#6B7280" }}>
                            <Building2 size={12} /> {job.company}
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.78rem", color: "#6B7280" }}>
                            <MapPin size={12} /> {job.location}
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.78rem", color: "#6B7280" }}>
                            <Clock size={12} /> {job.posted}
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
                          <span className="badge" style={{ background: "#F5F3FF", color: "#7C3AED", border: "1px solid #DDD6FE" }}>
                            {job.type}
                          </span>
                          <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#374151" }}>{job.salary}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Resume Health */}
            <div className="card" style={{ padding: "22px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.05rem" }}>Resume Health</h2>
                <a href="#resume-analyser" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.78rem", color: "#8B5CF6", fontWeight: 600, textDecoration: "none" }}>
                  Analyse <ArrowUpRight size={13} />
                </a>
              </div>
              <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <svg width="88" height="88" viewBox="0 0 88 88">
                    <circle cx="44" cy="44" r="38" fill="none" stroke="#F0EEE8" strokeWidth="8" />
                    <circle cx="44" cy="44" r="38" fill="none" stroke="#8B5CF6" strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 38}`}
                      strokeDashoffset={`${2 * Math.PI * 38 * (1 - 0.72)}`}
                      strokeLinecap="round" transform="rotate(-90 44 44)" />
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "#1A1A2E" }}>72</span>
                    <span style={{ fontSize: "0.62rem", color: "#9CA3AF" }}>/100</span>
                  </div>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { label: "Work Experience", ok: true },
                    { label: "Skills Section", ok: true },
                    { label: "Projects", ok: false },
                    { label: "Certifications", ok: false },
                    { label: "ATS Optimized", ok: true },
                  ].map((item) => (
                    <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <CheckCircle2 size={14} color={item.ok ? "#22C55E" : "#D1D5DB"} fill={item.ok ? "#F0FDF4" : "none"} />
                      <span style={{ fontSize: "0.8rem", color: item.ok ? "#374151" : "#9CA3AF", fontWeight: item.ok ? 500 : 400 }}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Alerts */}
            <div className="card" style={{ padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1rem" }}>Job Alerts</h2>
                <a href="#job-alerts" style={{ fontSize: "0.75rem", color: "#3B82F6", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 3 }}>
                  Manage <ChevronRight size={12} />
                </a>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {alerts.map((a) => (
                  <div key={a.title} className="alert-item">
                    <div style={{ width: 36, height: 36, background: "#F0F9FF", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Bell size={15} color="#3B82F6" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "0.83rem", fontWeight: 600, color: "#1A1A2E" }}>{a.title}</span>
                        {a.isNew && (
                          <span className="badge" style={{ background: "#FEF3C7", color: "#D97706", border: "1px solid #FDE68A", fontSize: "0.65rem" }}>NEW</span>
                        )}
                      </div>
                      <div style={{ fontSize: "0.74rem", color: "#6B7280" }}>{a.company} · {a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="#job-alerts"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  marginTop: 12, padding: "9px", borderRadius: 9,
                  background: "#F7F6F2", color: "#6B7280", fontSize: "0.78rem", fontWeight: 600,
                  textDecoration: "none", border: "1px solid #E8E6E0",
                }}
              >
                <Bell size={13} /> Set New Alert
              </a>
            </div>

            {/* Coding Hub */}
            <div className="card" style={{ padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1rem" }}>Coding Hub</h2>
                <a href="#coding-hub" style={{ fontSize: "0.75rem", color: "#22C55E", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 3 }}>
                  Practice <ArrowUpRight size={12} />
                </a>
              </div>
              <div style={{ background: "#F7F6F2", borderRadius: 10, padding: "12px 14px", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
                <Flame size={18} color="#EF4444" />
                <div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "0.95rem", color: "#1A1A2E" }}>7 day streak 🔥</div>
                  <div style={{ fontSize: "0.72rem", color: "#9CA3AF" }}>Keep it going!</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {codingStats.map((s) => (
                  <div key={s.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: "0.78rem", fontWeight: 500, color: "#374151" }}>{s.label}</span>
                      <span style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>{s.done}/{s.total}</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${(s.done / s.total) * 100}%`, background: s.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="#coding-hub"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  marginTop: 14, padding: "10px", borderRadius: 9,
                  background: "#1A1A2E", color: "#F4F3EF", fontSize: "0.8rem", fontWeight: 700,
                  textDecoration: "none", fontFamily: "'Syne', sans-serif",
                }}
              >
                <Code2 size={13} /> Solve Today&apos;s Problem
              </a>
            </div>

            {/* AI Assistant CTA */}
            <a
              href="#ai-assistant"
              style={{
                background: "linear-gradient(135deg, #1A1A2E 0%, #2D1B4E 100%)",
                borderRadius: 14, padding: "20px", textDecoration: "none",
                display: "flex", flexDirection: "column", gap: 12,
                border: "1px solid #2D2D50", transition: "transform 0.2s", cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, background: "rgba(236,72,153,0.15)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Bot size={18} color="#F9A8D4" />
                </div>
                <div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "0.92rem", color: "#F4F3EF" }}>AI Career Coach</div>
                  <div style={{ fontSize: "0.72rem", color: "#6B7280" }}>Available 24/7</div>
                </div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: "10px 12px" }}>
                <p style={{ fontSize: "0.78rem", color: "#9CA3AF", lineHeight: 1.5, fontStyle: "italic" }}>
                  &quot;How do I answer &apos;Tell me about yourself&apos; for SDE roles?&quot;
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#F9A8D4", fontSize: "0.78rem", fontWeight: 600 }}>
                Ask AI Coach <ArrowUpRight size={13} />
              </div>
            </a>

            {/* Profile completeness */}
            <div className="card" style={{ padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <BarChart3 size={16} color="#6B7280" />
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "0.95rem" }}>Profile Completeness</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { label: "Basic Info", pct: 100, color: "#22C55E" },
                  { label: "Work History", pct: 80, color: "#3B82F6" },
                  { label: "Skills", pct: 65, color: "#F59E0B" },
                  { label: "Education", pct: 100, color: "#22C55E" },
                  { label: "Portfolio", pct: 20, color: "#EF4444" },
                ].map((p) => (
                  <div key={p.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontSize: "0.76rem", color: "#6B7280" }}>{p.label}</span>
                      <span style={{ fontSize: "0.74rem", fontWeight: 600, color: p.color }}>{p.pct}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${p.pct}%`, background: p.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="#profile"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  marginTop: 14, padding: "9px", borderRadius: 9,
                  background: "#F7F6F2", color: "#374151", fontSize: "0.78rem", fontWeight: 600,
                  textDecoration: "none", border: "1px solid #E8E6E0",
                }}
              >
                <BookOpen size={13} /> Complete Profile
              </a>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}