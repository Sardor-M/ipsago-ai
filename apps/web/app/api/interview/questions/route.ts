import { NextResponse } from 'next/server'

const FALLBACK_QUESTIONS = [
  "Tell me about yourself",
  "Why are you interested in this position?",
  "What are your greatest strengths?",
  "What are your weaknesses?",
  "Where do you see yourself in 5 years?",
  "Why should we hire you?",
  "Describe a challenging situation you faced and how you handled it",
  "What motivates you?",
  "How do you handle stress and pressure?",
  "Do you have any questions for us?"
]

export async function POST(req: Request) {
  try {
    const { jobId, userId } = await req.json()
    
    // TODO: Integrate OpenAI for question generation
    // For now, return fallback questions
    // try {
    //   const completion = await openai.chat.completions.create({
    //     model: "gpt-3.5-turbo",
    //     messages: [{
    //       role: "system",
    //       content: `Generate 10 interview questions for ${jobTitle}`
    //     }]
    //   })
    //   return NextResponse.json({ questions: completion.choices[0].message })
    // } catch {
    //   return NextResponse.json({ questions: FALLBACK_QUESTIONS })
    // }
    
    return NextResponse.json({ questions: FALLBACK_QUESTIONS })
  } catch (error) {
    console.error('Error generating questions:', error)
    return NextResponse.json(
      { questions: FALLBACK_QUESTIONS },
      { status: 200 }
    )
  }
}

