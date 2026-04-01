/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useRef } from 'react'
import {
  User, Mail, Phone, MapPin, Globe, Linkedin, Github,
  Plus, Trash2, Download, Eye, EyeOff,
  Briefcase, GraduationCap, Code2, Award, ChevronDown,
  ChevronUp, FileText, Sparkles, Check, ArrowLeft,
  BookOpen, Zap, Edit2
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface PersonalInfo {
  name: string; title: string; email: string; phone: string
  location: string; website: string; linkedin: string; github: string; twitter: string; summary: string
}

interface WorkExperience {
  id: string; company: string; role: string; startDate: string; endDate: string; current: boolean; description: string
}

interface Education {
  id: string; institution: string; degree: string; field: string; startDate: string; endDate: string; gpa: string
}

interface Project {
  id: string; name: string; description: string; tech: string; link: string
}

interface Skill {
  id: string; category: string; items: string
}

interface Certificate {
  id: string; name: string; issuer: string; date: string
}

interface Language {
  id: string; name: string; proficiency: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const uid = () => Math.random().toString(36).slice(2, 9)
const emptyWork = (): WorkExperience => ({ id: uid(), company: '', role: '', startDate: '', endDate: '', current: false, description: '' })
const emptyEdu = (): Education => ({ id: uid(), institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' })
const emptyProject = (): Project => ({ id: uid(), name: '', description: '', tech: '', link: '' })
const emptySkill = (): Skill => ({ id: uid(), category: '', items: '' })
const emptyCert = (): Certificate => ({ id: uid(), name: '', issuer: '', date: '' })
const emptyLanguage = (): Language => ({ id: uid(), name: '', proficiency: '' })

// ─── Input Components ─────────────────────────────────────────────────────────

const Field = ({
  label, value, onChange, placeholder = '', type = 'text', icon: Icon, compact = false
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; icon?: React.ElementType; compact?: boolean
}) => (
  <div className={`flex flex-col ${compact ? 'gap-1' : 'gap-1.5'}`}>
    {!compact && <label className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">{label}</label>}
    <div className="relative">
      {Icon && <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={compact ? label : placeholder}
        className={`w-full bg-zinc-800/40 border border-zinc-700/60 rounded-lg text-sm text-zinc-100 
          placeholder-zinc-600 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/20
          transition-all duration-200 ${Icon ? 'pl-9' : 'px-3'} ${compact ? 'py-2 text-xs' : 'pr-3 py-2.5'}`}
      />
    </div>
  </div>
)

const TextArea = ({
  label, value, onChange, placeholder = '', rows = 3, compact = false
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; rows?: number; compact?: boolean
}) => (
  <div className={`flex flex-col ${compact ? 'gap-1' : 'gap-1.5'}`}>
    {!compact && <label className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">{label}</label>}
    <textarea
      rows={rows}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={compact ? label : placeholder}
      className="w-full bg-zinc-800/40 border border-zinc-700/60 rounded-lg text-sm text-zinc-100 
        placeholder-zinc-600 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/20
        transition-all duration-200 px-3 py-2.5 resize-none"
    />
  </div>
)

// ─── Collapsible Entry Component ──────────────────────────────────────────────

const Entry = ({
  title, onDelete, children, canDelete = true
}: {
  title: string; onDelete: () => void; children: React.ReactNode; canDelete?: boolean
}) => {
  const [open, setOpen] = useState(true)
  return (
    <div className="border border-zinc-700/40 rounded-lg bg-zinc-800/30 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-zinc-800/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <ChevronUp size={16} className={`text-zinc-500 transition-transform ${!open ? 'rotate-180' : ''}`} />
          <span className="text-sm font-semibold text-zinc-300">{title || 'Untitled Entry'}</span>
        </div>
        {canDelete && (
          <button
            onClick={(e) => { e.stopPropagation(); onDelete() }}
            className="text-zinc-600 hover:text-red-400 transition-colors p-1"
          >
            <Trash2 size={14} />
          </button>
        )}
      </button>
      {open && <div className="px-4 py-4 border-t border-zinc-700/40 flex flex-col gap-3">{children}</div>}
    </div>
  )
}

// ─── ATS-Friendly Resume Preview ───────────────────────────────────────────────

const ATSResume = ({
  info, work, education, projects, skills, certs, languages
}: {
  info: PersonalInfo; work: WorkExperience[]; education: Education[]
  projects: Project[]; skills: Skill[]; certs: Certificate[]; languages: Language[]
}) => {
  const hasWork = work.some(w => w.company || w.role)
  const hasEdu = education.some(e => e.institution || e.degree)
  const hasProjects = projects.some(p => p.name)
  const hasSkills = skills.some(s => s.items)
  const hasCerts = certs.some(c => c.name)
  const hasLanguages = languages.some(l => l.name)

  return (
    <div id="resume-preview" className="bg-white text-gray-900 w-full" style={{ fontFamily: "'Calibri', 'Arial', sans-serif", fontSize: '11px', lineHeight: '1.4' }}>
      {/* HEADER */}
      <div style={{ padding: '12px 18px', borderBottom: '1px solid #000' }}>
        <h1 style={{ fontSize: '14px', fontWeight: '700', margin: '0 0 2px 0' }}>{info.name || 'YOUR NAME'}</h1>
        <div style={{ fontSize: '9px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {info.email && <span>{info.email}</span>}
          {info.phone && <span>•</span>}
          {info.phone && <span>{info.phone}</span>}
          {info.location && <span>•</span>}
          {info.location && <span>{info.location}</span>}
          {info.linkedin && <span>•</span>}
          {info.linkedin && <span>linkedin.com/in/{info.linkedin.split('/').pop()}</span>}
          {info.github && <span>•</span>}
          {info.github && <span>github.com/{info.github.split('/').pop()}</span>}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ padding: '12px 18px' }}>
        {/* Summary */}
        {info.summary && (
          <div style={{ marginBottom: '10px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '3px', margin: '0 0 6px 0' }}>PROFESSIONAL SUMMARY</h2>
            <p style={{ margin: '0 0 8px 0', lineHeight: '1.5' }}>{info.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {hasWork && (
          <div style={{ marginBottom: '10px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '3px', margin: '0 0 6px 0' }}>PROFESSIONAL EXPERIENCE</h2>
            {work.filter(w => w.company || w.role).map((w, idx) => (
              <div key={w.id} style={{ marginBottom: idx < work.filter(x => x.company || x.role).length - 1 ? '8px' : '0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: '700' }}>{w.role}</span>
                  <span style={{ fontSize: '10px' }}>{w.startDate}{w.current ? ' – Present' : w.endDate ? ` – ${w.endDate}` : ''}</span>
                </div>
                <div style={{ fontSize: '10px', color: '#333', marginBottom: '3px' }}>{w.company}</div>
                {w.description && (
                  <ul style={{ margin: '3px 0 0 0', paddingLeft: '18px', lineHeight: '1.5' }}>
                    {w.description.split('\n').filter(Boolean).map((line, i) => (
                      <li key={i} style={{ margin: '0 0 2px 0' }}>{line.replace(/^[-•]\s*/, '')}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {hasEdu && (
          <div style={{ marginBottom: '10px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '3px', margin: '0 0 6px 0' }}>EDUCATION</h2>
            {education.filter(e => e.institution || e.degree).map((e, idx) => (
              <div key={e.id} style={{ marginBottom: idx < education.filter(x => x.institution || x.degree).length - 1 ? '6px' : '0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: '700' }}>{e.degree}{e.field ? ` in ${e.field}` : ''}</span>
                  <span style={{ fontSize: '10px' }}>{e.startDate}{e.endDate ? ` – ${e.endDate}` : ''}</span>
                </div>
                <div style={{ fontSize: '10px', color: '#333', marginBottom: '2px' }}>{e.institution}</div>
                {e.gpa && <div style={{ fontSize: '9px', color: '#555' }}>GPA: {e.gpa}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {hasSkills && (
          <div style={{ marginBottom: '10px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '3px', margin: '0 0 6px 0' }}>TECHNICAL SKILLS</h2>
            {skills.filter(s => s.items).map((s, idx) => (
              <div key={s.id} style={{ marginBottom: idx < skills.filter(x => x.items).length - 1 ? '4px' : '0', lineHeight: '1.4' }}>
                {s.category && <span style={{ fontWeight: '700', marginRight: '4px' }}>{s.category}:</span>}
                <span>{s.items}</span>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {hasLanguages && (
          <div style={{ marginBottom: '10px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '3px', margin: '0 0 6px 0' }}>LANGUAGES</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {languages.filter(l => l.name).map(l => (
                <span key={l.id} style={{ fontSize: '10px' }}>{l.name}{l.proficiency ? ` (${l.proficiency})` : ''}</span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {hasProjects && (
          <div style={{ marginBottom: '10px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '3px', margin: '0 0 6px 0' }}>PROJECTS</h2>
            {projects.filter(p => p.name).map((p, idx) => (
              <div key={p.id} style={{ marginBottom: idx < projects.filter(x => x.name).length - 1 ? '6px' : '0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: '700' }}>{p.name}</span>
                  {p.link && <span style={{ fontSize: '9px' }}>{p.link}</span>}
                </div>
                {p.description && <div style={{ fontSize: '10px', marginTop: '2px' }}>{p.description}</div>}
                {p.tech && <div style={{ fontSize: '9px', color: '#666', marginTop: '2px' }}>Tech: {p.tech}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {hasCerts && (
          <div>
            <h2 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '3px', margin: '0 0 6px 0' }}>CERTIFICATIONS</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {certs.filter(c => c.name).map(c => (
                <span key={c.id} style={{ fontSize: '9px' }}>
                  {c.name}{c.issuer ? ` (${c.issuer})` : ''}{c.date ? ` - ${c.date}` : ''}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ResumeBuilder() {
  const [info, setInfo] = useState<PersonalInfo>({
    name: '', title: '', email: '', phone: '', location: '', website: '', linkedin: '', github: '', twitter: '', summary: ''
  })
  const [work, setWork] = useState<WorkExperience[]>([emptyWork()])
  const [education, setEducation] = useState<Education[]>([emptyEdu()])
  const [projects, setProjects] = useState<Project[]>([emptyProject()])
  const [skills, setSkills] = useState<Skill[]>([emptySkill()])
  const [certs, setCerts] = useState<Certificate[]>([emptyCert()])
  const [languages, setLanguages] = useState<Language[]>([emptyLanguage()])
  const [showPreview, setShowPreview] = useState(true)
  const [downloading, setDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  const updateInfo = (key: keyof PersonalInfo, value: string) => setInfo(prev => ({ ...prev, [key]: value }))
  const updateWork = (id: string, key: keyof WorkExperience, val: any) => setWork(prev => prev.map(w => w.id === id ? { ...w, [key]: val } : w))
  const updateEdu = (id: string, key: keyof Education, val: string) => setEducation(prev => prev.map(e => e.id === id ? { ...e, [key]: val } : e))
  const updateProject = (id: string, key: keyof Project, val: string) => setProjects(prev => prev.map(p => p.id === id ? { ...p, [key]: val } : p))
  const updateSkill = (id: string, key: keyof Skill, val: string) => setSkills(prev => prev.map(s => s.id === id ? { ...s, [key]: val } : s))
  const updateCert = (id: string, key: keyof Certificate, val: string) => setCerts(prev => prev.map(c => c.id === id ? { ...c, [key]: val } : c))
  const updateLanguage = (id: string, key: keyof Language, val: string) => setLanguages(prev => prev.map(l => l.id === id ? { ...l, [key]: val } : l))

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const html2pdf = (await import('html2pdf.js')).default
      const el = document.getElementById('resume-preview')
      if (!el) return
      await html2pdf().set({
        margin: [8, 8, 8, 8],
        filename: `${info.name || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).from(el).save()
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 3000)
    } catch (e) {
      console.error(e)
      alert('Download failed.')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
        <div className="max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => window.history.back()} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors" title="Go back">
              <ArrowLeft size={18} />
            </button>
            <div className="flex items-center gap-3 pl-2 border-l border-zinc-700">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <FileText size={16} className="text-emerald-400" />
              </div>
              <span className="font-bold text-base">Jobbr</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setShowPreview(!showPreview)} className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-zinc-700 text-xs font-medium hover:bg-zinc-800 transition-colors">
              {showPreview ? <EyeOff size={14} /> : <Eye size={14} />}
              {showPreview ? 'Hide' : 'Show'} Preview
            </button>
            <button onClick={handleDownload} disabled={downloading} className="flex items-center gap-2 px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-semibold disabled:opacity-50 transition-colors">
              {downloaded ? <><Check size={14} /> Downloaded!</> : downloading ? <><Sparkles size={14} className="animate-spin" /> Generating…</> : <><Download size={14} /> Download PDF</>}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-6 py-8 flex gap-8">
        {/* Left Panel - Form */}
        <div className="w-full max-w-xl shrink-0 space-y-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 100px)' }}>
          
          {/* PERSONAL INFO */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wide flex items-center gap-2">
              <User size={16} className="text-emerald-400" /> Personal Information
            </h3>
            <div className="space-y-3">
              <Field label="Full Name" value={info.name} onChange={v => updateInfo('name', v)} placeholder="John Doe" />
              <Field label="Professional Title" value={info.title} onChange={v => updateInfo('title', v)} placeholder="Senior Software Engineer" />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Email" value={info.email} onChange={v => updateInfo('email', v)} placeholder="john@example.com" />
                <Field label="Phone" value={info.phone} onChange={v => updateInfo('phone', v)} placeholder="+1 (555) 123-4567" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Location" value={info.location} onChange={v => updateInfo('location', v)} placeholder="New York, NY" />
                <Field label="Website" value={info.website} onChange={v => updateInfo('website', v)} placeholder="yourportfolio.com" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="LinkedIn" value={info.linkedin} onChange={v => updateInfo('linkedin', v)} placeholder="your-profile" />
                <Field label="GitHub" value={info.github} onChange={v => updateInfo('github', v)} placeholder="username" />
              </div>
              <TextArea label="Professional Summary" value={info.summary} onChange={v => updateInfo('summary', v)} placeholder="2-3 sentence overview of your expertise..." rows={3} />
            </div>
          </section>

          {/* WORK EXPERIENCE */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wide flex items-center gap-2">
                <Briefcase size={16} className="text-emerald-400" /> Work Experience
              </h3>
              <button onClick={() => setWork(prev => [...prev, emptyWork()])} className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                <Plus size={14} /> Add
              </button>
            </div>
            <div className="space-y-3">
              {work.map((w, i) => (
                <Entry key={w.id} title={w.role || w.company || `Experience ${i + 1}`} onDelete={() => setWork(prev => prev.filter(x => x.id !== w.id))} canDelete={work.length > 1}>
                  <div className="space-y-2.5">
                    <div className="grid grid-cols-2 gap-2.5">
                      <Field label="Company" value={w.company} onChange={v => updateWork(w.id, 'company', v)} placeholder="Google" compact />
                      <Field label="Job Title" value={w.role} onChange={v => updateWork(w.id, 'role', v)} placeholder="Senior Engineer" compact />
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      <Field label="Start Date" value={w.startDate} onChange={v => updateWork(w.id, 'startDate', v)} placeholder="Jan 2022" compact />
                      <Field label="End Date" value={w.endDate} onChange={v => updateWork(w.id, 'endDate', v)} placeholder="Dec 2024"  compact />
                    </div>
                    <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer hover:text-zinc-200">
                      <input type="checkbox" checked={w.current} onChange={e => updateWork(w.id, 'current', e.target.checked)} className="accent-emerald-500 rounded w-3.5 h-3.5" />
                      Currently working
                    </label>
                    <TextArea label="Achievements & Responsibilities" value={w.description} onChange={v => updateWork(w.id, 'description', v)} placeholder="- Built scalable APIs&#10;- Led team of 5 engineers" rows={3} compact />
                  </div>
                </Entry>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wide flex items-center gap-2">
                <GraduationCap size={16} className="text-emerald-400" /> Education
              </h3>
              <button onClick={() => setEducation(prev => [...prev, emptyEdu()])} className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                <Plus size={14} /> Add
              </button>
            </div>
            <div className="space-y-3">
              {education.map((e, i) => (
                <Entry key={e.id} title={e.degree || e.institution || `Education ${i + 1}`} onDelete={() => setEducation(prev => prev.filter(x => x.id !== e.id))} canDelete={education.length > 1}>
                  <div className="space-y-2.5">
                    <Field label="Institution" value={e.institution} onChange={v => updateEdu(e.id, 'institution', v)} placeholder="Harvard University" compact />
                    <div className="grid grid-cols-2 gap-2.5">
                      <Field label="Degree" value={e.degree} onChange={v => updateEdu(e.id, 'degree', v)} placeholder="B.S." compact />
                      <Field label="Field of Study" value={e.field} onChange={v => updateEdu(e.id, 'field', v)} placeholder="Computer Science" compact />
                    </div>
                    <div className="grid grid-cols-3 gap-2.5">
                      <Field label="Start Year" value={e.startDate} onChange={v => updateEdu(e.id, 'startDate', v)} placeholder="2018" compact />
                      <Field label="End Year" value={e.endDate} onChange={v => updateEdu(e.id, 'endDate', v)} placeholder="2022" compact />
                      <Field label="GPA" value={e.gpa} onChange={v => updateEdu(e.id, 'gpa', v)} placeholder="3.8" compact />
                    </div>
                  </div>
                </Entry>
              ))}
            </div>
          </section>

          {/* SKILLS */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wide flex items-center gap-2">
                <Code2 size={16} className="text-emerald-400" /> Technical Skills
              </h3>
              <button onClick={() => setSkills(prev => [...prev, emptySkill()])} className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                <Plus size={14} /> Add
              </button>
            </div>
            <div className="space-y-2.5">
              {skills.map((s) => (
                <div key={s.id} className="flex gap-2.5 items-end">
                  <input value={s.category} onChange={e => updateSkill(s.id, 'category', e.target.value)} placeholder="Category (e.g., Languages)" className="flex-1 bg-zinc-800/40 border border-zinc-700/60 rounded px-3 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/80" />
                  <input value={s.items} onChange={e => updateSkill(s.id, 'items', e.target.value)} placeholder="Python, JavaScript, Go..." className="flex-[2] bg-zinc-800/40 border border-zinc-700/60 rounded px-3 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/80" />
                  {skills.length > 1 && <button onClick={() => setSkills(prev => prev.filter(x => x.id !== s.id))} className="text-zinc-600 hover:text-red-400 transition-colors p-2"><Trash2 size={14} /></button>}
                </div>
              ))}
            </div>
          </section>

          {/* LANGUAGES */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wide flex items-center gap-2">
                <BookOpen size={16} className="text-emerald-400" /> Languages
              </h3>
              <button onClick={() => setLanguages(prev => [...prev, emptyLanguage()])} className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                <Plus size={14} /> Add
              </button>
            </div>
            <div className="space-y-2.5">
              {languages.map((l) => (
                <div key={l.id} className="flex gap-2.5 items-center">
                  <input value={l.name} onChange={e => updateLanguage(l.id, 'name', e.target.value)} placeholder="Language" className="flex-1 bg-zinc-800/40 border border-zinc-700/60 rounded px-3 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/80" />
                  <select value={l.proficiency} onChange={e => updateLanguage(l.id, 'proficiency', e.target.value)} className="bg-zinc-800/40 border border-zinc-700/60 rounded px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500/80">
                    <option value="">Proficiency</option>
                    <option value="Native">Native</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Professional">Professional</option>
                    <option value="Intermediate">Intermediate</option>
                  </select>
                  {languages.length > 1 && <button onClick={() => setLanguages(prev => prev.filter(x => x.id !== l.id))} className="text-zinc-600 hover:text-red-400 transition-colors p-2"><Trash2 size={14} /></button>}
                </div>
              ))}
            </div>
          </section>

          {/* PROJECTS */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wide flex items-center gap-2">
                <Zap size={16} className="text-emerald-400" /> Projects
              </h3>
              <button onClick={() => setProjects(prev => [...prev, emptyProject()])} className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                <Plus size={14} /> Add
              </button>
            </div>
            <div className="space-y-3">
              {projects.map((p, i) => (
                <Entry key={p.id} title={p.name || `Project ${i + 1}`} onDelete={() => setProjects(prev => prev.filter(x => x.id !== p.id))} canDelete={projects.length > 1}>
                  <div className="space-y-2.5">
                    <div className="grid grid-cols-2 gap-2.5">
                      <Field label="Project Name" value={p.name} onChange={v => updateProject(p.id, 'name', v)} placeholder="EduFlow" compact />
                      <Field label="GitHub/Live Link" value={p.link} onChange={v => updateProject(p.id, 'link', v)} placeholder="github.com/..." compact />
                    </div>
                    <TextArea label="Description" value={p.description} onChange={v => updateProject(p.id, 'description', v)} placeholder="What you built and your role..." rows={2} compact />
                    <Field label="Technologies" value={p.tech} onChange={v => updateProject(p.id, 'tech', v)} placeholder="React, Node.js, PostgreSQL" compact />
                  </div>
                </Entry>
              ))}
            </div>
          </section>

          {/* CERTIFICATIONS */}
          <section className="space-y-4 pb-8">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wide flex items-center gap-2">
                <Award size={16} className="text-emerald-400" /> Certifications
              </h3>
              <button onClick={() => setCerts(prev => [...prev, emptyCert()])} className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                <Plus size={14} /> Add
              </button>
            </div>
            <div className="space-y-3">
              {certs.map((c, i) => (
                <Entry key={c.id} title={c.name || `Certificate ${i + 1}`} onDelete={() => setCerts(prev => prev.filter(x => x.id !== c.id))} canDelete={certs.length > 1}>
                  <div className="space-y-2.5">
                    <Field label="Certification Name" value={c.name} onChange={v => updateCert(c.id, 'name', v)} placeholder="AWS Solutions Architect" compact />
                    <div className="grid grid-cols-2 gap-2.5">
                      <Field label="Issuer" value={c.issuer} onChange={v => updateCert(c.id, 'issuer', v)} placeholder="Amazon Web Services" compact />
                      <Field label="Date" value={c.date} onChange={v => updateCert(c.id, 'date', v)} placeholder="Jun 2024" compact />
                    </div>
                  </div>
                </Entry>
              ))}
            </div>
          </section>
        </div>

        {/* Right Panel - Preview */}
        {showPreview && (
          <div className="flex-1 min-w-0">
            <div className="sticky top-20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wide">ATS-Friendly Resume</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs text-zinc-500">Live</span>
                </div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden border border-zinc-700 shadow-2xl" style={{ maxHeight: 'calc(100vh - 140px)', overflowY: 'auto' }}>
                <ATSResume info={info} work={work} education={education} projects={projects} skills={skills} certs={certs} languages={languages} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}