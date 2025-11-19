'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function InterviewPage() {
  const router = useRouter()
  const [questions, setQuestions] = useState<string[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [transcript, setTranscript] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    const jobId = localStorage.getItem('selectedJobId')
    
    if (!userId || !jobId) {
      router.push('/jobs')
      return
    }

    fetch('/api/interview/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, jobId })
    })
      .then(res => res.json())
      .then(data => {
        setQuestions(data.questions || [])
        setLoading(false)
      })
      .catch(error => {
        console.error('Error:', error)
        setLoading(false)
      })
  }, [router])

  const handleStartRecording = () => {
    setIsRecording(true)
    // TODO: Implement Web Speech API or AssemblyAI
    // For now, just simulate recording
    setTimeout(() => {
      setTranscript("Sample transcript: This is a placeholder answer...")
      setIsRecording(false)
    }, 2000)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setTranscript('')
    } else {
      router.push('/feedback')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading interview questions...</p>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-6">{currentQuestion}</h2>
          
          <div className="mb-6">
            <button
              onClick={handleStartRecording}
              disabled={isRecording}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isRecording ? 'Recording...' : 'Start Recording'}
            </button>
          </div>

          {transcript && (
            <div className="mb-6 p-4 bg-gray-100 rounded">
              <p className="text-gray-700">{transcript}</p>
            </div>
          )}

          <button
            onClick={handleNextQuestion}
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Interview'}
          </button>
        </div>
      </div>
    </div>
  )
}

