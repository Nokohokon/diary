'use client'

import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { Calendar, Edit3, Trash2, Smile, Meh, Frown } from 'lucide-react'
import Button3D from '@/components/Button3D'

interface DiaryEntry {
  id: string
  title: string
  content: string
  mood?: string
  createdAt: string
  updatedAt: string
}

interface DiaryEntryCardProps {
  entry: DiaryEntry
  onEdit?: (entry: DiaryEntry) => void
  onDelete?: (id: string) => void
}

const getMoodIcon = (mood?: string) => {
  switch (mood) {
    case 'happy':
      return { icon: Smile, color: 'text-yellow-500', label: 'Happy' }
    case 'sad':
      return { icon: Frown, color: 'text-blue-500', label: 'Sad' }
    case 'neutral':
      return { icon: Meh, color: 'text-gray-500', label: 'Neutral' }
    default:
      return null
  }
}

export default function DiaryEntryCard({ entry, onEdit, onDelete }: DiaryEntryCardProps) {
  const moodInfo = getMoodIcon(entry.mood)
  const MoodIcon = moodInfo?.icon

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-stone-200/30 hover:shadow-xl transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-stone-800 mb-2 group-hover:text-stone-700 transition-colors">
            {entry.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-stone-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {format(new Date(entry.createdAt), 'MMM dd, yyyy', { locale: enUS })}
            </div>
            {moodInfo && MoodIcon && (
              <div className="flex items-center gap-1">
                <MoodIcon className={`w-4 h-4 ${moodInfo.color}`} />
                <span>{moodInfo.label}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <Button3D
              onClick={() => onEdit(entry)}
              variant="secondary"
              size="sm"
              icon={Edit3}
              className="!p-2 !rounded-full text-stone-700"
              title="Edit"
            >
              {/* Nur Icon */}
            </Button3D>
          )}
          {onDelete && (
            <Button3D
              onClick={() => onDelete(entry.id)}
              variant="danger"
              size="sm"
              icon={Trash2}
              className="!p-2 !rounded-full"
              title="Delete"
            >
              {/* Nur Icon */}
            </Button3D>
          )}
        </div>
      </div>
      
      <div className="prose prose-sm max-w-none">
        <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">
          {entry.content}
        </p>
      </div>
      
      {entry.updatedAt !== entry.createdAt && (
        <div className="mt-4 pt-3 border-t border-stone-200">
          <p className="text-xs text-stone-500">
            Last edited: {format(new Date(entry.updatedAt), 'MM/dd/yyyy HH:mm', { locale: enUS })}
          </p>
        </div>
      )}
    </div>
  )
}
