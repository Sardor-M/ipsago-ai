'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function UploadPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return
    
    setLoading(true)
    const userId = localStorage.getItem('userId')
    
    if (!userId) {
      router.push('/')
      return
    }

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('userId', userId)

      const res = await fetch('/api/resume/upload', {
        method: 'POST',
        body: formData
      })

      if (res.ok) {
        router.push('/jobs')
      } else {
        console.error('Upload failed')
        setLoading(false)
      }
    } catch (error) {
      console.error('Error:', error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-3xl font-bold text-center">Upload Resume</h2>
          <p className="mt-2 text-center text-gray-600">
            Upload your resume to get job recommendations
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !file}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Uploading...' : 'Upload Resume'}
          </button>
        </form>
      </div>
    </div>
  )
}

