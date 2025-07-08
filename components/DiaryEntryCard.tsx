'use client'

import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { Calendar, Edit3, Trash2, Smile, Meh, Frown, Pin } from 'lucide-react'
import Button3D from '@/components/Button3D'
import { formatFileSize } from '@/lib/imageUtils'

interface DiaryEntry {
  id: string
  title: string
  content: string
  mood?: string
  createdAt: string
  updatedAt: string
  imageData?: Buffer | null
  imageName?: string | null
  imageType?: string | null
  imageSize?: number | null
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
      
      {/* Image display */}
      {entry.imageData && (
        <div className="mt-6 mb-4 relative">
          {/* Pinned image container */}
          <div className="relative inline-block group/image">
            {/* Pin/Thumbtack with fly-in animation */}
            <div className="absolute -top-3 -right-2 z-10 transform rotate-12 transition-all duration-300 group-hover/image:rotate-6 group-hover/image:scale-110 animate-[flyInPin_0.8s_ease-out_0.3s_both]">
              <div className="relative">
                {/* Pin shadow */}
                <div className="absolute top-1 left-1 w-6 h-6 bg-gray-400/30 rounded-full blur-sm"></div>
                {/* Pin */}
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-red-400">
                  <Pin className="w-3 h-3 text-white transform rotate-45" />
                </div>
              </div>
            </div>
            
            {/* Image with pinned effect and fly-in animation */}
            <div className="transform -rotate-2 hover:rotate-0 transition-all duration-500 ease-out animate-[flyInImage_0.8s_ease-out_0.1s_both]">
              <img
                src={`/api/diary/${entry.id}/image`}
                alt={entry.imageName || 'Diary image'}
                className="w-full max-w-md mx-auto rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border-4 border-white"
                style={{
                  filter: 'drop-shadow(4px 6px 12px rgba(0,0,0,0.15))'
                }}
                onClick={() => {
                  // Open image in new tab for full size view
                  window.open(`/api/diary/${entry.id}/image`, '_blank')
                }}
              />
            </div>
            
            {/* Image info with pinned styling and delayed fade-in */}
            {entry.imageName && (
              <div className="transform -rotate-1 mt-2 animate-[fadeInUp_0.6s_ease-out_0.8s_both]">
                <p className="text-xs text-stone-500 text-center bg-yellow-50 inline-block px-2 py-1 rounded shadow-sm border border-yellow-200">
                  {entry.imageName} ({entry.imageSize ? formatFileSize(entry.imageSize) : ''})
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      
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
