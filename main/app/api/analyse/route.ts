/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { extractTextFromFile } from '@/app/lib/extractText'
import { AnalysisResult } from '@/app/types/analysis'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const SYSTEM_PROMPT = `You are an expert ATS (Applicant Tracking System) and resume analyst with 10+ years of HR experience.

Analyse the given resume text and return ONLY a valid JSON object (no markdown, no backticks, no explanation) with this exact structure:

{
  "ats_score": <number 0-100>,
  "overall_verdict": "<one line summary of the resume>",
  "experience_level": "<one of: Fresher | Mid-Level | Senior | Expert>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>", "<weakness 3>"],
  "skill_gaps": ["<missing skill 1>", "<missing skill 2>", "<missing skill 3>"],
  "suggestions": ["<actionable suggestion 1>", "<actionable suggestion 2>", "<actionable suggestion 3>"],
  "keywords_found": ["<keyword 1>", "<keyword 2>", "<keyword 3>", "<keyword 4>", "<keyword 5>"],
  "keywords_missing": ["<missing keyword 1>", "<missing keyword 2>", "<missing keyword 3>"]
}

Be honest, specific, and actionable. Return ONLY the JSON object.`

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('resume') as File | null

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 })
    }

    // Step 1: Extract text from PDF/DOCX
    let resumeText: string
    try {
      resumeText = await extractTextFromFile(file)
    } catch (err) {
      return NextResponse.json(
        { success: false, error: 'Failed to extract text from file. Please upload a valid PDF or DOCX.' },
        { status: 422 }
      )
    }

    if (!resumeText || resumeText.length < 50) {
      return NextResponse.json(
        { success: false, error: 'Resume seems empty or could not be read properly.' },
        { status: 422 }
      )
    }

    // Step 2: Send to Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const prompt = `${SYSTEM_PROMPT}\n\nResume Text:\n${resumeText}`

    const result = await model.generateContent(prompt)
    const responseText = result.response.text()

    // Step 3: Parse JSON response
    let analysisData: AnalysisResult
    try {
      // Strip any accidental markdown fences
      const cleaned = responseText
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim()

      analysisData = JSON.parse(cleaned)
    } catch {
      return NextResponse.json(
        { success: false, error: 'Failed to parse AI response. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data: analysisData })
  } catch (error: any) {
    console.error('Analyse API error:', error)
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}