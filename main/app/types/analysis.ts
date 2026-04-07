export interface AnalysisResult {
  ats_score: number
  overall_verdict: string
  strengths: string[]
  weaknesses: string[]
  skill_gaps: string[]
  suggestions: string[]
  experience_level: 'Fresher' | 'Mid-Level' | 'Senior' | 'Expert'
  keywords_found: string[]
  keywords_missing: string[]
}

export interface AnalysisResponse {
  success: boolean
  data?: AnalysisResult
  error?: string
}