/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Briefcase, Search, Users, TrendingUp, CheckCircle, ArrowRight,
  Star, MapPin, Building2, Zap, Shield, Globe, ChevronRight,
  Twitter, Linkedin, Github, Mail, Sparkles, UserPlus, FileText,
  Brain, BarChart3, Map, BookOpen, Bell, LayoutDashboard, Lock,
  Play, Trophy, Target, Flame, ChevronDown,
} from "lucide-react";

const STEPS = [
  {
    num: 1, icon: UserPlus, color: "#6366f1", bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.3)",
    title: "Sign Up / Login", subtitle: "Create your free account in 30 seconds",
    xp: "+50 XP", badge: "Explorer", locked: false,
    desc: "Join 2M+ professionals. Google login supported.",
  },
  {
    num: 2, icon: FileText, color: "#8b5cf6", bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.3)",
    title: "Upload Resume", subtitle: "PDF / DOCX — or skip & build fresh",
    xp: "+100 XP", badge: "Uploader", locked: false,
    desc: "Already have a resume? Upload it. Building fresh? We guide you step by step.",
  },
  {
    num: 3, icon: Brain, color: "#06b6d4", bg: "rgba(6,182,212,0.12)", border: "rgba(6,182,212,0.3)",
    title: "AI Analyses It", subtitle: "Deep scan in under 10 seconds",
    xp: "+150 XP", badge: "Analyst", locked: false,
    desc: "Our AI reads your resume, scores your skills, and finds gaps before recruiters do.",
  },
  {
    num: 4, icon: BarChart3, color: "#10b981", bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)",
    title: "Get Your Report", subtitle: "Score, strengths & gaps — crystal clear",
    xp: "+200 XP", badge: "Self-Aware", locked: true,
    desc: "Visual report: resume score, keyword density, ATS compatibility, and top skill gaps.",
  },
  {
    num: 5, icon: Map, color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)",
    title: "Pick Your Roadmap", subtitle: "Role-specific path — skip if you know your goal",
    xp: "+250 XP", badge: "Pathfinder", locked: true,
    desc: "Frontend? ML? Product? Get a curated skill roadmap tailored to your target role.",
  },
  {
    num: 6, icon: Target, color: "#ef4444", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.3)",
    title: "Job Recommendations", subtitle: "AI matches you — no random scrolling",
    xp: "+300 XP", badge: "Matcher", locked: true,
    desc: "50K+ live jobs. AI shortlists the ones where your resume actually fits.",
  },
  {
    num: 7, icon: Bell, color: "#ec4899", bg: "rgba(236,72,153,0.12)", border: "rgba(236,72,153,0.3)",
    title: "Set Job Alerts", subtitle: "Drop your email, never miss a role",
    xp: "+100 XP", badge: "Vigilant", locked: true,
    desc: "Daily digest of new jobs matching your profile. Unsubscribe anytime.",
  },
  {
    num: 8, icon: LayoutDashboard, color: "#6366f1", bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.3)",
    title: "Dashboard Unlocked", subtitle: "Track everything in one place",
    xp: "+500 XP", badge: "Job Ready ★", locked: true,
    desc: "Application tracker, AI chat, resume builder, and analytics — all live.",
  },
];

const STATS = [
  { value: "50K+", label: "Active Jobs" },
  { value: "12K+", label: "Companies" },
  { value: "2M+", label: "Candidates" },
  { value: "94%", label: "Placement Rate" },
];

const TESTIMONIALS = [
  { name: "Priya Sharma", role: "Frontend Dev at Razorpay", text: "Got three interview calls in the first week. The AI matching actually works.", initials: "PS", xp: "1450 XP" },
  { name: "Arjun Mehta", role: "Recruiter at CRED", text: "The ATS pipeline saved our team 10 hours a week. Everything in one place.", initials: "AM", xp: "2100 XP" },
  { name: "Neha Joshi", role: "PM at Groww", text: "Switched from LinkedIn to Jobbr and landed my job in 3 weeks.", initials: "NJ", xp: "980 XP" },
];

