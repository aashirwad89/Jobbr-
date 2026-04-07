/* eslint-disable @typescript-eslint/no-explicit-any */
import mammoth from 'mammoth'

export async function extractTextFromFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
    return await extractFromPDF(arrayBuffer)
  }

  if (
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.name.endsWith('.docx') ||
    file.name.endsWith('.doc')
  ) {
    return await extractFromDOCX(buffer)
  }

  throw new Error('Unsupported file type. Please upload PDF or DOCX.')
}

async function extractFromPDF(arrayBuffer: ArrayBuffer): Promise<string> {
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs')

  // Disable worker in Node.js environment (Next.js API route)
  pdfjsLib.GlobalWorkerOptions.workerSrc = ''

  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(arrayBuffer),
    useWorkerFetch: false,
    isEvalSupported: false,
    useSystemFonts: true,
  })

  const pdf = await loadingTask.promise
  const totalPages = pdf.numPages
  const textPages: string[] = []

  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    const page = await pdf.getPage(pageNum)
    const content = await page.getTextContent()
    const pageText = content.items
      .map((item: any) => ('str' in item ? item.str : ''))
      .join(' ')
    textPages.push(pageText)
  }

  return textPages.join('\n').trim()
}

async function extractFromDOCX(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer })
  return result.value.trim()
}