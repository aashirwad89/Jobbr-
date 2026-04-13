"use client";

import React, { useState } from "react";
import {
  Code2, Heart, MessageSquare, Flag, Bookmark, Share2,
  ChevronDown, ChevronUp, Send, X, MoreHorizontal,
  Flame, TrendingUp, Clock, Plus, Search,
  ThumbsUp, AlertTriangle, CheckCircle, Eye, Terminal,
  Layers, Zap, Sparkles, Users, ArrowUpRight,
} from "lucide-react";

interface Comment {
  id: number; author: string; initials: string; color: string;
  text: string; time: string; likes: number; liked: boolean;
}
interface Post {
  id: number; author: string; initials: string; color: string; role: string; time: string;
  title: string; body: string; code?: string; lang?: string; tags: string[];
  likes: number; liked: boolean; bookmarked: boolean; views: number;
  comments: Comment[]; reported: boolean;
}

const INITIAL_POSTS: Post[] = [
  {
    id: 1, author: "Aryan Kapoor", initials: "AK", color: "#4f46e5", role: "Full Stack Developer", time: "2h ago",
    title: "useCallback vs useMemo — When to Actually Use Them",
    body: "I keep seeing developers blindly sprinkle useCallback and useMemo everywhere. Both are only useful when you need to maintain referential equality or avoid expensive computations. Otherwise, you're just adding overhead with zero benefit.",
    code: `// ❌ Pointless useCallback — no child depends on it
const handleClick = useCallback(() => {
  console.log("clicked");
}, []); // no deps, no child consuming it

// ✅ Useful useCallback — passed down as a prop
const fetchData = useCallback(async () => {
  const res = await api.get("/data");
  setData(res);
}, [userId]); // re-created only when userId changes`,
    lang: "tsx", tags: ["React", "Performance", "Hooks"],
    likes: 84, liked: false, bookmarked: false, views: 1240,
    comments: [
      { id: 1, author: "Neha S.", initials: "NS", color: "#db2777", text: "Exactly this! Removed useMemo from my profile page and render time literally halved.", time: "1h ago", likes: 12, liked: false },
      { id: 2, author: "Raj M.", initials: "RM", color: "#059669", text: "Always measure with React DevTools Profiler before optimizing. Solid advice.", time: "45m ago", likes: 8, liked: false },
    ],
    reported: false,
  },
  {
    id: 2, author: "Priya Bhat", initials: "PB", color: "#d97706", role: "Backend Engineer", time: "5h ago",
    title: "PostgreSQL Index Types — B-Tree, GIN, and BRIN Explained Simply",
    body: "Our production database was crawling. After 3 hours of debugging, I realized we were using the wrong index type. Here's a quick breakdown that would have saved me the headache:",
    code: `-- B-Tree: Default choice, great for range queries
CREATE INDEX idx_users_email ON users(email);

-- GIN: Arrays, JSONB, and full-text search
CREATE INDEX idx_posts_tags ON posts USING GIN(tags);

-- BRIN: Massive time-series tables with low storage cost
CREATE INDEX idx_logs_time ON logs USING BRIN(created_at);

EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'a@b.com';`,
    lang: "sql", tags: ["PostgreSQL", "Database", "Performance"],
    likes: 62, liked: false, bookmarked: false, views: 980,
    comments: [
      { id: 1, author: "Dev K.", initials: "DK", color: "#4f46e5", text: "Never knew about BRIN before this. Perfect for our logs table!", time: "4h ago", likes: 5, liked: false },
    ],
    reported: false,
  },
  {
    id: 3, author: "Siddharth V.", initials: "SV", color: "#059669", role: "DevOps Engineer", time: "1d ago",
    title: "How I Reduced Docker Image Size by 80% with Multi-Stage Builds",
    body: "Our Node.js Docker image was sitting at 1.2 GB. After switching to multi-stage builds, we brought it down to 180 MB. The trick is simple: don't copy your build tools and dev dependencies into the final image.",
    code: `# Stage 1 — Build the application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm run build

# Stage 2 — Production image only
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
EXPOSE 3000
CMD ["node", "server.js"]`,
    lang: "dockerfile", tags: ["Docker", "DevOps", "Optimization"],
    likes: 118, liked: false, bookmarked: false, views: 2100,
    comments: [], reported: false,
  },
];

