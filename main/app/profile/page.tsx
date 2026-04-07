'use client'

import React, { useState } from 'react'
import {
  Pencil, Trash2, Save, X, Mail, Phone, Briefcase,
  Code2, User, MapPin, Check, ChevronDown
} from 'lucide-react'

const DISPLAY = `'Segoe UI', system-ui, -apple-system, sans-serif`
const MONO = `'Courier New', Courier, monospace`

// ── Avatar options ──────────────────────────────────────────────
const AVATARS = [
  { id: 'm1', gender: 'male',   emoji: '👨‍💻', label: 'Dev Bro' },
  { id: 'm2', gender: 'male',   emoji: '🧑‍🎓', label: 'Student' },
  { id: 'm3', gender: 'male',   emoji: '👨‍🔬', label: 'Researcher' },
  { id: 'm4', gender: 'male',   emoji: '🧔',   label: 'Senior' },
  { id: 'f1', gender: 'female', emoji: '👩‍💻', label: 'Dev Sis' },
  { id: 'f2', gender: 'female', emoji: '👩‍🎓', label: 'Scholar' },
  { id: 'f3', gender: 'female', emoji: '👩‍🔬', label: 'Analyst' },
  { id: 'f4', gender: 'female', emoji: '🧕',   label: 'Pro' },
]

const EXPERIENCE_OPTIONS = ['Fresher', 'Junior (1-2 yrs)', 'Mid-Level (3-5 yrs)', 'Senior (5-8 yrs)', 'Expert (8+ yrs)']

// ── Mock — replace with useSession / your auth hook ─────────────
const MOCK_EMAIL = 'rahul.dev@example.com'

interface ProfileData {
  name: string
  email: string
  phone: string
  location: string
  experience: string
  bio: string
  skills: string[]
  avatarId: string
}

