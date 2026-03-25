/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase,
  Search,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  MapPin,
  Building2,
  Zap,
  Shield,
  Globe,
  ChevronRight,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";

const stats = [
  { value: "50K+", label: "Active Jobs" },
  { value: "12K+", label: "Companies" },
  { value: "2M+", label: "Candidates" },
  { value: "94%", label: "Placement Rate" },
];

const features = [
  {
    icon: Zap,
    title: "AI-Powered Matching",
    desc: "Our engine scores your resume against every listing — so you only see roles where you actually fit.",
  },
  {
    icon: Shield,
    title: "Verified Employers",
    desc: "Every company is vetted before posting. No ghost listings, no scams — just real opportunities.",
  },
  {
    icon: TrendingUp,
    title: "ATS for Recruiters",
    desc: "A full applicant tracking pipeline — from sourcing to offer — built into the dashboard.",
  },
  {
    icon: Globe,
    title: "Remote-First",
    desc: "Filter by remote, hybrid, or onsite. Your next role can be anywhere in the world.",
  },
];

const jobs = [
  {
    role: "Senior Frontend Engineer",
    company: "Stripe",
    location: "Remote",
    salary: "₹28–42L",
    type: "Full-time",
    tag: "New",
  },
  {
    role: "Product Designer",
    company: "Razorpay",
    location: "Bangalore",
    salary: "₹20–32L",
    type: "Full-time",
    tag: "Hot",
  },
  {
    role: "Backend Engineer — Node.js",
    company: "CRED",
    location: "Remote",
    salary: "₹24–38L",
    type: "Full-time",
    tag: "Featured",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Frontend Dev at Razorpay",
    text: "Got three interview calls in the first week. The AI matching actually works — it didn't waste my time on roles I was overqualified for.",
    initials: "PS",
  },
  {
    name: "Arjun Mehta",
    role: "Recruiter at CRED",
    text: "The ATS pipeline saved our team 10 hours a week. Ranked applicants, drag-and-drop status — everything in one place.",
    initials: "AM",
  },
  {
    name: "Neha Joshi",
    role: "PM at Groww",
    text: "Switched from LinkedIn to Jobbr and landed my job in 3 weeks. The job alerts feature is genuinely useful.",
    initials: "NJ",
  },
];

