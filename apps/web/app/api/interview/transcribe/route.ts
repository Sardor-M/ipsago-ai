import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { audioData } = await req.json()
    
    // TODO: Integrate AssemblyAI for speech-to-text
    // For now, return placeholder transcript
    // Use browser's Web Speech API as fallback on frontend
    
    return NextResponse.json({ 
      transcript: "User's answer here (transcription pending)" 
    })
  } catch (error) {
    console.error('Error transcribing audio:', error)
    return NextResponse.json(
      { error: 'Failed to transcribe audio' },
      { status: 500 }
    )
  }
}