const EMPTY_PROFILE: ProfileData = {
  name: '',
  email: MOCK_EMAIL,
  phone: '',
  location: '',
  experience: '',
  bio: '',
  skills: [],
  avatarId: 'm1',
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>(EMPTY_PROFILE)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState<ProfileData>(EMPTY_PROFILE)
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)
  const [skillInput, setSkillInput] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [saved, setSaved] = useState(false)

  const currentAvatar = AVATARS.find(a => a.id === (editing ? draft.avatarId : profile.avatarId)) ?? AVATARS[0]

  // ── Actions ──────────────────────────────────────────────────
  const startEdit = () => { setDraft({ ...profile }); setEditing(true) }

  const cancelEdit = () => { setEditing(false); setShowAvatarPicker(false) }

  const saveEdit = () => {
    setProfile({ ...draft })
    setEditing(false)
    setShowAvatarPicker(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const deleteProfile = () => {
    setProfile(EMPTY_PROFILE)
    setShowDeleteConfirm(false)
    setEditing(false)
  }

  const addSkill = () => {
    const s = skillInput.trim()
    if (s && !draft.skills.includes(s)) {
      setDraft(d => ({ ...d, skills: [...d.skills, s] }))
    }
    setSkillInput('')
  }

  const removeSkill = (skill: string) =>
    setDraft(d => ({ ...d, skills: d.skills.filter(s => s !== skill) }))

  const field = (key: keyof ProfileData, val: string) =>
    setDraft(d => ({ ...d, [key]: val }))

  // ── Styles ───────────────────────────────────────────────────
  const card: React.CSSProperties = {
    background: 'rgba(255,255,255,0.028)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px',
    padding: '24px',
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '10px',
    padding: '10px 14px',
    color: '#e2e8f0',
    fontSize: '14px',
    fontFamily: DISPLAY,
    outline: 'none',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: MONO,
    fontSize: '10px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#6b7280',
    marginBottom: '6px',
    display: 'block',
  }

  return (
    <main style={{ minHeight: '100vh', background: '#080810', color: '#e8e8f0', fontFamily: DISPLAY, position: 'relative', overflow: 'hidden' }}>
      {/* bg grid */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, backgroundImage: `linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)`, backgroundSize: '48px 48px' }} />
      {/* glow top */}
      <div style={{ position: 'fixed', top: '-15%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(99,102,241,0.14) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />
      {/* glow bottom right */}
      <div style={{ position: 'fixed', bottom: '-10%', right: '-5%', width: '400px', height: '300px', background: 'radial-gradient(ellipse, rgba(236,72,153,0.08) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '860px', margin: '0 auto', padding: '56px 24px 80px' }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <p style={{ fontFamily: MONO, fontSize: '11px', color: '#6366f1', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px' }}>✦ My Profile</p>
            <h1 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>
              {profile.name || <span style={{ color: '#374151' }}>Unnamed User</span>}
            </h1>
          </div>

          {/* Action buttons */}
          {!editing ? (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={startEdit} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: DISPLAY }}>
                <Pencil size={15} /> Edit Profile
              </button>
              <button onClick={() => setShowDeleteConfirm(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171', fontSize: '14px', cursor: 'pointer', fontFamily: DISPLAY }}>
                <Trash2 size={15} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={saveEdit} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '10px', background: 'linear-gradient(135deg, #059669, #34d399)', border: 'none', color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: DISPLAY }}>
                <Save size={15} /> Save
              </button>
              <button onClick={cancelEdit} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#9ca3af', fontSize: '14px', cursor: 'pointer', fontFamily: DISPLAY }}>
                <X size={15} />
              </button>
            </div>
          )}
        </div>

        {/* ── Saved toast ── */}
        {saved && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 20px', borderRadius: '12px', background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.25)', marginBottom: '24px' }}>
            <Check size={16} color="#34d399" />
            <span style={{ color: '#34d399', fontSize: '14px' }}>Profile saved successfully!</span>
          </div>
        )}

        {/* ── Avatar + Basic Info row ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '20px', marginBottom: '20px' }}>

          {/* Avatar card */}
          <div style={{ ...card, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', position: 'relative' }}>
            <div style={{ fontSize: '72px', lineHeight: 1 }}>{currentAvatar.emoji}</div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontWeight: 700, fontSize: '13px', marginBottom: '2px' }}>{currentAvatar.label}</p>
              <p style={{ fontFamily: MONO, fontSize: '10px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {currentAvatar.gender}
              </p>
            </div>

            {editing && (
              <button onClick={() => setShowAvatarPicker(v => !v)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc', fontSize: '12px', cursor: 'pointer', fontFamily: DISPLAY }}>
                Change <ChevronDown size={13} />
              </button>
            )}

            {/* Avatar picker dropdown */}
            {showAvatarPicker && editing && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10, marginTop: '8px', background: '#0f0f1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {AVATARS.map(av => (
                  <button key={av.id} onClick={() => { field('avatarId', av.id); setShowAvatarPicker(false) }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '10px 6px', borderRadius: '10px', border: `1px solid ${draft.avatarId === av.id ? 'rgba(99,102,241,0.6)' : 'rgba(255,255,255,0.07)'}`, background: draft.avatarId === av.id ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)', cursor: 'pointer' }}>
                    <span style={{ fontSize: '28px' }}>{av.emoji}</span>
                    <span style={{ fontSize: '10px', color: '#9ca3af', fontFamily: MONO }}>{av.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Basic info */}
          <div style={{ ...card, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Name */}
            <div>
              <label style={labelStyle}><User size={10} style={{ display: 'inline', marginRight: '4px' }} />Full Name</label>
              {editing
                ? <input style={inputStyle} placeholder="Enter your name" value={draft.name} onChange={e => field('name', e.target.value)} />
                : <p style={{ fontSize: '16px', fontWeight: 600, color: profile.name ? '#e2e8f0' : '#374151' }}>{profile.name || '—'}</p>
              }
            </div>
            {/* Email — read only */}
            <div>
              <label style={labelStyle}><Mail size={10} style={{ display: 'inline', marginRight: '4px' }} />Email</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <p style={{ fontSize: '14px', color: '#818cf8' }}>{profile.email}</p>
                <span style={{ fontFamily: MONO, fontSize: '9px', padding: '2px 8px', borderRadius: '999px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', color: '#6366f1' }}>from login</span>
              </div>
            </div>
            {/* Phone */}
            <div>
              <label style={labelStyle}><Phone size={10} style={{ display: 'inline', marginRight: '4px' }} />Contact</label>
              {editing
                ? <input style={inputStyle} placeholder="+91 XXXXX XXXXX" value={draft.phone} onChange={e => field('phone', e.target.value)} />
                : <p style={{ fontSize: '14px', color: profile.phone ? '#e2e8f0' : '#374151' }}>{profile.phone || '—'}</p>
              }
            </div>
            {/* Location */}
            <div>
              <label style={labelStyle}><MapPin size={10} style={{ display: 'inline', marginRight: '4px' }} />Location</label>
              {editing
                ? <input style={inputStyle} placeholder="City, Country" value={draft.location} onChange={e => field('location', e.target.value)} />
                : <p style={{ fontSize: '14px', color: profile.location ? '#e2e8f0' : '#374151' }}>{profile.location || '—'}</p>
              }
            </div>
          </div>
        </div>

        {/* ── Experience + Bio row ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          {/* Experience */}
          <div style={card}>
            <label style={labelStyle}><Briefcase size={10} style={{ display: 'inline', marginRight: '4px' }} />Experience Level</label>
            {editing ? (
              <select value={draft.experience} onChange={e => field('experience', e.target.value)} style={{ ...inputStyle, appearance: 'none' }}>
                <option value="">Select level...</option>
                {EXPERIENCE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <div style={{ marginTop: '8px' }}>
                {profile.experience
                  ? <span style={{ padding: '6px 16px', borderRadius: '999px', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc', fontSize: '14px', fontWeight: 600 }}>{profile.experience}</span>
                  : <p style={{ color: '#374151', fontSize: '14px' }}>—</p>
                }
              </div>
            )}
          </div>

          {/* Bio */}
          <div style={card}>
            <label style={labelStyle}><User size={10} style={{ display: 'inline', marginRight: '4px' }} />Bio</label>
            {editing
              ? <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }} placeholder="Tell something about yourself..." value={draft.bio} onChange={e => field('bio', e.target.value)} />
              : <p style={{ fontSize: '14px', color: profile.bio ? '#cbd5e1' : '#374151', lineHeight: 1.6 }}>{profile.bio || '—'}</p>
            }
          </div>
        </div>

        {/* ── Skills ── */}
        <div style={{ ...card, marginBottom: '20px' }}>
          <label style={labelStyle}><Code2 size={10} style={{ display: 'inline', marginRight: '4px' }} />Skills</label>

          {editing && (
            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
              <input
                style={{ ...inputStyle, flex: 1 }}
                placeholder="Add a skill (e.g. React, Python...)"
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addSkill()}
              />
              <button onClick={addSkill} style={{ padding: '10px 18px', borderRadius: '10px', background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.35)', color: '#a5b4fc', fontSize: '13px', cursor: 'pointer', fontFamily: DISPLAY, fontWeight: 600, whiteSpace: 'nowrap' }}>
                + Add
              </button>
            </div>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {(editing ? draft.skills : profile.skills).length === 0
              ? <p style={{ color: '#374151', fontSize: '14px' }}>No skills added yet</p>
              : (editing ? draft.skills : profile.skills).map(skill => (
                <span key={skill} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', borderRadius: '8px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', color: '#a5b4fc', fontSize: '13px', fontFamily: MONO }}>
                  {skill}
                  {editing && (
                    <button onClick={() => removeSkill(skill)} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
                      <X size={12} />
                    </button>
                  )}
                </span>
              ))
            }
          </div>
        </div>

        {/* ── Delete confirm modal ── */}
        {showDeleteConfirm && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#0f0f1a', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '20px', padding: '36px', maxWidth: '400px', width: '90%', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '10px' }}>Delete Profile?</h2>
              <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.6, marginBottom: '28px' }}>This will clear all your profile data. This action cannot be undone.</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button onClick={deleteProfile} style={{ padding: '10px 28px', borderRadius: '10px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', color: '#f87171', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: DISPLAY }}>
                  Yes, Delete
                </button>
                <button onClick={() => setShowDeleteConfirm(false)} style={{ padding: '10px 28px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#9ca3af', fontSize: '14px', cursor: 'pointer', fontFamily: DISPLAY }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}