const footerLinks = {
  Product: ["Job Search", "For Recruiters", "AI Matching", "Job Alerts", "Pricing"],
  Company: ["About", "Blog", "Careers", "Press", "Contact"],
  Resources: ["Documentation", "API", "Status", "Privacy Policy", "Terms"],
};

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-[#0f172a] font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        * { box-sizing: border-box; }
        body { font-family: 'DM Sans', sans-serif; background: #f8f9fc; }

        .glow-orb {
          position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none;
        }

        .accent { color: #1e3a8a; }
        .accent-mid { color: #2563eb; }
        .accent-bg { background: #1e3a8a; }
        .accent-bg-mid { background: #2563eb; }

        .nav-glass {
          background: rgba(248,249,252,0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 1px 2px rgba(30,58,138,0.05);
        }

        .card-white {
          background: #ffffff;
          border: 1px solid rgba(30,58,138,0.08);
          position: relative;
          overflow: hidden;
        }
        .card-white::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(37,99,235,0) 0%, rgba(37,99,235,0.05) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .card-white:hover {
          border-color: rgba(37,99,235,0.25);
          box-shadow: 0 8px 24px rgba(37,99,235,0.1);
          transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
        }
        .card-white:hover::before { opacity: 1; }

        .card-tinted {
          background: rgba(239,246,255,0.7);
          border: 1px solid rgba(30,58,138,0.08);
        }
        .card-tinted:hover {
          border-color: rgba(37,99,235,0.2);
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: #1e3a8a;
          color: #ffffff;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          letter-spacing: 0.01em;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
          position: relative;
          overflow: hidden;
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: translateX(-100%);
        }
        .btn-primary:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(30,58,138,0.3);
        }
        .btn-primary:active {
          transform: translateY(0);
        }

        .btn-outline {
          border: 1px solid rgba(30,58,138,0.2);
          color: #1e3a8a;
          transition: all 0.3s ease;
          position: relative;
        }
        .btn-outline:hover {
          border-color: #2563eb;
          background: rgba(239,246,255,0.6);
          transform: translateY(-1px);
        }

        .tag-new { 
          background: rgba(219,234,254,0.8); 
          color: #1d4ed8; 
          border: 1px solid rgba(37,99,235,0.2); 
          animation: tag-pulse 2s ease-in-out infinite;
        }
        .tag-hot { 
          background: rgba(254,226,226,0.8); 
          color: #dc2626; 
          border: 1px solid rgba(220,38,38,0.2); 
          animation: tag-pulse 2s ease-in-out infinite;
        }
        .tag-feat { 
          background: rgba(237,233,254,0.8); 
          color: #7c3aed; 
          border: 1px solid rgba(124,58,237,0.2); 
        }

        @keyframes tag-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.1); }
          50% { box-shadow: 0 0 0 6px rgba(37,99,235,0); }
        }

        .stat-num {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          color: #1e3a8a;
        }

        .divider { border-color: rgba(30,58,138,0.08); }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fade-up 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.22s; }
        .delay-3 { animation-delay: 0.34s; }
        .delay-4 { animation-delay: 0.46s; }

        @keyframes float-up {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float { animation: float-up 3s ease-in-out infinite; }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .shimmer-loading {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }

        .search-bar {
          background: #ffffff;
          border: 1px solid rgba(30,58,138,0.12);
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(30,58,138,0.05);
        }
        .search-bar:focus-within { 
          border-color: #2563eb;
          box-shadow: 0 12px 32px rgba(37,99,235,0.15);
          transform: translateY(-2px);
        }

        input::placeholder { color: #94a3b8; }
        input { background: transparent; outline: none; color: #0f172a; }

        .hero-badge {
          background: rgba(239,246,255,0.9);
          border: 1px solid rgba(37,99,235,0.15);
          color: #1d4ed8;
          animation: badge-glow 2s ease-in-out infinite;
        }

        @keyframes badge-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.2); }
          50% { box-shadow: 0 0 0 8px rgba(37,99,235,0); }
        }

        .stats-section {
          background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
          position: relative;
          overflow: hidden;
        }
        .stats-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(37,99,235,0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(30,58,138,0.2) 0%, transparent 50%);
          pointer-events: none;
        }

        .feature-icon-wrap {
          background: rgba(219,234,254,0.6);
          border: 1px solid rgba(37,99,235,0.15);
          transition: all 0.3s ease;
        }
        .card-white:hover .feature-icon-wrap {
          background: rgba(37,99,235,0.15);
          border-color: rgba(37,99,235,0.3);
          transform: scale(1.1) rotate(5deg);
        }

        .recruiter-section {
          background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
          position: relative;
          overflow: hidden;
        }
        .recruiter-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 100% 0%, rgba(37,99,235,0.3) 0%, transparent 50%),
            radial-gradient(circle at 0% 100%, rgba(30,58,138,0.3) 0%, transparent 50%);
          pointer-events: none;
        }

        .footer-dark {
          background: linear-gradient(180deg, #0f172a 0%, #0a0f1f 100%);
          position: relative;
        }

        footer a:hover { 
          color: #93c5fd; 
          transition: color 0.2s ease;
        }

        .job-row {
          transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
          position: relative;
        }
        .job-row::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(37,99,235,0) 0%, rgba(37,99,235,0.05) 50%, rgba(37,99,235,0) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .job-row:hover {
          transform: translateX(4px);
          background: rgba(37,99,235,0.02);
        }
        .job-row:hover::before { opacity: 1; }

        .apply-btn { 
          opacity: 0; 
          transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
          transform: translateX(-4px);
        }
        .job-row:hover .apply-btn { 
          opacity: 1; 
          transform: translateX(0);
        }

        .popular-tag {
          background: rgba(219,234,254,0.6);
          color: #1d4ed8;
          border: 1px solid rgba(37,99,235,0.12);
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .popular-tag:hover {
          background: rgba(37,99,235,0.15);
          border-color: rgba(37,99,235,0.3);
          transform: scale(1.05);
        }

        .testimonial-card {
          transition: all 0.3s ease;
        }
        .testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(37,99,235,0.15);
        }

        .scroll-reveal {
          opacity: 0;
          transform: translateY(20px);
        }
        .scroll-reveal.in-view {
          animation: fade-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .pulse-icon { animation: pulse-subtle 2s ease-in-out infinite; }

        .icon-float {
          animation: float-up 3s ease-in-out infinite;
        }

        .star-rating {
          display: flex;
          gap: 2px;
        }
        .star-rating svg {
          transition: all 0.2s ease;
          transform-origin: center;
        }

        .feature-grid:hover .card-white:not(:hover) {
          opacity: 0.6;
        }
        .feature-grid .card-white {
          transition: opacity 0.3s ease;
        }
      `}</style>

      {/* ── Navbar ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-glass border-b divider py-3" : "py-5"}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg accent-bg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
              <Briefcase size={16} color="#ffffff" strokeWidth={2.5} />
            </div>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#0f172a" }} className="transition-all duration-300 group-hover:text-[#2563eb]">Jobbr</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-500">
            <Link href="#features" className="relative hover:text-slate-900 transition-colors group">
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#2563eb] to-transparent group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="#jobs" className="relative hover:text-slate-900 transition-colors group">
              Browse Jobs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#2563eb] to-transparent group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="#recruiters" className="relative hover:text-slate-900 transition-colors group">
              For Recruiters
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#2563eb] to-transparent group-hover:w-full transition-all duration-300" />
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="btn-outline text-sm px-4 py-2 rounded-lg font-medium">Sign in</Link>
            <Link href="/login" className="btn-primary text-sm px-4 py-2 rounded-lg hidden md:block">Get started</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-6 overflow-hidden">
        <div className="glow-orb w-[700px] h-[500px] bg-blue-200/60 top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 animate-float" />
        <div className="glow-orb w-[400px] h-[400px] bg-indigo-200/40 top-1/2 right-0 translate-x-1/3" style={{ animationDelay: '0.5s' }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full hero-badge text-xs mb-8 animate-fade-up">
            <Sparkles size={12} className="text-[#2563eb] pulse-icon" />
            AI-powered job matching — now live
            <ChevronRight size={12} style={{ color: "#2563eb" }} />
          </div>

          <h1
            className="text-5xl md:text-7xl leading-[1.05] mb-6 animate-fade-up delay-1"
            style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, color: "#0f172a" }}
          >
            Find work that
            <br />
            <span style={{ color: "#1e3a8a", position: 'relative', display: 'inline-block' }}>
              actually fits.
              <span className="absolute bottom-0 left-0 w-0 h-1.5 bg-gradient-to-r from-[#2563eb] to-[#1e3a8a] animate-fade-up delay-2" style={{ width: 'auto', animation: 'none' }} />
            </span>
          </h1>

          <p className="text-slate-500 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10 animate-fade-up delay-2" style={{ fontWeight: 300 }}>
            Jobbr matches your resume to the right roles using AI — so you spend less time applying and more time interviewing.
          </p>

          {/* Search bar */}
          <div className="search-bar rounded-2xl p-2 flex flex-col md:flex-row gap-2 max-w-2xl mx-auto mb-6 animate-fade-up delay-3">
            <div className="flex items-center gap-3 flex-1 px-3 py-2">
              <Search size={16} className="text-slate-400 flex-shrink-0" />
              <input type="text" placeholder="Job title, skill, or company" className="flex-1 text-sm" />
            </div>
            <div className="hidden md:block w-px bg-slate-200 my-1" />
            <div className="flex items-center gap-3 flex-1 px-3 py-2">
              <MapPin size={16} className="text-slate-400 flex-shrink-0" />
              <input type="text" placeholder="Location or Remote" className="flex-1 text-sm" />
            </div>
            <Link href="/login" className="btn-primary px-6 py-3 rounded-xl text-sm flex items-center gap-2 justify-center group">
              <span>Search jobs</span>
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <p className="text-slate-400 text-xs animate-fade-up delay-4">
            Popular:{" "}
            {["React Developer", "Product Manager", "Data Scientist", "DevOps Engineer"].map((t, i) => (
              <span key={t}>
                <span className="popular-tag text-xs px-2 py-0.5 rounded-md mx-0.5">{t}</span>
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* ── Stats — dark blue band ── */}
      <section className="stats-section py-14 px-6 relative">
        <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, idx) => (
            <div key={s.label} className="text-center animate-fade-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="stat-num text-4xl md:text-5xl mb-1 transition-transform hover:scale-110 duration-300" style={{ color: "#ffffff", fontFamily: "'Syne',sans-serif", fontWeight: 800 }}>{s.value}</div>
              <div className="text-blue-200 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 animate-fade-up">
            <p className="text-xs font-medium tracking-widest uppercase mb-3 transition-all duration-300 hover:text-[#2563eb]" style={{ color: "#2563eb" }}>Why Jobbr</p>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "2.5rem", color: "#0f172a" }}>
              Built different.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 feature-grid">
            {features.map((f, idx) => (
              <div key={f.title} className="card-white rounded-2xl p-6 cursor-default animate-fade-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="w-10 h-10 rounded-xl feature-icon-wrap flex items-center justify-center mb-5">
                  <f.icon size={18} style={{ color: "#2563eb" }} />
                </div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: "0.95rem", color: "#0f172a", marginBottom: "8px" }}>
                  {f.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed" style={{ fontWeight: 300 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Jobs ── */}
      <section id="jobs" className="relative z-10 py-20 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div className="animate-fade-up">
              <p className="text-xs font-medium tracking-widest uppercase mb-2" style={{ color: "#2563eb" }}>Open roles</p>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "2rem", color: "#0f172a" }}>Featured jobs</h2>
            </div>
            <Link href="/login" className="text-sm text-slate-400 hover:text-slate-700 flex items-center gap-1 transition-all hover:gap-2 duration-300">
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {jobs.map((job, idx) => (
              <div key={job.role} className="card-white rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4 cursor-pointer group job-row animate-fade-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0 transition-all group-hover:bg-blue-100 group-hover:border-blue-300 duration-300">
                  <Building2 size={18} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-medium text-sm text-slate-800 group-hover:text-[#2563eb] transition-colors">{job.role}</h3>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${job.tag === "New" ? "tag-new" : job.tag === "Hot" ? "tag-hot" : "tag-feat"}`}>
                      {job.tag}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                    <span>{job.company}</span>
                    <span className="flex items-center gap-1"><MapPin size={11} /> {job.location}</span>
                    <span>{job.salary}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200 transition-all group-hover:bg-blue-50 group-hover:border-blue-200">{job.type}</span>
                  <Link href="/login" className="btn-primary apply-btn text-xs px-4 py-2 rounded-xl flex items-center gap-1">
                    Apply <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recruiter CTA — dark blue section ── */}
      <section id="recruiters" className="recruiter-section py-20 px-6 relative overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-12">
            <div className="flex-1 animate-fade-up">
              <div className="flex items-center gap-2 mb-4">
                <Users size={16} style={{ color: "#93c5fd" }} className="pulse-icon" />
                <span className="text-xs text-blue-300 tracking-widest uppercase font-medium">For recruiters</span>
              </div>
              <h2 className="text-3xl md:text-4xl mb-5 text-white" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700 }}>
                Hire smarter,<br />not harder.
              </h2>
              <ul className="space-y-3 text-sm text-blue-100">
                {[
                  "AI-ranked applicants by resume match score",
                  "Kanban ATS pipeline — applied to offer",
                  "Automated email notifications on status change",
                  "Analytics on job performance and funnel",
                ].map((item, i) => (
                  <li key={item} className="flex items-start gap-2.5 transition-all hover:translate-x-1 duration-300">
                    <CheckCircle size={15} style={{ color: "#93c5fd", marginTop: "1px", flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0 text-center animate-fade-up delay-1">
              <Link href="/login" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold bg-white text-[#1e3a8a] hover:bg-blue-50 transition-all hover:shadow-lg hover:-translate-y-1 duration-300" style={{ fontFamily: "'Syne',sans-serif" }}>
                Start hiring free <ArrowRight size={16} className="transition-transform hover:translate-x-1" />
              </Link>
              <p className="text-blue-300 text-xs mt-3">No credit card required</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-up">
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "2rem", color: "#0f172a" }}>
              Real people, real results.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map((t, idx) => (
              <div key={t.name} className="card-white rounded-2xl p-6 testimonial-card animate-fade-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="flex gap-0.5 mb-4 star-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="#f59e0b" style={{ color: "#f59e0b" }} />
                  ))}
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-5" style={{ fontWeight: 300 }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-xs font-medium transition-all hover:scale-110 duration-300" style={{ color: "#1e3a8a" }}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative py-24 px-6 text-center overflow-hidden">
        <div className="glow-orb w-[600px] h-[400px] bg-blue-200/50 left-1/2 -translate-x-1/2 top-0 animate-float" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-6xl mb-6 animate-fade-up" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, color: "#0f172a" }}>
            Your next role<br />
            <span style={{ color: "#1e3a8a" }}>starts here.</span>
          </h2>
          <p className="text-slate-500 mb-10 text-lg animate-fade-up delay-1" style={{ fontWeight: 300 }}>
            Join 2 million+ candidates and 12,000+ companies already on Jobbr.
          </p>
          <Link href="/login" className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base animate-fade-up delay-2 group">
            Create free account <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ── Footer — dark ── */}
      <footer className="footer-dark relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4 group">
                <div className="w-8 h-8 rounded-lg accent-bg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <Briefcase size={16} color="#ffffff" strokeWidth={2.5} />
                </div>
                <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#f1f5f9" }} className="transition-all duration-300 group-hover:text-blue-300">Jobbr</span>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6" style={{ fontWeight: 300 }}>
                AI-powered job matching for candidates and recruiters. Built with ❣️
              </p>
              <div className="flex gap-3">
                {[{ icon: Twitter,  }, { icon: Linkedin,  }, { icon: Github,  }].map(({ icon: Icon, }, i) => (
                  <a key={i} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:bg-white/10 hover:scale-110 duration-300">
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h4 className="text-sm mb-4 text-slate-200" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600 }}>{section}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a className="text-slate-500 text-sm hover:text-slate-300 transition-all hover:translate-x-1 duration-200" style={{ fontWeight: 300 }}>{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <p>© 2026 Jobbr. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a className="hover:text-slate-400 transition-colors">Privacy</a>
              <a className="hover:text-slate-400 transition-colors">Terms</a>
              <a className="hover:text-slate-400 transition-colors">Cookies</a>
            </div>
            <a href="mailto:hello@jobbr.dev" className="flex items-center gap-1.5 hover:text-slate-400 transition-colors">
              <Mail size={11} /> hello@jobbr.dev
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}