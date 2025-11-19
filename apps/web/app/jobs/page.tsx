'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Job {
  id: string
  title: string
  company: string
  description: string
  department?: string
}

export default function JobsPage() {
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (!userId) {
      router.push('/')
      return
    }

    fetch('/api/jobs/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    })
      .then(res => res.json())
      .then(data => {
        setJobs(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error:', error)
        setLoading(false)
      })
  }, [router])

  const handleSelectJob = (jobId: string) => {
    localStorage.setItem('selectedJobId', jobId)
    router.push('/interview')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading jobs...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Job Recommendations</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          {jobs.map((job) => (
            <div
              key={job.id}
              onClick={() => handleSelectJob(job.id)}
              className="p-6 bg-white rounded-lg shadow cursor-pointer hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
              <p className="text-gray-600 mb-2">{job.company}</p>
              {job.department && (
                <p className="text-sm text-gray-500 mb-4">{job.department}</p>
              )}
              <p className="text-gray-700 line-clamp-3">{job.description}</p>
            </div>
          ))}
        </div>

        {jobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No jobs available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}

