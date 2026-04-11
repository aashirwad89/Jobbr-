"use client";

import React, { useState } from "react";
import {
  Code2, Heart, MessageSquare, Flag, Bookmark, Share2,
  ChevronDown, ChevronUp, Send, X, MoreHorizontal,
  Flame, TrendingUp, Clock, Plus, Search,
  ThumbsUp, AlertTriangle, CheckCircle, Eye, Terminal,
  Layers, Zap,
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
    id: 1, author: "Aryan Kapoor", initials: "AK", color: "#6366f1", role: "Full Stack Dev", time: "2h ago",
    title: "useCallback vs useMemo — when to actually use them",
    body: "Har jagah dekha hai log blindly useCallback aur useMemo daal dete hain. Yeh dono sirf tab useful hain jab aapko referential equality maintain karni ho ya expensive computation avoid karni ho. Warna aap sirf overhead add kar rahe ho.",
    code: `// ❌ Useless useCallback
const handleClick = useCallback(() => {
  console.log("clicked");
}, []); // no deps, no child using it

// ✅ Useful useCallback  
const fetchData = useCallback(async () => {
  const res = await api.get("/data");
  setData(res);
}, [userId]); // passed to child as prop`,
    lang: "tsx", tags: ["React", "Performance", "Hooks"],
    likes: 84, liked: false, bookmarked: false, views: 1240,
    comments: [
      { id: 1, author: "Neha S.", initials: "NS", color: "#ec4899", text: "Bilkul sahi bola! Profile page mein useMemo hataya to render time aadha ho gaya 😭", time: "1h ago", likes: 12, liked: false },
      { id: 2, author: "Raj M.", initials: "RM", color: "#10b981", text: "React DevTools Profiler se pehle measure karo, then optimize. Gold advice.", time: "45m ago", likes: 8, liked: false },
    ],
    reported: false,
  },
  {
    id: 2, author: "Priya Bhat", initials: "PB", color: "#f59e0b", role: "Backend Engineer", time: "5h ago",
    title: "PostgreSQL Index types — BTree, GIN, BRIN explained simply",
    body: "Database slow ho raha tha production mein. 3 ghante debug ke baad pata chala wrong index type use kar raha tha. Yahan short breakdown hai:",
    code: `-- B-Tree: Default, range queries ke liye
CREATE INDEX idx_users_email ON users(email);

-- GIN: Array / JSONB full-text search
CREATE INDEX idx_posts_tags ON posts USING GIN(tags);

-- BRIN: Huge time-series tables (low storage)
CREATE INDEX idx_logs_time ON logs USING BRIN(created_at);

EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'a@b.com';`,
    lang: "sql", tags: ["PostgreSQL", "Database", "Performance"],
    likes: 62, liked: false, bookmarked: false, views: 980,
    comments: [
      { id: 1, author: "Dev K.", initials: "DK", color: "#6366f1", text: "BRIN ke baare mein pehle nahi suna tha. Logs table ke liye bilkul sahi!", time: "4h ago", likes: 5, liked: false },
    ],
    reported: false,
  },
  {
    id: 3, author: "Siddharth V.", initials: "SV", color: "#10b981", role: "DevOps @ Scale", time: "1d ago",
    title: "Docker multi-stage builds se image size 80% reduce kaise ki",
    body: "Hamare Node.js Docker image 1.2GB thi. Multi-stage build ke baad 180MB. Difference sirf build tools aur dev dependencies ko final image mein na dalna tha.",
    code: `# Stage 1 — Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm run build

# Stage 2 — Production only!
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
const LANG_COLORS: Record<string, string> = { tsx: "#61dafb", sql: "#f59e0b", dockerfile: "#2496ed", ts: "#3178c6", js: "#f7df1e", py: "#3776ab" };

function Avatar({ initials, color, size = 38 }: { initials: string; color: string; size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: `${color}18`, border: `1.5px solid ${color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.35, fontWeight: 700, color, flexShrink: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
      {initials}
    </div>
  );
}

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #e2e8f0", marginTop: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f8faff", borderBottom: "1px solid #e2e8f0", padding: "8px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: LANG_COLORS[lang] || "#6366f1" }} />
          <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#64748b", fontWeight: 600 }}>{lang.toUpperCase()}</span>
        </div>
        <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          style={{ fontSize: 11, color: copied ? "#10b981" : "#94a3b8", background: "none", border: "none", cursor: "pointer", fontFamily: "'JetBrains Mono', monospace", display: "flex", alignItems: "center", gap: 4 }}>
          {copied ? <><CheckCircle size={12} /> Copied!</> : "Copy"}
        </button>
      </div>
      <pre style={{ margin: 0, padding: "16px", background: "#fafbff", overflowX: "auto", fontSize: 13, lineHeight: 1.7, fontFamily: "'JetBrains Mono', monospace", color: "#334155" }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function ReportModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) {
  const [reason, setReason] = useState("");
  const reasons = ["Spam or self-promotion", "Incorrect / misleading code", "Offensive content", "Duplicate post", "Other"];
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.45)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: 420, padding: 28, border: "1px solid #e2e8f0", boxShadow: "0 24px 64px rgba(99,102,241,0.12)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "#fef2f2", border: "1px solid #fecaca", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <AlertTriangle size={16} color="#ef4444" />
            </div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: "#0f172a" }}>Report Post</span>
          </div>
          <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid #e2e8f0", background: "#f8fafc", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={14} color="#64748b" />
          </button>
        </div>
        <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>Yeh post kyun report kar rahe ho?</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {reasons.map(r => (
            <button key={r} onClick={() => setReason(r)} style={{ padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${reason === r ? "#6366f1" : "#e2e8f0"}`, background: reason === r ? "#eef2ff" : "#f8fafc", cursor: "pointer", fontSize: 13, color: reason === r ? "#4f46e5" : "#475569", textAlign: "left", fontWeight: reason === r ? 600 : 400, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${reason === r ? "#6366f1" : "#cbd5e1"}`, background: reason === r ? "#6366f1" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {reason === r && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />}
              </div>
              {r}
            </button>
          ))}
        </div>
        <button onClick={() => { if (reason) { onSubmit(); onClose(); } }} disabled={!reason}
          style={{ width: "100%", padding: "11px", borderRadius: 12, background: reason ? "linear-gradient(135deg,#ef4444,#dc2626)" : "#f1f5f9", color: reason ? "#fff" : "#94a3b8", border: "none", cursor: reason ? "pointer" : "not-allowed", fontSize: 14, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
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
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.45)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, overflowY: "auto" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 24, width: "100%", maxWidth: 600, padding: 32, border: "1px solid #e2e8f0", boxShadow: "0 24px 64px rgba(99,102,241,0.12)", margin: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}><Code2 size={18} color="#fff" /></div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 18, color: "#0f172a" }}>New Post</span>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 9, border: "1px solid #e2e8f0", background: "#f8fafc", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={14} color="#64748b" /></button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Post ka title..." style={{ padding: "12px 16px", borderRadius: 12, border: "1.5px solid #e2e8f0", fontSize: 15, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, outline: "none", color: "#0f172a", background: "#fafbff" }} />
          <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Apna knowledge share karo... (Hinglish allowed 😄)" rows={4} style={{ padding: "12px 16px", borderRadius: 12, border: "1.5px solid #e2e8f0", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none", color: "#334155", background: "#fafbff", resize: "vertical", lineHeight: 1.7 }} />
          <div style={{ display: "flex", gap: 10 }}>
            <select value={tag} onChange={e => setTag(e.target.value)} style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 13, color: "#334155", background: "#fafbff", cursor: "pointer", outline: "none" }}>
              {["React", "TypeScript", "PostgreSQL", "Docker", "DevOps", "Python", "Go", "Next.js"].map(t => <option key={t}>{t}</option>)}
            </select>
            <button onClick={() => setShowCode(!showCode)} style={{ padding: "10px 16px", borderRadius: 10, border: `1.5px solid ${showCode ? "#6366f1" : "#e2e8f0"}`, background: showCode ? "#eef2ff" : "#f8fafc", color: showCode ? "#4f46e5" : "#64748b", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
              <Terminal size={14} /> {showCode ? "Remove Code" : "Add Code"}
            </button>
          </div>
          {showCode && (
            <div style={{ border: "1.5px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", background: "#f8faff", borderBottom: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: 11, color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace" }}>Lang:</span>
                {["tsx", "ts", "sql", "py", "go", "dockerfile"].map(l => (
                  <button key={l} onClick={() => setLang(l)} style={{ padding: "2px 10px", borderRadius: 6, border: `1px solid ${lang === l ? "#6366f1" : "#e2e8f0"}`, background: lang === l ? "#eef2ff" : "transparent", color: lang === l ? "#4f46e5" : "#64748b", cursor: "pointer", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{l}</button>
                ))}
              </div>
              <textarea value={code} onChange={e => setCode(e.target.value)} placeholder="// apna code yahan paste karo..." rows={6} style={{ width: "100%", padding: "14px 16px", border: "none", fontSize: 13, fontFamily: "'JetBrains Mono', monospace", outline: "none", color: "#334155", background: "#fafbff", resize: "vertical", lineHeight: 1.7 }} />
            </div>
          )}
          <button onClick={submit} disabled={!title.trim() || !body.trim()} style={{ padding: "13px", borderRadius: 12, background: title && body ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "#f1f5f9", color: title && body ? "#fff" : "#94a3b8", border: "none", cursor: title && body ? "pointer" : "not-allowed", fontSize: 15, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", boxShadow: title && body ? "0 4px 20px rgba(99,102,241,0.3)" : "none" }}>
            Publish Post 🚀
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
      <article style={{ background: "#fff", border: "1px solid #e8edf5", borderRadius: 20, overflow: "hidden", transition: "box-shadow 0.2s", boxShadow: "0 2px 8px rgba(99,102,241,0.05)" }}
        onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 32px rgba(99,102,241,0.1)")}
        onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 2px 8px rgba(99,102,241,0.05)")}>

        <div style={{ padding: "20px 24px 0" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar initials={post.initials} color={post.color} />
              <div>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: "#0f172a", marginBottom: 1 }}>{post.author}</p>
                <p style={{ fontSize: 12, color: "#94a3b8" }}>{post.role} · {post.time}</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#f8faff", border: "1px solid #e2e8f0", borderRadius: 20, padding: "4px 10px" }}>
                <Eye size={12} color="#94a3b8" />
                <span style={{ fontSize: 11, color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace" }}>{post.views.toLocaleString()}</span>
              </div>
              <button onClick={() => setShowMenu(!showMenu)} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #e2e8f0", background: "#f8fafc", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MoreHorizontal size={14} color="#94a3b8" />
              </button>
              {showMenu && (
                <div style={{ position: "absolute", top: 38, right: 0, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.08)", zIndex: 10, minWidth: 160, overflow: "hidden" }}>
                  {[
                    { icon: Flag, label: "Report Post", color: "#ef4444", action: () => { setShowReport(true); setShowMenu(false); } },
                    { icon: Bookmark, label: post.bookmarked ? "Saved" : "Save Post", color: "#475569", action: () => { onBookmark(post.id); setShowMenu(false); } },
                    { icon: Share2, label: "Share", color: "#475569", action: () => setShowMenu(false) },
                  ].map(item => (
                    <button key={item.label} onClick={item.action} style={{ width: "100%", padding: "10px 16px", border: "none", background: "none", cursor: "pointer", fontSize: 13, color: item.color, textAlign: "left", display: "flex", alignItems: "center", gap: 8, fontFamily: "'DM Sans', sans-serif" }}>
                      <item.icon size={13} /> {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17, color: "#0f172a", margin: "14px 0 10px", lineHeight: 1.4 }}>{post.title}</h2>
          <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.75, fontFamily: "'DM Sans', sans-serif" }}>{post.body}</p>
          {post.code && <CodeBlock code={post.code} lang={post.lang || "tsx"} />}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 16 }}>
            {post.tags.map(t => <span key={t} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.15)", color: "#4f46e5", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>#{t}</span>)}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "14px 20px", borderTop: "1px solid #f1f5f9", marginTop: 16 }}>
          <button onClick={() => onLike(post.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10, border: `1.5px solid ${post.liked ? "#fecdd3" : "#f1f5f9"}`, background: post.liked ? "#fff1f2" : "#f8fafc", color: post.liked ? "#e11d48" : "#64748b", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", transition: "all 0.18s" }}>
            <Heart size={15} fill={post.liked ? "#e11d48" : "none"} color={post.liked ? "#e11d48" : "#64748b"} /> {post.likes}
          </button>
          <button onClick={() => setShowComments(!showComments)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10, border: "1.5px solid #f1f5f9", background: showComments ? "#eef2ff" : "#f8fafc", color: showComments ? "#4f46e5" : "#64748b", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", transition: "all 0.18s" }}>
            <MessageSquare size={15} /> {post.comments.length} {showComments ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
          <button onClick={() => onBookmark(post.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 10, border: `1.5px solid ${post.bookmarked ? "#c7d2fe" : "#f1f5f9"}`, background: post.bookmarked ? "#eef2ff" : "#f8fafc", color: post.bookmarked ? "#4f46e5" : "#64748b", cursor: "pointer", transition: "all 0.18s" }}>
            <Bookmark size={15} fill={post.bookmarked ? "#4f46e5" : "none"} color={post.bookmarked ? "#4f46e5" : "#64748b"} />
          </button>
          {post.reported && <span style={{ marginLeft: "auto", fontSize: 11, color: "#ef4444", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 20, padding: "3px 10px", fontFamily: "'JetBrains Mono', monospace" }}>Reported</span>}
        </div>

        {showComments && (
          <div style={{ padding: "0 20px 20px", borderTop: "1px solid #f1f5f9" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16, paddingTop: 16 }}>
              {post.comments.length === 0 && <p style={{ fontSize: 13, color: "#94a3b8", textAlign: "center", padding: "20px 0" }}>Pehla comment karo! 👇</p>}
              {post.comments.map(c => (
                <div key={c.id} style={{ display: "flex", gap: 10 }}>
                  <Avatar initials={c.initials} color={c.color} size={32} />
                  <div style={{ flex: 1, background: "#f8faff", borderRadius: 12, padding: "10px 14px", border: "1px solid #e8edf5" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", fontFamily: "'Space Grotesk', sans-serif" }}>{c.author}</span>
                      <span style={{ fontSize: 11, color: "#94a3b8" }}>{c.time}</span>
                    </div>
                    <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>{c.text}</p>
                    <button onClick={() => onLikeComment(post.id, c.id)} style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", fontSize: 11, color: c.liked ? "#e11d48" : "#94a3b8", padding: 0 }}>
                      <ThumbsUp size={11} fill={c.liked ? "#e11d48" : "none"} /> {c.likes}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Avatar initials="YU" color="#6366f1" size={32} />
              <div style={{ flex: 1, display: "flex", gap: 8 }}>
                <input value={commentText} onChange={e => setCommentText(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && commentText.trim()) { onAddComment(post.id, commentText.trim()); setCommentText(""); } }}
                  placeholder="Comment likho... (Enter to post)" style={{ flex: 1, padding: "9px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 13, fontFamily: "'DM Sans', sans-serif", outline: "none", color: "#0f172a", background: "#fafbff" }} />
                <button onClick={() => { if (commentText.trim()) { onAddComment(post.id, commentText.trim()); setCommentText(""); } }} disabled={!commentText.trim()}
                  style={{ width: 36, height: 36, borderRadius: 10, background: commentText.trim() ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "#f1f5f9", border: "none", cursor: commentText.trim() ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Send size={14} color={commentText.trim() ? "#fff" : "#94a3b8"} />
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
    const colors = ["#6366f1", "#ec4899", "#10b981", "#f59e0b", "#3b82f6"];
    const c: Comment = { id: Date.now(), author: "You", initials: "YU", color: colors[Math.floor(Math.random() * colors.length)], text, time: "Just now", likes: 0, liked: false };
    setPosts(p => p.map(post => post.id === postId ? { ...post, comments: [...post.comments, c] } : post));
  };
  const handleLikeComment = (postId: number, commentId: number) =>
    setPosts(p => p.map(post => post.id === postId ? { ...post, comments: post.comments.map(c => c.id === commentId ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 } : c) } : post));
  const handleNewPost = (data: Partial<Post>) => {
    const np: Post = { id: Date.now(), author: "You", initials: "YU", color: "#6366f1", role: "Developer", time: "Just now", title: data.title!, body: data.body!, code: data.code, lang: data.lang || "tsx", tags: data.tags || ["General"], likes: 0, liked: false, bookmarked: false, views: 1, comments: [], reported: false };
    setPosts(p => [np, ...p]);
  };

  const filtered = posts
    .filter(p => (activeTag === "All" || p.tags.includes(activeTag)) && (!search || p.title.toLowerCase().includes(search.toLowerCase()) || p.body.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => activeFilter === "Top" ? b.likes - a.likes : activeFilter === "Latest" ? b.id - a.id : (b.likes + b.views * 0.01) - (a.likes + a.views * 0.01));

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'DM Sans', sans-serif; background: #f4f6fb; color: #1e1e2e; }
    ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-thumb { background: #c7d2fe; border-radius: 99px; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
    .post-enter { animation: fadeUp 0.4s cubic-bezier(0.34,1.56,0.64,1) both; }
  `;

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6fb" }}>
      <style>{css}</style>
      {showCompose && <ComposeModal onClose={() => setShowCompose(false)} onPost={handleNewPost} />}

      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid #e8edf5", boxShadow: "0 1px 12px rgba(99,102,241,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: 16, height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}><Code2 size={18} color="#fff" strokeWidth={2.5} /></div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 18, color: "#0f172a" }}>Jobbr - CodingHub</span>
          </div>
          <div style={{ flex: 1, position: "relative", maxWidth: 400 }}>
            <Search size={14} color="#94a3b8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Posts, topics search karo..." style={{ width: "100%", padding: "9px 12px 9px 36px", borderRadius: 12, border: "1.5px solid #e2e8f0", fontSize: 13, background: "#fafbff", color: "#0f172a", outline: "none", fontFamily: "'DM Sans', sans-serif" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
            <button style={{ display: "flex", alignItems: "center", padding: "8px 12px", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "#f8fafc", cursor: "pointer", color: "#64748b" }}><Bookmark size={15} /></button>
            <button onClick={() => setShowCompose(true)} style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 12, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", boxShadow: "0 4px 16px rgba(99,102,241,0.3)" }}>
              <Plus size={16} /> Write Post
            </button>
            <Avatar initials="YU" color="#6366f1" size={36} />
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px", display: "grid", gridTemplateColumns: "1fr 280px", gap: 24, alignItems: "start" }}>
        <main>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            {FILTERS.map(f => (
              <button key={f.label} onClick={() => setActiveFilter(f.label)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 16px", borderRadius: 10, border: `1.5px solid ${activeFilter === f.label ? "#6366f1" : "#e2e8f0"}`, background: activeFilter === f.label ? "#eef2ff" : "#fff", color: activeFilter === f.label ? "#4f46e5" : "#64748b", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", transition: "all 0.18s" }}>
                <f.icon size={14} /> {f.label}
              </button>
            ))}
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              {TAGS.map(t => (
                <button key={t} onClick={() => setActiveTag(t)} style={{ padding: "5px 12px", borderRadius: 20, border: `1.5px solid ${activeTag === t ? "#6366f1" : "#e2e8f0"}`, background: activeTag === t ? "#eef2ff" : "#f8fafc", color: activeTag === t ? "#4f46e5" : "#64748b", cursor: "pointer", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, transition: "all 0.18s" }}>
                  {t === "All" ? "All" : `#${t}`}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {filtered.length === 0
              ? <div style={{ textAlign: "center", padding: "60px 20px", background: "#fff", borderRadius: 20, border: "1px solid #e8edf5" }}>
                  <Code2 size={40} color="#c7d2fe" style={{ marginBottom: 12 }} />
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: "#0f172a", marginBottom: 6 }}>Koi post nahi mila</p>
                  <p style={{ fontSize: 13, color: "#94a3b8" }}>Filter change karo ya pehla post likho!</p>
                </div>
              : filtered.map((post, i) => (
                  <div key={post.id} className="post-enter" style={{ animationDelay: `${i * 0.06}s` }}>
                    <PostCard post={post} onLike={handleLike} onBookmark={handleBookmark} onReport={handleReport} onAddComment={handleAddComment} onLikeComment={handleLikeComment} />
                  </div>
                ))
            }
          </div>
        </main>

        <aside style={{ display: "flex", flexDirection: "column", gap: 16, position: "sticky", top: 88 }}>
          <div style={{ background: "#fff", border: "1px solid #e8edf5", borderRadius: 20, padding: "20px", boxShadow: "0 2px 8px rgba(99,102,241,0.04)" }}>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: "#0f172a", marginBottom: 14 }}>Community Stats</p>
            {[
              { icon: Layers, label: "Total Posts", val: posts.length, color: "#6366f1" },
              { icon: Heart, label: "Total Likes", val: posts.reduce((s, p) => s + p.likes, 0), color: "#e11d48" },
              { icon: MessageSquare, label: "Comments", val: posts.reduce((s, p) => s + p.comments.length, 0), color: "#10b981" },
              { icon: Eye, label: "Total Views", val: posts.reduce((s, p) => s + p.views, 0).toLocaleString(), color: "#f59e0b" },
            ].map(s => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f8faff" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: `${s.color}12`, border: `1px solid ${s.color}20`, display: "flex", alignItems: "center", justifyContent: "center" }}><s.icon size={13} color={s.color} /></div>
                  <span style={{ fontSize: 13, color: "#64748b" }}>{s.label}</span>
                </div>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: "#0f172a" }}>{s.val}</span>
              </div>
            ))}
          </div>

          <div style={{ background: "#fff", border: "1px solid #e8edf5", borderRadius: 20, padding: "20px", boxShadow: "0 2px 8px rgba(99,102,241,0.04)" }}>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: "#0f172a", marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
              <TrendingUp size={14} color="#6366f1" /> Trending Topics
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[{ tag: "React", posts: "2.4k", color: "#61dafb" }, { tag: "TypeScript", posts: "1.8k", color: "#3178c6" }, { tag: "Docker", posts: "1.2k", color: "#2496ed" }, { tag: "PostgreSQL", posts: "920", color: "#f59e0b" }, { tag: "DevOps", posts: "740", color: "#10b981" }].map(t => (
                <button key={t.tag} onClick={() => setActiveTag(t.tag)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: 10, border: "1px solid #f1f5f9", background: "#fafbff", cursor: "pointer" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#eef2ff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#fafbff"; }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: t.color }} />
                    <span style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace", color: "#334155", fontWeight: 600 }}>#{t.tag}</span>
                  </div>
                  <span style={{ fontSize: 11, color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace" }}>{t.posts}</span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: "linear-gradient(135deg,#eef2ff,#f5f3ff)", border: "1px solid #c7d2fe", borderRadius: 20, padding: "20px", textAlign: "center" }}>
            <Zap size={28} color="#6366f1" style={{ marginBottom: 10 }} />
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: "#0f172a", marginBottom: 6 }}>Share Your Knowledge</p>
            <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6, marginBottom: 14 }}>Code tips, bugs, learnings — community wait kar rahi hai!</p>
            <button onClick={() => setShowCompose(true)} style={{ width: "100%", padding: "10px", borderRadius: 12, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
              Post Likho ✍️
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}