/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useRef } from 'react'
import { Upload, Sparkles, ChevronRight, X, CheckCircle, Loader2, RotateCcw } from 'lucide-react'
import { AnalysisResult } from '@/app/types/analysis'
import AnalysisResultUI from '@/app/components/AnalysisReport'

const DISPLAY_FONT = `'Segoe UI', system-ui, -apple-system, sans-serif`
const MONO_FONT = `'Courier New', Courier, monospace`

type Status = 'idle' | 'loading' | 'done' | 'error'

export default function ResumeAnalyser() {
  const [dragOver, setDragOver] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState('')
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

  const removeFile = () => {
    setFile(null); setResult(null); setStatus('idle'); setError('')
  }

  const handleAnalyse = async () => {
    if (!file) return
    setStatus('loading'); setError(''); setResult(null)
    try {
      const formData = new FormData()
      formData.append('resume', file)
      const res = await fetch('/api/analyse', { method: 'POST', body: formData })
      const json = await res.json()
      if (!json.success) throw new Error(json.error || 'Analysis failed')
      setResult(json.data)
      setStatus('done')
    } catch (err: any) {
      setError(err.message || 'Something went wrong.')
      setStatus('error')
    }
  }

  const reset = () => {
    setFile(null); setResult(null); setStatus('idle'); setError('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <main style={{
      minHeight: '100vh', background: '#080810', color: '#e8e8f0',
      position: 'relative', overflow: 'hidden', fontFamily: DISPLAY_FONT,
    }}>
      {/* Grid bg */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />
      {/* Glow */}
      <div style={{
        position: 'fixed', top: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, transparent 70%)',
        zIndex: 0, pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto', padding: '64px 24px 80px' }}>

        {/* Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <span style={{
            fontFamily: MONO_FONT, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase',
            padding: '6px 16px', borderRadius: '999px',
            border: '1px solid rgba(99,102,241,0.4)', background: 'rgba(99,102,241,0.08)', color: '#a5b4fc',
          }}>✦ Powered by Gemini 1.5 Flash</span>
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize: 'clamp(42px, 7vw, 72px)', fontWeight: 800, lineHeight: 1.05,
          textAlign: 'center', marginBottom: '16px', letterSpacing: '-0.03em',
        }}>
          <span style={{ color: '#e8e8f0' }}>Resume</span>{' '}
          <span style={{ background: 'linear-gradient(135deg, #818cf8, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Analyser</span>
        </h1>

        <p style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto 56px', color: '#6b7280', fontSize: '16px', lineHeight: 1.7 }}>
          Drop your resume. Get brutally honest AI feedback — ATS score, skill gaps, and actionable improvements.
        </p>

        {status !== 'done' && (
          <>
            {/* Upload Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => !file && inputRef.current?.click()}
              style={{
                border: `1.5px dashed ${dragOver ? '#818cf8' : file ? '#34d399' : 'rgba(255,255,255,0.10)'}`,
                borderRadius: '20px', padding: '56px 32px', textAlign: 'center',
                cursor: file ? 'default' : 'pointer',
                background: dragOver ? 'rgba(99,102,241,0.06)' : file ? 'rgba(52,211,153,0.04)' : 'rgba(255,255,255,0.02)',
                transition: 'all 0.25s ease', marginBottom: '32px',
              }}
            >
              <input ref={inputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFile} style={{ display: 'none' }} />

              {file ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle size={28} color="#34d399" />
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '18px', color: '#34d399', marginBottom: '4px' }}>{file.name}</p>
                    <p style={{ fontFamily: MONO_FONT, fontSize: '12px', color: '#6b7280' }}>{(file.size / 1024).toFixed(1)} KB · Ready to analyse</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); removeFile() }} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '999px', border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.08)', color: '#f87171', fontSize: '13px', cursor: 'pointer', fontFamily: DISPLAY_FONT }}>
                    <X size={14} /> Remove
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                  <div style={{ width: '72px', height: '72px', borderRadius: '20px', background: 'rgba(99,102,241,0.10)', border: '1px solid rgba(99,102,241,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Upload size={30} color="#818cf8" />
                  </div>
                  <div>
                    <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{dragOver ? 'Drop it here!' : 'Drag & drop your resume'}</p>
                    <p style={{ fontFamily: MONO_FONT, fontSize: '12px', color: '#4b5563', letterSpacing: '0.05em' }}>PDF · DOC · DOCX — Max 10MB</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }} style={{ padding: '10px 28px', borderRadius: '999px', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.35)', color: '#a5b4fc', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: DISPLAY_FONT }}>
                    Browse Files
                  </button>
                </div>
              )}
            </div>

            {/* Loading */}
            {status === 'loading' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '32px', borderRadius: '16px', background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.2)', marginBottom: '32px' }}>
                <Loader2 size={32} color="#818cf8" style={{ animation: 'spin 1s linear infinite' }} />
                <p style={{ fontFamily: MONO_FONT, fontSize: '13px', color: '#a5b4fc' }}>Analysing with Gemini AI...</p>
                <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
              </div>
            )}

            {/* Error */}
            {status === 'error' && (
              <div style={{ padding: '20px', borderRadius: '16px', marginBottom: '32px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <X size={20} color="#f87171" />
                <p style={{ color: '#f87171', fontSize: '14px' }}>{error}</p>
              </div>
            )}

            {/* CTA */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button onClick={handleAnalyse} disabled={!file || status === 'loading'} style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 40px', borderRadius: '14px',
                background: file && status !== 'loading' ? 'linear-gradient(135deg, #6366f1, #ec4899)' : 'rgba(255,255,255,0.05)',
                border: 'none', color: file && status !== 'loading' ? '#fff' : '#4b5563',
                fontSize: '16px', fontWeight: 700, cursor: file ? 'pointer' : 'not-allowed',
                fontFamily: DISPLAY_FONT, boxShadow: file ? '0 8px 32px rgba(99,102,241,0.35)' : 'none', transition: 'all 0.3s ease',
              }}>
                {status === 'loading'
                  ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Analysing...</>
                  : <><Sparkles size={18} /> Analyse My Resume <ChevronRight size={18} /></>}
              </button>
            </div>
          </>
        )}

        {/* Result */}
        {status === 'done' && result && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <p style={{ fontFamily: MONO_FONT, fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Analysis for: <span style={{ color: '#a5b4fc' }}>{file?.name}</span>
              </p>
              <button onClick={reset} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: '#9ca3af', fontSize: '13px', cursor: 'pointer', fontFamily: DISPLAY_FONT }}>
                <RotateCcw size={13} /> Analyse Another
              </button>
            </div>
            <AnalysisResultUI data={result} />
          </>
        )}

        <p style={{ fontFamily: MONO_FONT, textAlign: 'center', marginTop: '48px', fontSize: '11px', color: '#374151', letterSpacing: '0.05em' }}>
          🔒 Your resume is never stored · Processed in-memory only
        </p>
      </div>
    </main>
  )
}