import { prisma } from '@repo/database'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const userId = formData.get('userId') as string
    
    if (!file || !userId) {
      return NextResponse.json(
        { error: 'Missing file or userId' },
        { status: 400 }
      )
    }
    
    // Parse resume (simplified - convert to text)
    const text = await file.text()
    // Basic markdown conversion (can be enhanced later)
    const markdown = text
    
    await prisma.user.update({
      where: { id: userId },
      data: { resumeMarkdown: markdown }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error uploading resume:', error)
    return NextResponse.json(
      { error: 'Failed to upload resume' },
      { status: 500 }
    )
  }
}

