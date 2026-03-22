"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  CheckCircle,
  Zap,
  Users,
  TrendingUp,
} from "lucide-react";

type Mode = "login" | "signup";

const perks = [
  { icon: Zap, text: "AI matches you to the right roles instantly" },
  { icon: Users, text: "12,000+ verified companies hiring now" },
  { icon: TrendingUp, text: "Track every application in one dashboard" },
  { icon: CheckCircle, text: "94% placement rate across active users" },
];

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [remember, setRemember] = useState(false);

  const isLogin = mode === "login";

  return (
    <div className="auth-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body { height: 100%; overflow: hidden; }

        .auth-root {
          height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: #f8f9fc;
          overflow: hidden;
        }

        /* ─── Left panel ─── */
        .left-panel {
          width: 46%;
          background: #0f172a;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 36px 44px;
          overflow: hidden;
          flex-shrink: 0;
        }

        @media (max-width: 900px) {
          .left-panel { display: none; }
          .right-panel { width: 100%; }
        }

        .left-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 60% at 20% 10%, rgba(37,99,235,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 80% 80%, rgba(30,58,138,0.25) 0%, transparent 60%);
          pointer-events: none;
        }

        /* dot grid */
        .left-panel::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }

        .left-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          z-index: 2;
        }

        .left-logo-icon {
          width: 34px; height: 34px;
          background: #1e3a8a;
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
        }

        .left-logo-text {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.2rem;
          color: #f1f5f9;
          letter-spacing: -0.01em;
        }

        .left-hero {
          position: relative;
          z-index: 2;
        }

        .left-hero-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #3b82f6;
          margin-bottom: 16px;
        }

        .left-hero-heading {
          font-family: 'Syne', sans-serif;
          font-size: 2.3rem;
          font-weight: 800;
          line-height: 1.1;
          color: #f8fafc;
          margin-bottom: 16px;
        }

        .left-hero-heading span { color: #60a5fa; }

        .left-hero-sub {
          font-size: 0.9rem;
          color: #94a3b8;
          line-height: 1.65;
          font-weight: 300;
          max-width: 320px;
          margin-bottom: 32px;
        }

        .perks-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .perk-item {
          display: flex;
          align-items: center;
          gap: 11px;
          font-size: 0.85rem;
          color: #cbd5e1;
          font-weight: 300;
        }

        .perk-icon {
          width: 30px; height: 30px;
          background: rgba(37,99,235,0.15);
          border: 1px solid rgba(59,130,246,0.2);
          border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .left-bottom {
          position: relative;
          z-index: 2;
          font-size: 11px;
          color: #475569;
        }

        /* ─── Right panel ─── */
        .right-panel {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: #f8f9fc;
          position: relative;
          overflow: hidden;
        }

        .right-panel::before {
          content: '';
          position: absolute;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(219,234,254,0.6) 0%, transparent 70%);
          top: -100px; right: -100px;
          border-radius: 50%;
          pointer-events: none;
        }

        .form-card {
          width: 100%;
          max-width: 400px;
          position: relative;
          z-index: 2;
        }

        .form-top {
          margin-bottom: 20px;
        }

        .form-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.55rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 5px;
          letter-spacing: -0.02em;
        }

        .form-subtitle {
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 300;
        }

        .form-subtitle strong {
          color: #1e3a8a;
          font-weight: 500;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        /* Google button */
        .btn-google {
          width: 100%;
          padding: 10px 16px;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #0f172a;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 16px;
        }

        .btn-google:hover {
          border-color: #94a3b8;
          background: #f8fafc;
        }

        .google-icon {
          width: 18px; height: 18px;
          flex-shrink: 0;
        }

        /* Divider */
        .divider {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          color: #94a3b8;
          font-size: 0.75rem;
        }
        .divider::before, .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e2e8f0;
        }

        /* Form fields */
        .fields {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 14px;
        }

        .field-wrap {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .field-label {
          font-size: 0.75rem;
          font-weight: 500;
          color: #374151;
          letter-spacing: 0.01em;
        }

        .field-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .field-icon {
          position: absolute;
          left: 12px;
          color: #94a3b8;
          pointer-events: none;
          flex-shrink: 0;
        }

        .field-input {
          width: 100%;
          padding: 10px 12px 10px 38px;
          border: 1.5px solid #e2e8f0;
          border-radius: 9px;
          background: #ffffff;
          font-size: 0.875rem;
          color: #0f172a;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }

        .field-input::placeholder {
          color: #cbd5e1;
          font-weight: 300;
        }

        .field-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.08);
        }

        .eye-btn {
          position: absolute;
          right: 10px;
          background: none;
          border: none;
          cursor: pointer;
          color: #94a3b8;
          display: flex;
          align-items: center;
          padding: 2px;
          transition: color 0.15s;
        }
        .eye-btn:hover { color: #475569; }

        /* Remember + forgot */
        .form-extras {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          font-size: 0.82rem;
        }

        .remember-wrap {
          display: flex;
          align-items: center;
          gap: 7px;
          cursor: pointer;
          user-select: none;
          color: #475569;
        }

        .custom-checkbox {
          width: 16px; height: 16px;
          border: 1.5px solid #cbd5e1;
          border-radius: 4px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.15s;
        }

        .custom-checkbox.checked {
          background: #1e3a8a;
          border-color: #1e3a8a;
        }

        .forgot-link {
          color: #2563eb;
          text-decoration: none;
          font-weight: 500;
        }
        .forgot-link:hover { text-decoration: underline; }

        /* Submit button */
        .btn-submit {
          width: 100%;
          padding: 11px;
          background: #1e3a8a;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 600;
          font-family: 'Syne', sans-serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
          letter-spacing: 0.01em;
          margin-bottom: 14px;
        }

        .btn-submit:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(30,58,138,0.25);
        }

        .btn-submit:active { transform: translateY(0); }

        /* Terms */
        .terms-text {
          font-size: 0.72rem;
          color: #94a3b8;
          text-align: center;
          line-height: 1.5;
          font-weight: 300;
        }
        .terms-text a {
          color: #2563eb;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        /* Slide transition */
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .slide-in { animation: slideIn 0.25s ease both; }

        /* mode toggle tabs */
        .mode-tabs {
          display: flex;
          background: #e2e8f0;
          border-radius: 9px;
          padding: 3px;
          margin-bottom: 20px;
          gap: 2px;
        }

        .mode-tab {
          flex: 1;
          padding: 8px;
          border: none;
          border-radius: 6px;
          font-size: 0.84rem;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          background: transparent;
          color: #64748b;
        }

        .mode-tab.active {
          background: #ffffff;
          color: #0f172a;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
      `}</style>

      {/* ── Left Brand Panel ── */}
      <div className="left-panel">
        {/* Logo */}
        <div className="left-logo">
          <div className="left-logo-icon">
            <Briefcase size={18} color="#93c5fd" strokeWidth={2.5} />
          </div>
          <span className="left-logo-text">Jobbr</span>
        </div>

        {/* Hero copy */}
        <div className="left-hero">
          <p className="left-hero-label">Trusted by 2M+ professionals</p>
          <h2 className="left-hero-heading">
            Your career,<br />
            <span>on your terms.</span>
          </h2>
          <p className="left-hero-sub">
            AI-powered matching connects you with roles that actually fit — not just roles that share a keyword with your resume.
          </p>

          <ul className="perks-list">
            {perks.map((p) => (
              <li key={p.text} className="perk-item">
                <div className="perk-icon">
                  <p.icon size={15} color="#60a5fa" />
                </div>
                {p.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom */}
        <div className="left-bottom">
          © 2026 Jobbr · Privacy · Terms
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="right-panel">
        <div className="form-card slide-in" key={mode}>

          {/* Mode toggle tabs */}
          <div className="mode-tabs">
            <button
              className={`mode-tab ${isLogin ? "active" : ""}`}
              onClick={() => setMode("login")}
            >
              Sign in
            </button>
            <button
              className={`mode-tab ${!isLogin ? "active" : ""}`}
              onClick={() => setMode("signup")}
            >
              Create account
            </button>
          </div>

          {/* Title */}
          <div className="form-top">
            <h1 className="form-title">
              {isLogin ? "Welcome back" : "Join Jobbr"}
            </h1>
            <p className="form-subtitle">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <strong onClick={() => setMode(isLogin ? "signup" : "login")}>
                {isLogin ? "Create one free" : "Sign in instead"}
              </strong>
            </p>
          </div>

          {/* Google button */}
          <button className="btn-google">
            <svg className="google-icon" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="divider">or continue with email</div>

          {/* Fields */}
          <div className="fields">

            {/* Full name — signup only */}
            {!isLogin && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div className="field-wrap">
                  <label className="field-label">First name</label>
                  <div className="field-input-wrap">
                    <User size={15} className="field-icon" />
                    <input className="field-input" type="text" placeholder="Arjun" />
                  </div>
                </div>
                <div className="field-wrap">
                  <label className="field-label">Last name</label>
                  <div className="field-input-wrap">
                    <input className="field-input no-icon" type="text" placeholder="Mehta" style={{ paddingLeft: "14px" }} />
                  </div>
                </div>
              </div>
            )}

            {/* Email */}
            <div className="field-wrap">
              <label className="field-label">Email address</label>
              <div className="field-input-wrap">
                <Mail size={15} className="field-icon" />
                <input className="field-input" type="email" placeholder="arjun@example.com" />
              </div>
            </div>

            {/* Password */}
            <div className="field-wrap">
              <label className="field-label">Password</label>
              <div className="field-input-wrap">
                <Lock size={15} className="field-icon" />
                <input
                  className="field-input"
                  type={showPassword ? "text" : "password"}
                  placeholder={isLogin ? "Enter your password" : "Min. 8 characters"}
                  style={{ paddingRight: "44px" }}
                />
                <button
                  className="eye-btn"
                  onClick={() => setShowPassword((v) => !v)}
                  type="button"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm password — signup only */}
            {!isLogin && (
              <div className="field-wrap">
                <label className="field-label">Confirm password</label>
                <div className="field-input-wrap">
                  <Lock size={15} className="field-icon" />
                  <input
                    className="field-input"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat your password"
                    style={{ paddingRight: "44px" }}
                  />
                  <button
                    className="eye-btn"
                    onClick={() => setShowConfirm((v) => !v)}
                    type="button"
                    tabIndex={-1}
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Remember me + forgot */}
          <div className="form-extras">
            <label
              className="remember-wrap"
              onClick={() => setRemember((v) => !v)}
            >
              <div className={`custom-checkbox ${remember ? "checked" : ""}`}>
                {remember && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span style={{ fontSize: "0.85rem" }}>Remember me</span>
            </label>

            {isLogin && (
              <a href="#" className="forgot-link" style={{ fontSize: "0.85rem" }}>
                Forgot password?
              </a>
            )}
          </div>

          {/* Submit */}
          <button className="btn-submit">
            {isLogin ? "Sign in to Jobbr" : "Create my account"}
            <ArrowRight size={16} />
          </button>

          {/* Terms — signup */}
          {!isLogin && (
            <p className="terms-text">
              By creating an account, you agree to our{" "}
              <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>.
            </p>
          )}

          {/* Back to home */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Link
              href="/"
              style={{
                fontSize: "0.8rem",
                color: "#94a3b8",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              ← Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}