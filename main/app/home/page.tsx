/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Bell,
  FileText,
  Brain,
  User,
  Code2,
  Bot,
  Settings,
  LogOut,
  LayoutDashboard,
  Target,
  Send,
  X,
  Menu,
  ChevronRight,
  Zap,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Brain, label: 'Roadmaps', href: '/job-rec' },
  { icon: Bell, label: 'Alerts', href: '/job-alert' },
  { icon: FileText, label: 'Create Resume', href: '/resume-builder' },
  { icon: Zap, label: 'AI Analyser', href: '/resume-ai' },
  { icon: Code2, label: 'Coding Hub', href: '/coding-hub' },
  { icon: Bot, label: 'AI Assistant', href: '/chatbot' },
  { icon: User, label: 'Profile', href: '/profile' },
];

const features = [
  {
    icon: Brain,
    title: 'Roadmap to get a Job',
    desc: 'Get personalized roadmap matches based on your profile',
    color: '#60A5FA',
    bg: '#1E2D45',
    accent: '#3B82F6',
  },
  {
    icon: FileText,
    title: 'Resume Builder',
    desc: 'Create and optimize your resume with AI help',
    color: '#A78BFA',
    bg: '#271D45',
    accent: '#8B5CF6',
  },
  {
    icon: Zap,
    title: 'AI Resume Analyser',
    desc: 'Get detailed feedback to improve your resume',
    color: '#FBB96A',
    bg: '#2D2210',
    accent: '#F59E0B',
  },
  {
    icon: Code2,
    title: 'Coding Hub',
    desc: 'Practice DSA problems and track your progress',
    color: '#4ADE80',
    bg: '#152D1E',
    accent: '#22C55E',
  },
];

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
}

