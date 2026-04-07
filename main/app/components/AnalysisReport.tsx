'use client'

import { AnalysisResult } from '@/app/types/analysis'
import {
  CheckCircle, Zap, Target, Brain,
  TrendingUp, AlertTriangle, Hash
} from 'lucide-react'

const MONO_FONT = `'Courier New', Courier, monospace`
const DISPLAY_FONT = `'Segoe UI', system-ui, -apple-system, sans-serif`

interface Props {
  data: AnalysisResult
}

const levelColor: Record<string, string> = {
  Fresher: '#60a5fa',
  'Mid-Level': '#a78bfa',
  Senior: '#34d399',
  Expert: '#f59e0b',
}

export default function AnalysisResultUI({ data }: Props) {
  const scoreColor =
    data.ats_score >= 80 ? '#34d399' :
    data.ats_score >= 60 ? '#f59e0b' : '#f87171'

  const circumference = 2 * Math.PI * 54
  const offset = circumference - (data.ats_score / 100) * circumference

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '40px', fontFamily: DISPLAY_FONT }}>

      {/* Top Row — ATS Score + Verdict */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>

        {/* ATS Score Ring */}
        <div style={cardStyle}>
          <p style={{ ...labelStyle, fontFamily: MONO_FONT }}>ATS Score</p>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
            <svg width="130" height="130" viewBox="0 0 130 130">
              <circle cx="65" cy="65" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
              <circle
                cx="65" cy="65" r="54" fill="none"
                stroke={scoreColor} strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 65 65)"
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
              <text x="65" y="60" textAnchor="middle" fill={scoreColor}
                style={{ fontSize: '28px', fontWeight: 800, fontFamily: DISPLAY_FONT }}>
                {data.ats_score}
              </text>
              <text x="65" y="78" textAnchor="middle" fill="#6b7280"
                style={{ fontSize: '12px', fontFamily: MONO_FONT }}>
                / 100
              </text>
            </svg>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{
              padding: '4px 14px', borderRadius: '999px',
              background: `${levelColor[data.experience_level]}18`,
              border: `1px solid ${levelColor[data.experience_level]}40`,
              color: levelColor[data.experience_level],
              fontSize: '12px', fontWeight: 600,
            }}>
              {data.experience_level}
            </span>
          </div>
        </div>

        {/* Verdict */}
        <div style={cardStyle}>
          <p style={{ ...labelStyle, fontFamily: MONO_FONT }}>Overall Verdict</p>
          <p style={{ fontSize: '17px', lineHeight: 1.6, color: '#e2e8f0', marginTop: '12px', fontFamily: DISPLAY_FONT }}>
            {data.overall_verdict}
          </p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
            <Chip icon={<CheckCircle size={13} color="#34d399" />}
              label={`${data.keywords_found.length} keywords found`} color="#34d399" />
            <Chip icon={<Hash size={13} color="#f87171" />}
              label={`${data.keywords_missing.length} keywords missing`} color="#f87171" />
          </div>
        </div>
      </div>

      {/* Strengths + Weaknesses */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <ListCard icon={<TrendingUp size={16} color="#34d399" />} title="Strengths" items={data.strengths} color="#34d399" />
        <ListCard icon={<AlertTriangle size={16} color="#f87171" />} title="Weaknesses" items={data.weaknesses} color="#f87171" />
      </div>

      {/* Skill Gaps + Suggestions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <ListCard icon={<Target size={16} color="#a78bfa" />} title="Skill Gaps" items={data.skill_gaps} color="#a78bfa" />
        <ListCard icon={<Zap size={16} color="#f59e0b" />} title="Suggestions" items={data.suggestions} color="#f59e0b" />
      </div>

      {/* Keywords */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Brain size={16} color="#818cf8" />
          <p style={{ ...labelStyle, fontFamily: MONO_FONT }}>Keywords Analysis</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ fontFamily: MONO_FONT, fontSize: '11px', color: '#34d399', marginBottom: '8px' }}>✓ FOUND</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {data.keywords_found.map(k => <Tag key={k} label={k} color="#34d399" />)}
            </div>
          </div>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }} />
          <div>
            <p style={{ fontFamily: MONO_FONT, fontSize: '11px', color: '#f87171', marginBottom: '8px' }}>✗ MISSING</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {data.keywords_missing.map(k => <Tag key={k} label={k} color="#f87171" />)}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

/* ─── Sub-components ─── */

function ListCard({ icon, title, items, color }: {
  icon: React.ReactNode, title: string, items: string[], color: string
}) {
  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        {icon}
        <p style={{ ...labelStyle, fontFamily: MONO_FONT }}>{title}</p>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ marginTop: '4px', width: '6px', height: '6px', borderRadius: '50%', background: color, flexShrink: 0 }} />
            <span style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.5 }}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Chip({ icon, label, color }: { icon: React.ReactNode, label: string, color: string }) {
  return (
    <span style={{
      display: 'flex', alignItems: 'center', gap: '6px',
      padding: '4px 12px', borderRadius: '999px',
      background: `${color}12`, border: `1px solid ${color}30`,
      color, fontSize: '12px', fontWeight: 600,
    }}>
      {icon} {label}
    </span>
  )
}

function Tag({ label, color }: { label: string, color: string }) {
  return (
    <span style={{
      padding: '3px 10px', borderRadius: '6px', fontSize: '12px',
      background: `${color}10`, border: `1px solid ${color}25`,
      color, fontFamily: MONO_FONT,
    }}>
      {label}
    </span>
  )
}

/* ─── Shared styles ─── */

const cardStyle: React.CSSProperties = {
  padding: '24px',
  borderRadius: '16px',
  background: 'rgba(255,255,255,0.025)',
  border: '1px solid rgba(255,255,255,0.07)',
}

const labelStyle: React.CSSProperties = {
  fontSize: '11px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#6b7280',
  margin: 0,
}