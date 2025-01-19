import { useEffect, useState } from 'react'

interface Application {
  id: string
  companyName: string
  description: string
}

export default function Applications() {
  const [applications, setApplications] = useState<Application[]>([])

  useEffect(() => {
    // For now, let's just show some static data to verify the component works
    setApplications([
      {
        id: '1',
        companyName: 'Test Company',
        description: 'Test Description'
      }
    ])
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Startup Applications</h1>
      <div className="space-y-4">
        {applications.map(app => (
          <div key={app.id} className="border p-4 rounded">
            <h2 className="font-bold">{app.companyName}</h2>
            <p>{app.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
} 