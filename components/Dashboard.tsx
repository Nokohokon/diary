'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Plus, BookOpen, LogOut, Search } from 'lucide-react'
import NewEntryForm from '@/components/NewEntryForm'
import DiaryEntryCard from '@/components/DiaryEntryCard'
import Button3D from '@/components/Button3D'

interface DiaryEntry {
  id: string
  title: string
  content: string
  mood?: string
  createdAt: string
  updatedAt: string
}

export default function Dashboard() {
  const { data: session } = useSession()
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [showNewEntryForm, setShowNewEntryForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [moodFilter, setMoodFilter] = useState('')

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/diary')
      if (response.ok) {
        const data = await response.json()
        setEntries(data)
      }
    } catch (error) {
      console.error('Error fetching entries:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitEntry = async (data: { title: string; content: string; mood: string }) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/diary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const newEntry = await response.json()
        setEntries([newEntry, ...entries])
        setShowNewEntryForm(false)
      } else {
        console.error('Error creating entry')
      }
    } catch (error) {
      console.error('Error submitting entry:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteEntry = async (id: string) => {
    if (!confirm('Do you really want to delete this entry?')) return

    try {
      const response = await fetch(`/api/diary/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setEntries(entries.filter(entry => entry.id !== id))
      }
    } catch (error) {
      console.error('Error deleting entry:', error)
    }
  }

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMood = !moodFilter || entry.mood === moodFilter
    return matchesSearch && matchesMood
  })

  if (isLoading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: '#F4F1E8',
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(139, 128, 109, 0.05) 0%, transparent 35%),
            radial-gradient(circle at 75% 75%, rgba(160, 147, 128, 0.04) 0%, transparent 40%),
            radial-gradient(circle at 50% 10%, rgba(121, 113, 99, 0.03) 0%, transparent 30%),
            radial-gradient(circle at 10% 80%, rgba(138, 127, 112, 0.04) 0%, transparent 35%),
            linear-gradient(135deg, rgba(139, 128, 109, 0.02) 0%, transparent 50%),
            repeating-linear-gradient(
              45deg,
              rgba(139, 128, 109, 0.01) 0px,
              rgba(139, 128, 109, 0.01) 1px,
              transparent 1px,
              transparent 40px
            ),
            repeating-linear-gradient(
              -45deg,
              rgba(160, 147, 128, 0.01) 0px,
              rgba(160, 147, 128, 0.01) 1px,
              transparent 1px,
              transparent 60px
            )
          `
        }}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-700"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen"
      style={{
        backgroundColor: '#F5F3F0',
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(139, 129, 118, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(168, 162, 158, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 113, 108, 0.02) 0%, transparent 50%),
          repeating-linear-gradient(45deg, transparent 0px, transparent 2px, rgba(139, 129, 118, 0.01) 2px, rgba(139, 129, 118, 0.01) 4px),
          repeating-linear-gradient(-45deg, transparent 0px, transparent 2px, rgba(168, 162, 158, 0.01) 2px, rgba(168, 162, 158, 0.01) 4px)
        `
      }}
    >
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-stone-200/30 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-stone-500 to-stone-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-stone-800">
                  My Diary
                </h1>
                <p className="text-sm text-stone-600">
                  Welcome back, {session?.user?.name || session?.user?.email}!
                </p>
              </div>
            </div>
            <Button3D
              onClick={() => signOut()}
              variant="ghost"
              size="sm"
              icon={LogOut}
              className="text-amber-700 hover:text-amber-800"
            >
              Sign Out
            </Button3D>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-5 h-5" />
              <input
                type="text"
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/90 border border-amber-200/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>
            <select
              value={moodFilter}
              onChange={(e) => setMoodFilter(e.target.value)}
              className="px-4 py-3 bg-white/90 border border-amber-200/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-200"
            >
              <option value="">All Moods</option>
              <option value="happy">Happy</option>
              <option value="neutral">Neutral</option>
              <option value="sad">Sad</option>
            </select>
          </div>
          <Button3D
            onClick={() => setShowNewEntryForm(true)}
            variant="primary"
            size="md"
            icon={Plus}
          >
            New Entry
          </Button3D>
        </div>

        {/* New Entry Form */}
        {showNewEntryForm && (
          <div className="mb-8">
            <NewEntryForm
              onSubmit={handleSubmitEntry}
              onCancel={() => setShowNewEntryForm(false)}
              isLoading={isSubmitting}
            />
          </div>
        )}

        {/* Entries Grid */}
        {filteredEntries.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-amber-700 mb-2">
              {entries.length === 0 ? 'No entries yet' : 'No entries found'}
            </h3>
            <p className="text-amber-600 mb-6">
              {entries.length === 0 
                ? 'Create your first diary entry!' 
                : 'Try different search terms or filters.'
              }
            </p>
            {entries.length === 0 && (
              <Button3D
                onClick={() => setShowNewEntryForm(true)}
                variant="success"
                size="lg"
                icon={Plus}
              >
                Create First Entry
              </Button3D>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEntries.map((entry) => (
              <DiaryEntryCard
                key={entry.id}
                entry={entry}
                onDelete={handleDeleteEntry}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
