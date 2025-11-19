import { prisma } from '@repo/database'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email, fullName, age } = await req.json()
    
    const user = await prisma.user.create({
      data: { email, fullName, age }
    })
    
    return NextResponse.json({ userId: user.id })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}