const TAGS = ["All", "React", "PostgreSQL", "Docker", "Performance", "TypeScript", "DevOps"];
const FILTERS = [{ label: "Trending", icon: Flame }, { label: "Latest", icon: Clock }, { label: "Top", icon: TrendingUp }];
const LANG_COLORS: Record<string, string> = { tsx: "#0ea5e9", sql: "#f59e0b", dockerfile: "#2496ed", ts: "#3178c6", js: "#ca8a04", py: "#3776ab", go: "#00add8" };
const LANG_BG: Record<string, string> = { tsx: "#f0f9ff", sql: "#fffbeb", dockerfile: "#eff6ff", ts: "#eff6ff", js: "#fefce8", py: "#eff6ff", go: "#f0fdfa" };

function Avatar({ initials, color, size = 38 }: { initials: string; color: string; size?: number }) {
  const bg = color + "15";
  const border = color + "35";
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: bg, border: `1.5px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.33, fontWeight: 700, color, flexShrink: 0, letterSpacing: "-0.02em" }}>
      {initials}
    </div>
  );
}

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const [copied, setCopied] = useState(false);
  const dotColor = LANG_COLORS[lang] || "#6366f1";
  const bgColor = LANG_BG[lang] || "#f8fafc";
  return (
    <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #e2e8f0", marginTop: 16, background: bgColor }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "9px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", gap: 5 }}>
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#fca5a5" }} />
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#fcd34d" }} />
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#86efac" }} />
          </div>
          <div style={{ width: 1, height: 14, background: "#e2e8f0", margin: "0 4px" }} />
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: dotColor }} />
          <span style={{ fontSize: 11, fontFamily: "ui-monospace, 'Cascadia Code', monospace", color: "#64748b", fontWeight: 600, letterSpacing: "0.05em" }}>{lang.toUpperCase()}</span>
        </div>
        <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          style={{ fontSize: 11, color: copied ? "#10b981" : "#94a3b8", background: copied ? "#f0fdf4" : "#f8fafc", border: `1px solid ${copied ? "#bbf7d0" : "#e2e8f0"}`, borderRadius: 6, cursor: "pointer", fontFamily: "ui-monospace, monospace", display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", transition: "all 0.2s" }}>
          {copied ? <><CheckCircle size={11} /> Copied</> : "Copy"}
        </button>
      </div>
      <pre style={{ margin: 0, padding: "18px 20px", overflowX: "auto", fontSize: 13, lineHeight: 1.75, fontFamily: "ui-monospace, 'Cascadia Code', 'JetBrains Mono', monospace", color: "#1e293b", background: bgColor }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function ReportModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) {
  const [reason, setReason] = useState("");
  const reasons = ["Spam or self-promotion", "Incorrect or misleading code", "Offensive content", "Duplicate post", "Other"];
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, backdropFilter: "blur(4px)" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 22, width: "100%", maxWidth: 420, padding: 28, border: "1px solid #f1f5f9", boxShadow: "0 32px 64px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: "#fff1f2", border: "1px solid #fecaca", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <AlertTriangle size={16} color="#ef4444" />
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: 15, color: "#0f172a", marginBottom: 1 }}>Report Post</p>
              <p style={{ fontSize: 12, color: "#94a3b8" }}>Help us keep the community safe</p>
            </div>
          </div>
          <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid #f1f5f9", background: "#f8fafc", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
            <X size={13} color="#94a3b8" />
          </button>
        </div>
        <p style={{ fontSize: 13, color: "#64748b", marginBottom: 14, lineHeight: 1.6 }}>Why are you reporting this post?</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 20 }}>
          {reasons.map(r => (
            <button key={r} onClick={() => setReason(r)} style={{ padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${reason === r ? "#4f46e5" : "#f1f5f9"}`, background: reason === r ? "#eef2ff" : "#fafbff", cursor: "pointer", fontSize: 13, color: reason === r ? "#4338ca" : "#475569", textAlign: "left", fontWeight: reason === r ? 600 : 400, display: "flex", alignItems: "center", gap: 10, transition: "all 0.15s" }}>
              <div style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${reason === r ? "#4f46e5" : "#cbd5e1"}`, background: reason === r ? "#4f46e5" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                {reason === r && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />}
              </div>
              {r}
            </button>
          ))}
        </div>
        <button onClick={() => { if (reason) { onSubmit(); onClose(); } }} disabled={!reason}
          style={{ width: "100%", padding: "12px", borderRadius: 12, background: reason ? "#ef4444" : "#f8fafc", color: reason ? "#fff" : "#cbd5e1", border: "none", cursor: reason ? "pointer" : "not-allowed", fontSize: 14, fontWeight: 700, transition: "all 0.2s", letterSpacing: "-0.01em" }}>
          Submit Report
        </button>
      </div>
    </div>
  );
}

function ComposeModal({ onClose, onPost }: { onClose: () => void; onPost: (p: Partial<Post>) => void }) {
  const [title, setTitle] = useState(""); const [body, setBody] = useState(""); const [code, setCode] = useState("");
  const [lang, setLang] = useState("tsx"); const [tag, setTag] = useState("React"); const [showCode, setShowCode] = useState(false);
  const submit = () => { if (!title.trim() || !body.trim()) return; onPost({ title, body, code: showCode ? code : undefined, lang, tags: [tag] }); onClose(); };
  const isReady = title.trim() && body.trim();
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, overflowY: "auto", backdropFilter: "blur(4px)" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 24, width: "100%", maxWidth: 600, padding: 32, border: "1px solid #f1f5f9", boxShadow: "0 32px 64px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)", margin: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 26 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sparkles size={18} color="#fff" />
            </div>
            <div>
              <p style={{ fontWeight: 800, fontSize: 17, color: "#0f172a", letterSpacing: "-0.03em" }}>Share Knowledge</p>
              <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 1 }}>Help the community grow</p>
            </div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 9, border: "1px solid #f1f5f9", background: "#f8fafc", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={13} color="#94a3b8" /></button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Post title..."
            style={{ padding: "13px 16px", borderRadius: 12, border: "1.5px solid #e8edf5", fontSize: 15, fontWeight: 600, outline: "none", color: "#0f172a", background: "#fafbff", transition: "border-color 0.15s", letterSpacing: "-0.02em" }}
            onFocus={e => e.target.style.borderColor = "#a5b4fc"} onBlur={e => e.target.style.borderColor = "#e8edf5"} />
          <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Share what you've learned, a bug you fixed, or a tip that would have saved you hours..." rows={4}
            style={{ padding: "13px 16px", borderRadius: 12, border: "1.5px solid #e8edf5", fontSize: 14, outline: "none", color: "#334155", background: "#fafbff", resize: "vertical", lineHeight: 1.75, transition: "border-color 0.15s" }}
            onFocus={e => e.target.style.borderColor = "#a5b4fc"} onBlur={e => e.target.style.borderColor = "#e8edf5"} />
          <div style={{ display: "flex", gap: 10 }}>
            <select value={tag} onChange={e => setTag(e.target.value)} style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e8edf5", fontSize: 13, color: "#334155", background: "#fafbff", cursor: "pointer", outline: "none" }}>
              {["React", "TypeScript", "PostgreSQL", "Docker", "DevOps", "Python", "Go", "Next.js"].map(t => <option key={t}>{t}</option>)}
            </select>
            <button onClick={() => setShowCode(!showCode)} style={{ padding: "10px 16px", borderRadius: 10, border: `1.5px solid ${showCode ? "#a5b4fc" : "#e8edf5"}`, background: showCode ? "#eef2ff" : "#fafbff", color: showCode ? "#4338ca" : "#64748b", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s" }}>
              <Terminal size={14} /> {showCode ? "Remove Code" : "Add Code"}
            </button>
          </div>
          {showCode && (
            <div style={{ border: "1.5px solid #e8edf5", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", background: "#f8faff", borderBottom: "1px solid #e8edf5" }}>
                <span style={{ fontSize: 11, color: "#94a3b8", fontFamily: "monospace" }}>Language:</span>
                {["tsx", "ts", "sql", "py", "go", "dockerfile"].map(l => (
                  <button key={l} onClick={() => setLang(l)} style={{ padding: "3px 10px", borderRadius: 6, border: `1px solid ${lang === l ? "#a5b4fc" : "#e8edf5"}`, background: lang === l ? "#eef2ff" : "transparent", color: lang === l ? "#4338ca" : "#94a3b8", cursor: "pointer", fontSize: 11, fontFamily: "monospace", fontWeight: 600, transition: "all 0.15s" }}>{l}</button>
                ))}
              </div>
              <textarea value={code} onChange={e => setCode(e.target.value)} placeholder="// Paste your code here..." rows={6}
                style={{ width: "100%", padding: "14px 16px", border: "none", fontSize: 13, fontFamily: "ui-monospace, monospace", outline: "none", color: "#1e293b", background: "#fafbff", resize: "vertical", lineHeight: 1.75 }} />
            </div>
          )}
          <button onClick={submit} disabled={!isReady}
            style={{ padding: "13px", borderRadius: 12, background: isReady ? "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)" : "#f8fafc", color: isReady ? "#fff" : "#cbd5e1", border: "none", cursor: isReady ? "pointer" : "not-allowed", fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em", boxShadow: isReady ? "0 4px 20px rgba(79,70,229,0.25)" : "none", transition: "all 0.2s" }}>
            Publish Post
          </button>
        </div>
      </div>
    </div>
  );
}

function PostCard({ post, onLike, onBookmark, onReport, onAddComment, onLikeComment }:
  { post: Post; onLike: (id: number) => void; onBookmark: (id: number) => void; onReport: (id: number) => void; onAddComment: (postId: number, text: string) => void; onLikeComment: (postId: number, commentId: number) => void }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {showReport && <ReportModal onClose={() => setShowReport(false)} onSubmit={() => onReport(post.id)} />}
      <article style={{ background: "#fff", border: "1px solid #edf0f7", borderRadius: 20, overflow: "hidden", transition: "all 0.2s ease", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(79,70,229,0.08)"; e.currentTarget.style.borderColor = "#dde2ef"; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; e.currentTarget.style.borderColor = "#edf0f7"; }}>

        <div style={{ padding: "22px 24px 0" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar initials={post.initials} color={post.color} />
              <div>
                <p style={{ fontWeight: 700, fontSize: 14, color: "#0f172a", marginBottom: 2, letterSpacing: "-0.02em" }}>{post.author}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>{post.role}</span>
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#d1d5db", display: "inline-block" }} />
                  <span style={{ fontSize: 12, color: "#b0b9cc" }}>{post.time}</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#f8faff", border: "1px solid #edf0f7", borderRadius: 20, padding: "4px 10px" }}>
                <Eye size={11} color="#b0b9cc" />
                <span style={{ fontSize: 11, color: "#b0b9cc", fontFamily: "ui-monospace, monospace", fontWeight: 600 }}>{post.views.toLocaleString()}</span>
              </div>
              <button onClick={() => setShowMenu(!showMenu)} style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid #edf0f7", background: "#f8fafc", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#f1f5f9"} onMouseLeave={e => e.currentTarget.style.background = "#f8fafc"}>
                <MoreHorizontal size={14} color="#94a3b8" />
              </button>
              {showMenu && (
                <div style={{ position: "absolute", top: 36, right: 0, background: "#fff", border: "1px solid #edf0f7", borderRadius: 14, boxShadow: "0 12px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02)", zIndex: 10, minWidth: 168, overflow: "hidden", padding: 4 }}>
                  {[
                    { icon: Flag, label: "Report Post", color: "#ef4444", action: () => { setShowReport(true); setShowMenu(false); } },
                    { icon: Bookmark, label: post.bookmarked ? "Saved" : "Save Post", color: "#475569", action: () => { onBookmark(post.id); setShowMenu(false); } },
                    { icon: Share2, label: "Share Post", color: "#475569", action: () => setShowMenu(false) },
                  ].map(item => (
                    <button key={item.label} onClick={item.action} style={{ width: "100%", padding: "9px 14px", border: "none", background: "none", cursor: "pointer", fontSize: 13, color: item.color, textAlign: "left", display: "flex", alignItems: "center", gap: 8, borderRadius: 10, transition: "background 0.1s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"} onMouseLeave={e => e.currentTarget.style.background = "none"}>
                      <item.icon size={13} /> {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <h2 style={{ fontWeight: 800, fontSize: 17, color: "#0f172a", margin: "16px 0 10px", lineHeight: 1.35, letterSpacing: "-0.03em" }}>{post.title}</h2>
          <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.8 }}>{post.body}</p>
          {post.code && <CodeBlock code={post.code} lang={post.lang || "tsx"} />}

          {/* Tags */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 16 }}>
            {post.tags.map(t => (
              <span key={t} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: "#f0f0fd", border: "1px solid #c7d2fe", color: "#4338ca", fontFamily: "ui-monospace, monospace", fontWeight: 600, letterSpacing: "0.02em" }}>#{t}</span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "14px 20px", borderTop: "1px solid #f8fafc", marginTop: 16 }}>
          <button onClick={() => onLike(post.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10, border: `1.5px solid ${post.liked ? "#fecdd3" : "#f1f5f9"}`, background: post.liked ? "#fff1f2" : "#f8fafc", color: post.liked ? "#e11d48" : "#64748b", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.18s" }}>
            <Heart size={14} fill={post.liked ? "#e11d48" : "none"} color={post.liked ? "#e11d48" : "#94a3b8"} /> {post.likes}
          </button>
          <button onClick={() => setShowComments(!showComments)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10, border: `1.5px solid ${showComments ? "#c7d2fe" : "#f1f5f9"}`, background: showComments ? "#eef2ff" : "#f8fafc", color: showComments ? "#4338ca" : "#64748b", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.18s" }}>
            <MessageSquare size={14} color={showComments ? "#4338ca" : "#94a3b8"} /> {post.comments.length} {showComments ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
          <button onClick={() => onBookmark(post.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 10, border: `1.5px solid ${post.bookmarked ? "#c7d2fe" : "#f1f5f9"}`, background: post.bookmarked ? "#eef2ff" : "#f8fafc", color: post.bookmarked ? "#4338ca" : "#64748b", cursor: "pointer", transition: "all 0.18s" }}>
            <Bookmark size={14} fill={post.bookmarked ? "#4338ca" : "none"} color={post.bookmarked ? "#4338ca" : "#94a3b8"} />
          </button>
          {post.reported && (
            <span style={{ marginLeft: "auto", fontSize: 11, color: "#dc2626", background: "#fff1f2", border: "1px solid #fecaca", borderRadius: 20, padding: "3px 10px", fontFamily: "ui-monospace, monospace", fontWeight: 600 }}>Reported</span>
          )}
        </div>

        {/* Comments */}
        {showComments && (
          <div style={{ padding: "0 20px 20px", borderTop: "1px solid #f8fafc" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14, paddingTop: 16 }}>
              {post.comments.length === 0 && (
                <p style={{ fontSize: 13, color: "#b0b9cc", textAlign: "center", padding: "24px 0" }}>Be the first to comment</p>
              )}
              {post.comments.map(c => (
                <div key={c.id} style={{ display: "flex", gap: 10 }}>
                  <Avatar initials={c.initials} color={c.color} size={30} />
                  <div style={{ flex: 1, background: "#fafbff", borderRadius: 12, padding: "10px 14px", border: "1px solid #edf0f7" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.02em" }}>{c.author}</span>
                      <span style={{ fontSize: 11, color: "#b0b9cc" }}>{c.time}</span>
                    </div>
                    <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.65 }}>{c.text}</p>
                    <button onClick={() => onLikeComment(post.id, c.id)} style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", fontSize: 11, color: c.liked ? "#e11d48" : "#94a3b8", padding: 0, fontWeight: 600, transition: "color 0.15s" }}>
                      <ThumbsUp size={11} fill={c.liked ? "#e11d48" : "none"} /> {c.likes}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Avatar initials="YU" color="#4f46e5" size={30} />
              <div style={{ flex: 1, display: "flex", gap: 8 }}>
                <input value={commentText} onChange={e => setCommentText(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && commentText.trim()) { onAddComment(post.id, commentText.trim()); setCommentText(""); } }}
                  placeholder="Add a comment... (Enter to post)" style={{ flex: 1, padding: "9px 14px", borderRadius: 10, border: "1.5px solid #e8edf5", fontSize: 13, outline: "none", color: "#0f172a", background: "#fafbff", transition: "border-color 0.15s" }}
                  onFocus={e => e.target.style.borderColor = "#a5b4fc"} onBlur={e => e.target.style.borderColor = "#e8edf5"} />
                <button onClick={() => { if (commentText.trim()) { onAddComment(post.id, commentText.trim()); setCommentText(""); } }} disabled={!commentText.trim()}
                  style={{ width: 36, height: 36, borderRadius: 10, background: commentText.trim() ? "linear-gradient(135deg, #4f46e5, #7c3aed)" : "#f1f5f9", border: "none", cursor: commentText.trim() ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                  <Send size={14} color={commentText.trim() ? "#fff" : "#cbd5e1"} />
                </button>
              </div>
            </div>
          </div>
        )}
      </article>
    </>
  );
}

export default function Page() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [activeFilter, setActiveFilter] = useState("Trending");
  const [activeTag, setActiveTag] = useState("All");
  const [search, setSearch] = useState("");
  const [showCompose, setShowCompose] = useState(false);

  const handleLike = (id: number) => setPosts(p => p.map(post => post.id === id ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post));
  const handleBookmark = (id: number) => setPosts(p => p.map(post => post.id === id ? { ...post, bookmarked: !post.bookmarked } : post));
  const handleReport = (id: number) => setPosts(p => p.map(post => post.id === id ? { ...post, reported: true } : post));
  const handleAddComment = (postId: number, text: string) => {
    const colors = ["#4f46e5", "#db2777", "#059669", "#d97706", "#2563eb"];
    const c: Comment = { id: Date.now(), author: "You", initials: "YU", color: colors[Math.floor(Math.random() * colors.length)], text, time: "Just now", likes: 0, liked: false };
    setPosts(p => p.map(post => post.id === postId ? { ...post, comments: [...post.comments, c] } : post));
  };
  const handleLikeComment = (postId: number, commentId: number) =>
    setPosts(p => p.map(post => post.id === postId ? { ...post, comments: post.comments.map(c => c.id === commentId ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 } : c) } : post));
  const handleNewPost = (data: Partial<Post>) => {
    const np: Post = { id: Date.now(), author: "You", initials: "YU", color: "#4f46e5", role: "Developer", time: "Just now", title: data.title!, body: data.body!, code: data.code, lang: data.lang || "tsx", tags: data.tags || ["General"], likes: 0, liked: false, bookmarked: false, views: 1, comments: [], reported: false };
    setPosts(p => [np, ...p]);
  };

  const filtered = posts
    .filter(p => (activeTag === "All" || p.tags.includes(activeTag)) && (!search || p.title.toLowerCase().includes(search.toLowerCase()) || p.body.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => activeFilter === "Top" ? b.likes - a.likes : activeFilter === "Latest" ? b.id - a.id : (b.likes + b.views * 0.01) - (a.likes + a.views * 0.01));

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800;900&family=Geist+Mono:wght@400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Geist', system-ui, sans-serif; background: #f5f6fa; color: #1e293b; -webkit-font-smoothing: antialiased; }
    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 99px; }
    @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
    .post-enter { animation: fadeSlideUp 0.35s cubic-bezier(0.22, 1, 0.36, 1) both; }
    @keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
    .live-dot { animation: pulse-dot 2s ease-in-out infinite; }
  `;

  const totalLikes = posts.reduce((s, p) => s + p.likes, 0);
  const totalComments = posts.reduce((s, p) => s + p.comments.length, 0);
  const totalViews = posts.reduce((s, p) => s + p.views, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f6fa" }}>
      <style>{css}</style>
      {showCompose && <ComposeModal onClose={() => setShowCompose(false)} onPost={handleNewPost} />}

      {/* Header */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid #edf0f7" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: 16, height: 62 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: 4, flexShrink: 0 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Code2 size={17} color="#fff" strokeWidth={2.5} />
            </div>
            <div>
              <span style={{ fontWeight: 800, fontSize: 16, color: "#0f172a", letterSpacing: "-0.04em" }}>CodingHub</span>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 0 }}>
                <div className="live-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#10b981" }} />
                <span style={{ fontSize: 10, color: "#10b981", fontWeight: 600, letterSpacing: "0.04em" }}>LIVE</span>
              </div>
            </div>
          </div>

          {/* Search */}
          <div style={{ flex: 1, position: "relative", maxWidth: 360 }}>
            <Search size={13} color="#b0b9cc" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts and topics..."
              style={{ width: "100%", padding: "9px 12px 9px 34px", borderRadius: 10, border: "1.5px solid #edf0f7", fontSize: 13, background: "#fafbff", color: "#0f172a", outline: "none", transition: "border-color 0.15s" }}
              onFocus={e => e.target.style.borderColor = "#a5b4fc"} onBlur={e => e.target.style.borderColor = "#edf0f7"} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
            <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", borderRadius: 10, border: "1.5px solid #edf0f7", background: "#fafbff", cursor: "pointer", color: "#64748b", fontSize: 13, fontWeight: 600, transition: "all 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#f1f5f9"} onMouseLeave={e => e.currentTarget.style.background = "#fafbff"}>
              <Bookmark size={14} /> Saved
            </button>
            <button onClick={() => setShowCompose(true)} style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 10, background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, letterSpacing: "-0.02em", boxShadow: "0 2px 12px rgba(79,70,229,0.3)", transition: "all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(79,70,229,0.4)"} onMouseLeave={e => e.currentTarget.style.boxShadow = "0 2px 12px rgba(79,70,229,0.3)"}>
              <Plus size={15} /> Write Post
            </button>
            <Avatar initials="YU" color="#4f46e5" size={34} />
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "28px 24px", display: "grid", gridTemplateColumns: "1fr 268px", gap: 22, alignItems: "start" }}>
        <main>
          {/* Filters */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
            <div style={{ display: "flex", background: "#fff", border: "1px solid #edf0f7", borderRadius: 12, padding: 4, gap: 2 }}>
              {FILTERS.map(f => (
                <button key={f.label} onClick={() => setActiveFilter(f.label)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 14px", borderRadius: 9, border: "none", background: activeFilter === f.label ? "#eef2ff" : "transparent", color: activeFilter === f.label ? "#4338ca" : "#64748b", cursor: "pointer", fontSize: 13, fontWeight: activeFilter === f.label ? 700 : 500, transition: "all 0.15s" }}>
                  <f.icon size={13} /> {f.label}
                </button>
              ))}
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
              {TAGS.map(t => (
                <button key={t} onClick={() => setActiveTag(t)} style={{ padding: "5px 12px", borderRadius: 20, border: `1.5px solid ${activeTag === t ? "#a5b4fc" : "#edf0f7"}`, background: activeTag === t ? "#eef2ff" : "#fff", color: activeTag === t ? "#4338ca" : "#64748b", cursor: "pointer", fontSize: 12, fontFamily: "ui-monospace, monospace", fontWeight: 600, transition: "all 0.15s" }}>
                  {t === "All" ? "All" : `#${t}`}
                </button>
              ))}
            </div>
          </div>

          {/* Post Feed */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {filtered.length === 0
              ? (
                <div style={{ textAlign: "center", padding: "64px 20px", background: "#fff", borderRadius: 20, border: "1px solid #edf0f7" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: "#f0f0fd", border: "1px solid #c7d2fe", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <Code2 size={24} color="#a5b4fc" />
                  </div>
                  <p style={{ fontWeight: 700, fontSize: 16, color: "#0f172a", marginBottom: 6, letterSpacing: "-0.03em" }}>No posts found</p>
                  <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>Try a different filter or be the first to write about this topic!</p>
                </div>
              )
              : filtered.map((post, i) => (
                <div key={post.id} className="post-enter" style={{ animationDelay: `${i * 0.05}s` }}>
                  <PostCard post={post} onLike={handleLike} onBookmark={handleBookmark} onReport={handleReport} onAddComment={handleAddComment} onLikeComment={handleLikeComment} />
                </div>
              ))
            }
          </div>
        </main>

        {/* Sidebar */}
        <aside style={{ display: "flex", flexDirection: "column", gap: 14, position: "sticky", top: 82 }}>
          {/* Stats Card */}
          <div style={{ background: "#fff", border: "1px solid #edf0f7", borderRadius: 18, padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <p style={{ fontWeight: 700, fontSize: 14, color: "#0f172a", letterSpacing: "-0.03em" }}>Community Stats</p>
              <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 20, padding: "3px 8px" }}>
                <div className="live-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "#10b981" }} />
                <span style={{ fontSize: 10, color: "#059669", fontWeight: 700, letterSpacing: "0.04em" }}>LIVE</span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { icon: Layers, label: "Posts", val: posts.length, color: "#4f46e5", bg: "#eef2ff", border: "#c7d2fe" },
                { icon: Heart, label: "Likes", val: totalLikes, color: "#e11d48", bg: "#fff1f2", border: "#fecdd3" },
                { icon: MessageSquare, label: "Comments", val: totalComments, color: "#059669", bg: "#f0fdf4", border: "#bbf7d0" },
                { icon: Eye, label: "Views", val: totalViews.toLocaleString(), color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
              ].map(s => (
                <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 12, padding: "12px 14px" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                    <s.icon size={14} color={s.color} />
                  </div>
                  <p style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.04em", marginBottom: 2 }}>{s.val}</p>
                  <p style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Topics */}
          <div style={{ background: "#fff", border: "1px solid #edf0f7", borderRadius: 18, padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
              <TrendingUp size={14} color="#4f46e5" />
              <p style={{ fontWeight: 700, fontSize: 14, color: "#0f172a", letterSpacing: "-0.03em" }}>Trending Topics</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {[
                { tag: "React", posts: "2.4k", color: "#0ea5e9", rank: 1 },
                { tag: "TypeScript", posts: "1.8k", color: "#3178c6", rank: 2 },
                { tag: "Docker", posts: "1.2k", color: "#2496ed", rank: 3 },
                { tag: "PostgreSQL", posts: "920", color: "#f59e0b", rank: 4 },
                { tag: "DevOps", posts: "740", color: "#10b981", rank: 5 },
              ].map(t => (
                <button key={t.tag} onClick={() => setActiveTag(t.tag)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 10px", borderRadius: 10, border: "none", background: activeTag === t.tag ? "#eef2ff" : "transparent", cursor: "pointer", transition: "background 0.15s" }}
                  onMouseEnter={e => { if (activeTag !== t.tag) e.currentTarget.style.background = "#f8faff"; }}
                  onMouseLeave={e => { if (activeTag !== t.tag) e.currentTarget.style.background = "transparent"; }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 11, color: "#d1d5db", fontWeight: 700, fontFamily: "ui-monospace, monospace", width: 14 }}>{t.rank}</span>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: t.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, fontFamily: "ui-monospace, monospace", color: activeTag === t.tag ? "#4338ca" : "#334155", fontWeight: 600 }}>#{t.tag}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ fontSize: 11, color: "#94a3b8", fontFamily: "ui-monospace, monospace" }}>{t.posts}</span>
                    <ArrowUpRight size={11} color="#d1d5db" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ background: "linear-gradient(145deg, #f0f0fd 0%, #f5f3ff 100%)", border: "1px solid #ddd6fe", borderRadius: 18, padding: "22px 20px", textAlign: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg, #4f46e5, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
              <Zap size={22} color="#fff" />
            </div>
            <p style={{ fontWeight: 800, fontSize: 15, color: "#0f172a", marginBottom: 6, letterSpacing: "-0.03em" }}>Share Your Knowledge</p>
            <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.65, marginBottom: 16 }}>Code tips, debugging stories, architecture lessons — the community is ready to learn from you.</p>
            <button onClick={() => setShowCompose(true)} style={{ width: "100%", padding: "11px", borderRadius: 12, background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, letterSpacing: "-0.02em", boxShadow: "0 4px 16px rgba(79,70,229,0.3)", transition: "all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 24px rgba(79,70,229,0.4)"} onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(79,70,229,0.3)"}>
              Write a Post
            </button>
          </div>

          {/* Members online */}
          <div style={{ background: "#fff", border: "1px solid #edf0f7", borderRadius: 18, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Users size={14} color="#94a3b8" />
              <span style={{ fontSize: 13, color: "#475569", fontWeight: 500 }}>Members online</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ display: "flex" }}>
                {["#4f46e5", "#db2777", "#059669"].map((c, i) => (
                  <div key={c} style={{ width: 22, height: 22, borderRadius: "50%", background: c + "20", border: `1.5px solid #fff`, marginLeft: i > 0 ? -6 : 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
                  </div>
                ))}
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>248</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}