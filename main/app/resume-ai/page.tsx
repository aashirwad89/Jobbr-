'use client'

import React, { useState, useRef } from 'react'
import { Upload, FileText, Sparkles, Zap, Brain, Target, ChevronRight, X, CheckCircle } from 'lucide-react'
import { Syne, Space_Mono } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], weight: ['400', '600', '700', '800'] })
const mono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'] })

export default function ResumeAnalyser() {
  const [dragOver, setDragOver] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) setFile(dropped)
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0])
  }

  const removeFile = () => setFile(null)

  const features = [
    { icon: Brain, label: 'ATS Score', desc: 'Applicant Tracking check' },
    { icon: Target, label: 'Skill Gap', desc: 'Missing skills detected' },
    { icon: Zap, label: 'Instant AI', desc: 'Results in seconds' },
    { icon: Sparkles, label: 'Suggestions', desc: 'Smart improvements' },
  ]

  return (
    <main
      className={syne.className}
      style={{
        minHeight: '100vh',
        background: '#080810',
        color: '#e8e8f0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid + glow */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
      }} />
      <div style={{
        position: 'fixed', top: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, transparent 70%)',
        zIndex: 0, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', bottom: '-10%', right: '-10%',
        width: '500px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(236,72,153,0.10) 0%, transparent 70%)',
        zIndex: 0, pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '860px', margin: '0 auto', padding: '64px 24px 80px' }}>

        {/* Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <span className={mono.className} style={{
            fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase',
            padding: '6px 16px', borderRadius: '999px',
            border: '1px solid rgba(99,102,241,0.4)',
            background: 'rgba(99,102,241,0.08)',
            color: '#a5b4fc',
          }}>
            ✦ AI-Powered · v2.0
          </span>
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize: 'clamp(42px, 7vw, 72px)',
          fontWeight: 800,
          lineHeight: 1.05,
          textAlign: 'center',
          marginBottom: '16px',
          letterSpacing: '-0.03em',
        }}>
          <span style={{ color: '#e8e8f0' }}>Resume</span>{' '}
          <span style={{
            background: 'linear-gradient(135deg, #818cf8, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>Analyser</span>
        </h1>

        <p style={{
          textAlign: 'center', maxWidth: '480px', margin: '0 auto 56px',
          color: '#6b7280', fontSize: '16px', lineHeight: 1.7,
        }}>
          Drop your resume. Get brutally honest AI feedback — ATS score, skill gaps, and actionable improvements.
        </p>

        {/* Upload Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !file && inputRef.current?.click()}
          style={{
            border: `1.5px dashed ${dragOver ? '#818cf8' : file ? '#34d399' : 'rgba(255,255,255,0.10)'}`,
            borderRadius: '20px',
            padding: '56px 32px',
            textAlign: 'center',
            cursor: file ? 'default' : 'pointer',
            background: dragOver
              ? 'rgba(99,102,241,0.06)'
              : file
              ? 'rgba(52,211,153,0.04)'
              : 'rgba(255,255,255,0.02)',
            transition: 'all 0.25s ease',
            marginBottom: '40px',
            position: 'relative',
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFile}
            style={{ display: 'none' }}
          />

          {file ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '16px',
                background: 'rgba(52,211,153,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(52,211,153,0.3)',
              }}>
                <CheckCircle size={28} color="#34d399" />
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: '18px', color: '#34d399', marginBottom: '4px' }}>
                  {file.name}
                </p>
                <p className={mono.className} style={{ fontSize: '12px', color: '#6b7280' }}>
                  {(file.size / 1024).toFixed(1)} KB · Ready to analyse
                </p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); removeFile() }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '6px 14px', borderRadius: '999px',
                  border: '1px solid rgba(239,68,68,0.3)',
                  background: 'rgba(239,68,68,0.08)',
                  color: '#f87171', fontSize: '13px', cursor: 'pointer',
                }}
              >
                <X size={14} /> Remove
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <div style={{
                width: '72px', height: '72px', borderRadius: '20px',
                background: 'rgba(99,102,241,0.10)',
                border: '1px solid rgba(99,102,241,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'transform 0.2s',
                transform: dragOver ? 'scale(1.1)' : 'scale(1)',
              }}>
                <Upload size={30} color="#818cf8" />
              </div>
              <div>
                <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
                  {dragOver ? 'Drop it here!' : 'Drag & drop your resume'}
                </p>
                <p className={mono.className} style={{ fontSize: '12px', color: '#4b5563', letterSpacing: '0.05em' }}>
                  PDF · DOC · DOCX — Max 10MB
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#374151' }}>
                <div style={{ height: '1px', width: '60px', background: 'rgba(255,255,255,0.08)' }} />
                <span className={mono.className} style={{ fontSize: '11px' }}>or</span>
                <div style={{ height: '1px', width: '60px', background: 'rgba(255,255,255,0.08)' }} />
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}
                style={{
                  padding: '10px 28px', borderRadius: '999px',
                  background: 'rgba(99,102,241,0.15)',
                  border: '1px solid rgba(99,102,241,0.35)',
                  color: '#a5b4fc', fontSize: '14px', fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'inherit',
                  transition: 'background 0.2s',
                }}
              >
                Browse Files
              </button>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '64px' }}>
          <button
            disabled={!file}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '16px 40px', borderRadius: '14px',
              background: file
                ? 'linear-gradient(135deg, #6366f1, #ec4899)'
                : 'rgba(255,255,255,0.05)',
              border: 'none',
              color: file ? '#fff' : '#4b5563',
              fontSize: '16px', fontWeight: 700,
              cursor: file ? 'pointer' : 'not-allowed',
              fontFamily: 'inherit',
              letterSpacing: '-0.01em',
              boxShadow: file ? '0 8px 32px rgba(99,102,241,0.35)' : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            <Sparkles size={18} />
            Analyse My Resume
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Feature Pills */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
        }}>
          {features.map(({ icon: Icon, label, desc }) => (
            <div key={label} style={{
              padding: '20px 20px',
              borderRadius: '16px',
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', flexDirection: 'column', gap: '10px',
              transition: 'border-color 0.2s, background 0.2s',
            }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '12px',
                background: 'rgba(99,102,241,0.12)',
                border: '1px solid rgba(99,102,241,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={18} color="#818cf8" />
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: '15px', marginBottom: '3px' }}>{label}</p>
                <p className={mono.className} style={{ fontSize: '11px', color: '#6b7280', lineHeight: 1.5 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className={mono.className} style={{
          textAlign: 'center', marginTop: '48px',
          fontSize: '11px', color: '#374151', letterSpacing: '0.05em',
        }}>
          🔒 Your resume is never stored · Processed in-memory only
        </p>

      </div>
    </main>
  )
}