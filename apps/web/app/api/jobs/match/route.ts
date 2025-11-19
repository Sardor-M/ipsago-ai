import { prisma } from '@repo/database'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { userId } = await req.json()
    
    // Simple matching: just return 5 random jobs
    const jobs = await prisma.jobDescription.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    )
  }
}