const DISPLAY = `'Syne', system-ui, sans-serif`;
const BODY = `'DM Sans', system-ui, sans-serif`;

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [totalXP, setTotalXP] = useState(0);
  const [showXPPop, setShowXPPop] = useState<string | null>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleStepClick = (stepNum: number) => {
    setActiveStep(activeStep === stepNum ? null : stepNum);
    if (!completedSteps.includes(stepNum)) {
      const step = STEPS[stepNum - 1];
      const xpVal = parseInt(step.xp);
      setCompletedSteps(p => [...p, stepNum]);
      setTotalXP(p => p + xpVal);
      setShowXPPop(step.xp);
      setTimeout(() => setShowXPPop(null), 1800);
    }
  };

  const progressPct = Math.round((completedSteps.length / STEPS.length) * 100);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: '${BODY}'; background: #080810; color: #e8e8f0; overflow-x: hidden; }

    .nav-glass { backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); background: rgba(8,8,16,0.85); border-bottom: 1px solid rgba(99,102,241,0.12); }

    .glow-blob { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }

    .grid-bg {
      background-image: linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
      background-size: 48px 48px;
    }

    .step-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 20px;
      transition: all 0.35s cubic-bezier(0.23,1,0.32,1);
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .step-card::before {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(99,102,241,0) 0%, rgba(99,102,241,0.06) 100%);
      opacity: 0; transition: opacity 0.3s ease;
    }
    .step-card:hover { border-color: rgba(99,102,241,0.3); transform: translateY(-2px); box-shadow: 0 12px 40px rgba(99,102,241,0.12); }
    .step-card:hover::before { opacity: 1; }
    .step-card.active { border-color: rgba(99,102,241,0.5); box-shadow: 0 0 0 1px rgba(99,102,241,0.2), 0 16px 48px rgba(99,102,241,0.15); }
    .step-card.done { border-color: rgba(16,185,129,0.35); background: rgba(16,185,129,0.04); }

    .connector-line {
      position: absolute; left: 31px; top: 100%; width: 2px; height: 24px;
      background: linear-gradient(to bottom, rgba(99,102,241,0.4), rgba(99,102,241,0.1));
      z-index: 0;
    }

    .xp-badge { background: rgba(245,158,11,0.15); border: 1px solid rgba(245,158,11,0.3); color: #fbbf24; border-radius: 999px; padding: 2px 10px; font-size: 11px; font-weight: 600; font-family: 'Courier New', monospace; }

    .rank-badge { border-radius: 999px; padding: 3px 12px; font-size: 11px; font-weight: 600; font-family: 'Courier New', monospace; letter-spacing: 0.06em; }

    .progress-bar-bg { background: rgba(255,255,255,0.07); border-radius: 999px; overflow: hidden; }
    .progress-bar-fill { background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899); border-radius: 999px; transition: width 0.6s cubic-bezier(0.34,1.56,0.64,1); }

    .xp-popup {
      position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
      background: rgba(245,158,11,0.9); color: #0f172a; font-family: 'Syne',sans-serif;
      font-weight: 800; font-size: 28px; padding: 12px 32px; border-radius: 16px;
      z-index: 999; animation: xpPop 1.8s ease forwards; pointer-events: none;
    }
    @keyframes xpPop {
      0% { opacity: 0; transform: translate(-50%, -30%); }
      20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
      70% { opacity: 1; transform: translate(-50%, -60%); }
      100% { opacity: 0; transform: translate(-50%, -80%); }
    }

    .stat-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; }

    .btn-primary {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: #fff; font-family: 'Syne',sans-serif; font-weight: 700;
      border: none; cursor: pointer; transition: all 0.3s ease;
      display: inline-flex; align-items: center; gap: 8px;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(99,102,241,0.4); filter: brightness(1.1); }

    .btn-outline {
      background: transparent; color: #a5b4fc;
      border: 1px solid rgba(99,102,241,0.3); cursor: pointer; transition: all 0.3s ease;
      font-family: 'DM Sans',sans-serif; font-weight: 500;
      display: inline-flex; align-items: center; gap: 8px;
    }
    .btn-outline:hover { border-color: rgba(99,102,241,0.6); background: rgba(99,102,241,0.08); }

    .testimonial-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; transition: all 0.3s ease; }
    .testimonial-card:hover { transform: translateY(-4px); border-color: rgba(99,102,241,0.25); box-shadow: 0 16px 48px rgba(99,102,241,0.1); }

    .job-tag { background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.2); color: #a5b4fc; border-radius: 8px; padding: 4px 12px; font-size: 12px; font-family: 'Courier New',monospace; transition: all 0.2s; cursor: pointer; }
    .job-tag:hover { background: rgba(99,102,241,0.2); border-color: rgba(99,102,241,0.4); transform: scale(1.05); }

    .footer-dark { background: #04040a; border-top: 1px solid rgba(99,102,241,0.1); }

    @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
    .fade-up { animation: fadeUp 0.7s cubic-bezier(0.34,1.56,0.64,1) both; }
    .d1 { animation-delay: 0.1s; } .d2 { animation-delay: 0.22s; } .d3 { animation-delay: 0.34s; }

    @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
    .float { animation: float 4s ease-in-out infinite; }

    @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
    .pulse { animation: pulse 2s ease-in-out infinite; }

    .hero-badge { background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.25); color: #a5b4fc; border-radius: 999px; display:inline-flex; align-items:center; gap:6px; padding: 6px 16px; font-size:12px; }

    .lock-overlay { position:absolute; inset:0; background:rgba(8,8,16,0.5); border-radius:20px; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(1px); }

    .step-num-circle {
      width: 36px; height: 36px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Syne',sans-serif; font-weight: 800; font-size: 14px;
      flex-shrink: 0;
    }

    .section-label { font-family: 'Courier New',monospace; font-size:11px; letter-spacing:0.15em; text-transform:uppercase; color:#6366f1; margin-bottom:8px; display:block; }

    input { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:10px; padding:10px 14px; color:#e2e8f0; font-size:14px; font-family:'DM Sans',sans-serif; outline:none; transition:border-color 0.2s; }
    input:focus { border-color:rgba(99,102,241,0.5); }
    input::placeholder { color:#4b5563; }

    .nav-link { color: #64748b; font-size:14px; text-decoration:none; transition:color 0.2s; position:relative; }
    .nav-link:hover { color:#e2e8f0; }
    .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:1px; background:#6366f1; transition:width 0.3s; }
    .nav-link:hover::after { width:100%; }

    .milestone-dot { width:10px; height:10px; border-radius:50%; flex-shrink:0; }

    @keyframes shimmer { 0% { background-position:-400px 0; } 100% { background-position:400px 0; } }
    .shimmer { background:linear-gradient(90deg, rgba(99,102,241,0.05) 0%, rgba(99,102,241,0.15) 50%, rgba(99,102,241,0.05) 100%); background-size:400px; animation:shimmer 2.5s infinite; }
  `;

  return (
    <div style={{ minHeight: "100vh", background: "#080810", color: "#e8e8f0", fontFamily: BODY, overflowX: "hidden" }}>
      <style>{css}</style>

      {showXPPop && <div className="xp-popup">{showXPPop} earned!</div>}

      {/* ── Navbar ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-glass" : ""}`} style={{ padding: scrolled ? "12px 0" : "20px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Briefcase size={16} color="#fff" strokeWidth={2.5} />
            </div>
            <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 18, color: "#e8e8f0" }}>Jobbr</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <a href="#journey" className="nav-link">Journey</a>
            <a href="#jobs" className="nav-link">Jobs</a>
            <a href="#testimonials" className="nav-link">Stories</a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Link href="/login"><button className="btn-outline" style={{ padding: "8px 18px", borderRadius: 10, fontSize: 14 }}>Sign in</button></Link>
            <Link href="/login"><button className="btn-primary" style={{ padding: "9px 20px", borderRadius: 10, fontSize: 14 }}>Get started</button></Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="grid-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div className="glow-blob" style={{ width: 600, height: 400, background: "rgba(99,102,241,0.18)", top: -80, left: "50%", transform: "translateX(-50%)" }} />
        <div className="glow-blob float" style={{ width: 300, height: 300, background: "rgba(236,72,153,0.1)", bottom: 0, right: -50, animationDelay: "1s" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
          <div className="hero-badge fade-up" style={{ marginBottom: 24 }}>
            <Sparkles size={12} className="pulse" />
            <span>8 steps. 1 goal. Your dream job.</span>
            <ChevronRight size={12} />
          </div>

          <h1 className="fade-up d1" style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(44px,7vw,80px)", lineHeight: 1.05, marginBottom: 24, letterSpacing: "-0.03em" }}>
            Go from{" "}
            <span style={{ color: "#6366f1" }}>resume</span>
            <br />to{" "}
            <span style={{ background: "linear-gradient(90deg,#6366f1,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              job offer
            </span>
            .
          </h1>

          <p className="fade-up d2" style={{ fontSize: 18, color: "#94a3b8", lineHeight: 1.7, maxWidth: 500, margin: "0 auto 40px", fontWeight: 300 }}>
            Jobbr turns job hunting into a guided quest. Upload your resume, let AI do the heavy lifting, and unlock your next role — step by step.
          </p>

          <div className="fade-up d3" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <Link href="/login">
              <button className="btn-primary" style={{ padding: "14px 32px", borderRadius: 14, fontSize: 16 }}>
                <Play size={16} /> Start your journey
              </button>
            </Link>
            <a href="#journey">
              <button className="btn-outline" style={{ padding: "14px 24px", borderRadius: 14, fontSize: 15 }}>
                See how it works <ChevronDown size={15} />
              </button>
            </a>
          </div>

          {/* XP teaser bar */}
          <div className="fade-up" style={{ marginTop: 56, display: "inline-flex", alignItems: "center", gap: 20, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "16px 28px" }}>
            <div style={{ textAlign: "left" }}>
              <p style={{ fontFamily: "Courier New", fontSize: 10, color: "#6b7280", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>Your progress</p>
              <div className="progress-bar-bg" style={{ width: 180, height: 6 }}>
                <div className="progress-bar-fill" style={{ width: `${progressPct}%`, height: "100%" }} />
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 22, color: "#fbbf24" }}>{totalXP}</p>
              <p style={{ fontFamily: "Courier New", fontSize: 10, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em" }}>XP earned</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 15, color: "#a5b4fc" }}>{completedSteps.length}/8</p>
              <p style={{ fontFamily: "Courier New", fontSize: 10, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em" }}>Steps done</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8-Step Gamified Journey ── */}
      <section id="journey" style={{ padding: "100px 24px", position: "relative" }}>
        <div className="glow-blob" style={{ width: 500, height: 300, background: "rgba(139,92,246,0.08)", top: 0, right: -100 }} />

        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="section-label">✦ The Quest</span>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(28px,4vw,44px)", color: "#e8e8f0", marginBottom: 12, letterSpacing: "-0.02em" }}>
              8 steps to job-ready
            </h2>
            <p style={{ color: "#64748b", fontSize: 15, fontWeight: 300, maxWidth: 440, margin: "0 auto" }}>
              Click each step to explore it — and earn XP along the way. Locked steps unlock as you progress.
            </p>
          </div>

          {/* Interactive XP tracker strip */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 40, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "12px 20px" }}>
            <Trophy size={16} color="#fbbf24" />
            <div className="progress-bar-bg" style={{ flex: 1, height: 8 }}>
              <div className="progress-bar-fill" style={{ width: `${progressPct}%`, height: "100%" }} />
            </div>
            <span style={{ fontFamily: "Courier New", fontSize: 12, color: "#fbbf24", minWidth: 80, textAlign: "right" }}>
              {totalXP} / 1650 XP
            </span>
            <span style={{ fontFamily: "Courier New", fontSize: 10, color: "#6b7280" }}>{progressPct}%</span>
          </div>

          {/* Steps */}
          <div ref={stepsRef} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {STEPS.map((step, idx) => {
              const isDone = completedSteps.includes(step.num);
              const isActive = activeStep === step.num;
              const IconComp = step.icon;

              return (
                <div key={step.num} style={{ position: "relative" }}>
                  <div
                    className={`step-card ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
                    onClick={() => handleStepClick(step.num)}
                    style={{ padding: "20px 24px" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      {/* Step number circle */}
                      <div className="step-num-circle" style={{ background: isDone ? "rgba(16,185,129,0.2)" : step.bg, border: `1px solid ${isDone ? "rgba(16,185,129,0.4)" : step.border}`, color: isDone ? "#34d399" : step.color }}>
                        {isDone ? <CheckCircle size={18} /> : step.num}
                      </div>

                      {/* Icon */}
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: isDone ? "rgba(16,185,129,0.1)" : step.bg, border: `1px solid ${isDone ? "rgba(16,185,129,0.3)" : step.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <IconComp size={20} color={isDone ? "#34d399" : step.color} />
                      </div>

                      {/* Text */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" }}>
                          <h3 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 16, color: isDone ? "#34d399" : "#e8e8f0" }}>{step.title}</h3>
                          <span className="xp-badge">{step.xp}</span>
                          {isDone && <span style={{ fontFamily: "Courier New", fontSize: 10, color: "#34d399", letterSpacing: "0.1em" }}>✓ DONE</span>}
                        </div>
                        <p style={{ fontSize: 13, color: "#6b7280", fontWeight: 300 }}>{step.subtitle}</p>
                      </div>

                      {/* Badge + chevron */}
                      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                        <span className="rank-badge" style={{ background: isDone ? "rgba(16,185,129,0.1)" : "rgba(99,102,241,0.1)", border: `1px solid ${isDone ? "rgba(16,185,129,0.3)" : "rgba(99,102,241,0.25)"}`, color: isDone ? "#34d399" : "#a5b4fc" }}>
                          {step.badge}
                        </span>
                        <ChevronDown size={16} color="#4b5563" style={{ transform: isActive ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }} />
                      </div>
                    </div>

                    {/* Expanded content */}
                    {isActive && (
                      <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                        <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7, fontWeight: 300, marginBottom: 16 }}>{step.desc}</p>
                        <div style={{ display: "flex", gap: 10 }}>
                          <Link href="/login">
                            <button className="btn-primary" style={{ padding: "9px 20px", borderRadius: 10, fontSize: 13 }}>
                              {step.num === 1 ? "Sign up free" : "Continue →"}
                            </button>
                          </Link>
                          {step.num === 2 || step.num === 5 ? (
                            <button className="btn-outline" style={{ padding: "8px 16px", borderRadius: 10, fontSize: 13 }}>Skip this step</button>
                          ) : null}
                        </div>
                      </div>
                    )}

                    {/* Lock overlay for locked steps that aren't done */}
                    {step.locked && !isDone && completedSteps.length < step.num - 1 && (
                      <div className="lock-overlay">
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                          <Lock size={18} color="#4b5563" />
                          <span style={{ fontFamily: "Courier New", fontSize: 11, color: "#4b5563", letterSpacing: "0.1em" }}>Complete step {step.num - 1} to unlock</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Connector */}
                  {idx < STEPS.length - 1 && (
                    <div style={{ width: 2, height: 16, background: isDone ? "rgba(16,185,129,0.4)" : "rgba(99,102,241,0.2)", margin: "0 auto", position: "relative", zIndex: 0 }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Final CTA after steps */}
          <div style={{ marginTop: 48, textAlign: "center" }}>
            <div style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 20, padding: "36px 40px" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🏆</div>
              <h3 style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 22, marginBottom: 8 }}>Job Ready badge awaits</h3>
              <p style={{ fontSize: 14, color: "#64748b", fontWeight: 300, marginBottom: 24 }}>Complete all 8 steps. Earn 1,650 XP. Unlock your dashboard.</p>
              <Link href="/login">
                <button className="btn-primary" style={{ padding: "14px 36px", borderRadius: 14, fontSize: 16 }}>
                  <Flame size={16} /> Begin the quest
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: "60px 24px", background: "linear-gradient(135deg,#0f0f1f,#0a0a18)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {STATS.map((s, i) => (
            <div key={s.label} className="stat-card" style={{ padding: "28px 20px", textAlign: "center" }}>
              <p style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 36, color: "#6366f1", marginBottom: 4 }}>{s.value}</p>
              <p style={{ fontSize: 13, color: "#64748b" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Job tags / browse ── */}
      <section id="jobs" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span className="section-label">✦ Live Roles</span>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(24px,3.5vw,38px)", letterSpacing: "-0.02em" }}>50,000+ jobs waiting</h2>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {["React Developer", "Product Manager", "Data Scientist", "DevOps Engineer", "UX Designer", "Backend Engineer", "ML Engineer", "iOS Developer", "Growth Hacker", "Android Dev"].map(tag => (
              <Link href="/login" key={tag}><span className="job-tag">{tag}</span></Link>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link href="/login"><button className="btn-primary" style={{ padding: "12px 28px", borderRadius: 12, fontSize: 14 }}>Browse all jobs <ArrowRight size={15} /></button></Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" style={{ padding: "80px 24px", background: "rgba(255,255,255,0.015)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-label">✦ Player Stories</span>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(24px,3.5vw,38px)", letterSpacing: "-0.02em" }}>They completed the quest.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="testimonial-card" style={{ padding: "28px" }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7, fontWeight: 300, marginBottom: 20 }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#a5b4fc" }}>{t.initials}</div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{t.name}</p>
                    <p style={{ fontSize: 12, color: "#4b5563" }}>{t.role}</p>
                  </div>
                  <span className="xp-badge" style={{ marginLeft: "auto" }}>{t.xp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ padding: "100px 24px", position: "relative", overflow: "hidden" }}>
        <div className="glow-blob" style={{ width: 600, height: 400, background: "rgba(99,102,241,0.15)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <span className="section-label">✦ Ready?</span>
          <h2 style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(32px,5vw,60px)", marginBottom: 16, letterSpacing: "-0.03em" }}>
            Your quest starts{" "}
            <span style={{ background: "linear-gradient(90deg,#6366f1,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>now.</span>
          </h2>
          <p style={{ fontSize: 16, color: "#64748b", fontWeight: 300, marginBottom: 36 }}>
            Join 2M+ candidates. Free forever for job seekers.
          </p>
          <Link href="/login">
            <button className="btn-primary" style={{ padding: "16px 40px", borderRadius: 16, fontSize: 17 }}>
              <Flame size={18} /> Start the 8-step quest
            </button>
          </Link>
          <p style={{ marginTop: 14, fontSize: 12, color: "#374151" }}>No credit card · Takes 30 seconds</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer-dark" style={{ padding: "48px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 40 }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Briefcase size={15} color="#fff" />
              </div>
              <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 16, color: "#e8e8f0" }}>Jobbr</span>
            </Link>
            <div style={{ display: "flex", gap: 12 }}>
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a key={i} style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}>
                  <Icon size={14} color="#4b5563" />
                </a>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: 12, color: "#374151" }}>© 2026 Jobbr. All rights reserved.</p>
            <div style={{ display: "flex", gap: 24 }}>
              {["Privacy", "Terms", "Contact"].map(l => (
                <a key={l} style={{ fontSize: 12, color: "#374151", textDecoration: "none", transition: "color 0.2s", cursor: "pointer" }}>{l}</a>
              ))}
            </div>
            <a href="mailto:hello@jobbr.dev" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#374151", textDecoration: "none" }}>
              <Mail size={11} /> hello@jobbr.dev
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}