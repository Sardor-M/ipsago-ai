'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function FeedbackPage() {
  const router = useRouter()
  const [feedback, setFeedback] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    
    if (!userId) {
      router.push('/')
      return
    }

    // TODO: Generate actual feedback from AI
    // For now, show placeholder feedback
    setTimeout(() => {
      setFeedback(`
        Great job completing the interview! Here's your feedback:
        
        • You demonstrated good communication skills
        • Your answers were clear and concise
        • Consider providing more specific examples
        • Work on elaborating your technical experience
        
        Keep practicing to improve your interview performance!
      `)
      setLoading(false)
    }, 1000)
  }, [router])

  const handleStartOver = () => {
    localStorage.removeItem('selectedJobId')
    router.push('/jobs')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Generating feedback...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Interview Feedback</h1>
        
        <div className="bg-white rounded-lg shadow p-8 mb-6">
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap text-gray-700">{feedback}</pre>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleStartOver}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try Another Job
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  )
}

