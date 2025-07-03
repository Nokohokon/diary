'use client'

import { useState } from 'react'
import { X, Heart, Smile, Meh, Frown } from 'lucide-react'
import Button3D from '@/components/Button3D'

interface NewEntryFormProps {
  onSubmit: (data: { title: string; content: string; mood: string }) => void
  onCancel: () => void
  isLoading: boolean
}

const moods = [
  { value: 'happy', label: 'Happy', icon: Smile, color: 'text-yellow-500' },
  { value: 'neutral', label: 'Neutral', icon: Meh, color: 'text-gray-500' },
  { value: 'sad', label: 'Sad', icon: Frown, color: 'text-blue-500' },
]

export default function NewEntryForm({ onSubmit, onCancel, isLoading }: NewEntryFormProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mood, setMood] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim() && content.trim()) {
      onSubmit({ title: title.trim(), content: content.trim(), mood })
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-stone-200/30">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-stone-800">
          New Entry
        </h2>
        <Button3D
          onClick={onCancel}
          variant="ghost"
          size="sm"
          icon={X}
          className="!p-2 !rounded-full"
        >
          {/* Kein Text für den X-Button */}
        </Button3D>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-stone-800 mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent outline-none transition-all duration-200"
            placeholder="How was your day?"
          />
        </div>

        <div>
          <label htmlFor="mood" className="block text-sm font-medium text-stone-800 mb-2">
            Mood
          </label>
          <div className="flex gap-2">
            {moods.map((moodOption) => {
              const Icon = moodOption.icon
              const isSelected = mood === moodOption.value
              return (
                <Button3D
                  key={moodOption.value}
                  type="button"
                  onClick={() => setMood(moodOption.value)}
                  variant={isSelected ? "success" : "ghost"}
                  size="sm"
                  icon={Icon}
                  className={`${isSelected ? 'ring-2 ring-stone-300' : ''}`}
                >
                  {moodOption.label}
                </Button3D>
              )
            })}
          </div>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-stone-800 mb-2">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={6}
            className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
            placeholder="Tell us about your day..."
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button3D
            type="submit"
            disabled={isLoading || !title.trim() || !content.trim()}
            variant="success"
            size="md"
            icon={Heart}
            isLoading={isLoading}
            className="flex-1"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </Button3D>
          <Button3D
            type="button"
            onClick={onCancel}
            variant="ghost"
            size="md"
          >
            Cancel
          </Button3D>
        </div>
      </form>
    </div>
  )
}