export default function JobbrHome() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAIChat, setShowAIChat] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi  👋 I'm your AI Career Coach. Ask me anything about your job search, resume, interviews, or coding!",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [activeNav, setActiveNav] = useState(0);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
    };

    setMessages([...messages, newUserMessage]);
    setInputValue('');

    setTimeout(() => {
      const responses = [
        "That's a great question! Let me help you with that.",
        "Based on your profile, I'd recommend focusing on system design for SDE roles.",
        'Your resume looks good, but adding more projects could help boost your match rate.',
        'Keep practicing DSA! Consistency is key to cracking interviews.',
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: randomResponse,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    }, 500);
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#0D0E14',
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        color: '#E2E4EF',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2E3047; border-radius: 4px; }

        .nav-item {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 14px; border-radius: 10px;
          cursor: pointer; text-decoration: none; color: #6B7280;
          font-size: 0.875rem; font-weight: 500;
          transition: all 0.18s; white-space: nowrap;
        }
        .nav-item:hover { background: #1A1C28; color: #E2E4EF; }
        .nav-item.active { background: #E2E4EF; color: #0D0E14; }

        .feature-card {
          background: #141520;
          border: 1px solid #1F2235;
          border-radius: 16px; padding: 24px;
          transition: all 0.3s; cursor: pointer;
          text-decoration: none; display: flex; flex-direction: column;
          gap: 12px;
        }
        .feature-card:hover {
          border-color: #3B3F5C;
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.4);
        }

        .ai-chat-popup {
          position: fixed; bottom: 20px; right: 20px;
          width: 380px; max-height: 600px;
          background: #141520;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          display: flex; flex-direction: column;
          z-index: 1000;
          border: 1px solid #1F2235;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .ai-chat-header {
          padding: 16px 18px;
          border-bottom: 1px solid #1F2235;
          display: flex; align-items: center; justify-content: space-between;
          background: #1A1C2E;
          border-radius: 16px 16px 0 0;
        }

        .chat-messages {
          flex: 1; overflow-y: auto; padding: 16px 18px;
          display: flex; flex-direction: column; gap: 12px;
        }

        .chat-message {
          display: flex; gap: 8px; animation: fadeIn 0.3s ease;
        }

        .chat-message.user { justify-content: flex-end; }

        .message-content {
          max-width: 70%; padding: 10px 12px; border-radius: 10px;
          font-size: 0.875rem; line-height: 1.5;
        }

        .message-content.assistant { background: #1F2235; color: #E2E4EF; }
        .message-content.user { background: #E2E4EF; color: #0D0E14; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .chat-input-box {
          display: flex; gap: 8px; padding: 14px 18px;
          border-top: 1px solid #1F2235;
        }

        .chat-input {
          flex: 1; padding: 10px 12px; border-radius: 8px;
          border: 1px solid #2A2D3E;
          background: #0D0E14;
          font-family: inherit;
          font-size: 0.875rem; color: #E2E4EF;
          transition: border-color 0.2s;
        }

        .chat-input::placeholder { color: #4B5163; }

        .chat-input:focus {
          outline: none; border-color: #4B4F6E;
        }

        .chat-send-btn {
          width: 36px; height: 36px;
          background: #E2E4EF;
          color: #0D0E14;
          border: none; border-radius: 8px;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; transition: all 0.2s;
        }

        .chat-send-btn:hover { background: #C8CADB; }

        .ai-fab {
          width: 56px; height: 56px;
          background: linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%);
          border: none; border-radius: 50%;
          color: #FFFFFF; font-size: 24px;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(139,92,246,0.35);
          transition: all 0.3s; z-index: 999;
        }

        .ai-fab:hover { transform: scale(1.1); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-up { animation: fadeUp 0.5s ease both; }
        .fade-up-1 { animation: fadeUp 0.5s 0.1s ease both; }
        .fade-up-2 { animation: fadeUp 0.5s 0.2s ease both; }

        .header-btn {
          width: 40px; height: 40px;
          background: #141520;
          border: 1px solid #1F2235;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #9CA3AF;
          transition: all 0.2s;
          text-decoration: none;
        }
        .header-btn:hover {
          border-color: #3B3F5C;
          color: #E2E4EF;
          background: #1A1C28;
        }

        @media (max-width: 768px) {
          .sidebar { display: none; }
          .main-content { margin-left: 0 !important; padding: 16px !important; }
          .ai-chat-popup { width: calc(100vw - 32px); max-width: none; }
          .mobile-menu-btn { display: block !important; }
        }

        @media (min-width: 768px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>

      {/* Sidebar */}
      <aside
        style={{
          width: sidebarOpen ? 240 : 0,
          background: '#0F1018',
          borderRight: '1px solid #1A1C28',
          display: 'flex',
          flexDirection: 'column',
          padding: sidebarOpen ? '20px 14px' : 0,
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 100,
          overflowY: 'auto',
          overflowX: 'hidden',
          transition: 'all 0.3s ease',
        }}
      >
        {sidebarOpen && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 10px 24px' }}>
            <div
              style={{
                width: 32,
                height: 32,
                background: '#E2E4EF',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Briefcase size={16} color="#0D0E14" />
            </div>
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: '1.15rem',
                color: '#E2E4EF',
                letterSpacing: '-0.02em',
              }}
            >
              Jobbr
            </span>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
          {navItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`nav-item${activeNav === i ? ' active' : ''}`}
                onClick={() => setActiveNav(i)}
                title={!sidebarOpen ? item.label : ''}
              >
                <Icon size={16} />
                {sidebarOpen && <span>{item.label}</span>}
              </a>
            );
          })}
        </div>

        {sidebarOpen && (
          <div style={{ borderTop: '1px solid #1A1C28', paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <a href="#" className="nav-item">
              <Settings size={16} /> Settings
            </a>
            <a href="#" className="nav-item">
              <LogOut size={16} /> Logout
            </a>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main
        className="main-content"
        style={{
          marginLeft: sidebarOpen ? 240 : 0,
          flex: 1,
          padding: '40px 48px',
          overflowY: 'auto',
          transition: 'margin-left 0.3s ease',
        }}
      >
        {/* Header */}
        <div
          className="fade-up"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 48,
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <p style={{ fontSize: '0.875rem', color: '#4B5163', fontWeight: 500, marginBottom: 6 }}>
              Welcome back 👋
            </p>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: '2rem',
                letterSpacing: '-0.03em',
                color: '#E2E4EF',
              }}
            >
              Hey, ❣️
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mobile-menu-btn header-btn"
              style={{ border: 'none' }}
            >
              <Menu size={18} />
            </button>

            <a
              href="#notifications"
              className="header-btn"
              style={{ position: 'relative' }}
            >
              <Bell size={18} />
              <span
                style={{
                  position: 'absolute',
                  top: 6,
                  right: 6,
                  width: 8,
                  height: 8,
                  background: '#EF4444',
                  borderRadius: '50%',
                  border: '2px solid #0D0E14',
                }}
              />
            </a>

            <div
              style={{
                width: 40,
                height: 40,
                background: '#E2E4EF',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                color: '#0D0E14',
                fontSize: '0.875rem',
                fontFamily: "'Syne', sans-serif",
              }}
            >
              AK
            </div>
          </div>
        </div>

        {/* Greeting & Status */}
        <div
          className="fade-up-1"
          style={{
            background: '#141520',
            border: '1px solid #1F2235',
            borderRadius: 16,
            padding: '24px 28px',
            marginBottom: 40,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <p style={{ color: '#4B5163', fontSize: '0.875rem', marginBottom: 4 }}>You're on track! 🚀</p>
              <p style={{ fontSize: '0.95rem', color: '#C4C7D9', lineHeight: 1.6 }}>
                The person you are{' '}
                <span style={{ fontWeight: 700, color: '#60A5FA' }}>and the person you want</span>
                {' '}is just separated{' '}
                <span style={{ fontWeight: 700, color: '#A78BFA' }}>by</span>{' '}
                Discipline
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: '0.875rem',
                color: '#6B7280',
                whiteSpace: 'nowrap',
              }}
            >
              <Target size={16} color="#F59E0B" /> Keep it up!
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="fade-up-2" style={{ marginBottom: 40 }}>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: '1.1rem',
              color: '#E2E4EF',
              marginBottom: 16,
            }}
          >
            Quick Access
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 16,
            }}
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <a
                  key={feature.title}
                  href="#"
                  className="feature-card"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Navigate to ${feature.title}`);
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      background: feature.bg,
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={20} color={feature.color} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        color: '#E2E4EF',
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#6B7280', lineHeight: 1.4 }}>
                      {feature.desc}
                    </p>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      color: feature.accent,
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      marginTop: 'auto',
                    }}
                  >
                    Explore <ChevronRight size={14} />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </main>

      {/* AI Chat Popup */}
      {showAIChat && (
        <div className="ai-chat-popup">
          <div className="ai-chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Bot size={18} color="#F9A8D4" />
              <div>
                <div
                  style={{
                    color: '#E2E4EF',
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: '0.9rem',
                  }}
                >
                  AI Career Coach
                </div>
                <div style={{ fontSize: '0.7rem', color: '#4B5163' }}>Always here to help</div>
              </div>
            </div>
            <button
              onClick={() => setShowAIChat(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#6B7280',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={18} />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.type}`}>
                <div className={`message-content ${msg.type}`}>{msg.content}</div>
              </div>
            ))}
          </div>

          <div className="chat-input-box">
            <input
              type="text"
              className="chat-input"
              placeholder="Ask me anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <button className="chat-send-btn" onClick={handleSendMessage}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* AI Assistant FAB */}
      {!showAIChat && (
        <button
          className="ai-fab"
          onClick={() => setShowAIChat(true)}
          style={{ position: 'fixed', bottom: 24, right: 24 }}
          title="Open AI Assistant"
        >
          <Bot size={24} />
        </button>
      )}
    </div>
  );
}