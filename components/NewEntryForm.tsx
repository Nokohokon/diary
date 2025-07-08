'use client'

import { useState, useRef } from 'react'
import { X, Heart, Smile, Meh, Frown, Upload, Image, Trash2 } from 'lucide-react'
import Button3D from '@/components/Button3D'
import { compressImage, validateImageFile, formatFileSize } from '@/lib/imageUtils'

interface NewEntryFormProps {
  onSubmit: (formData: FormData) => void
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
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isProcessingImage, setIsProcessingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file
      const validation = validateImageFile(file)
      if (!validation.valid) {
        alert(validation.error)
        return
      }

      setIsProcessingImage(true)

      try {
        // Compress image if it's larger than 1MB
        let processedFile = file
        if (file.size > 1024 * 1024) {
          processedFile = await compressImage(file, 1200, 0.8)
        }

        setSelectedImage(processedFile)
        
        // Create preview
        const reader = new FileReader()
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string)
        }
        reader.readAsDataURL(processedFile)
      } catch (error) {
        console.error('Error processing image:', error)
        alert('Fehler beim Verarbeiten des Bildes')
      } finally {
        setIsProcessingImage(false)
      }
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    setIsProcessingImage(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim() && content.trim()) {
      const formData = new FormData()
      formData.append('title', title.trim())
      formData.append('content', content.trim())
      formData.append('mood', mood)
      
      if (selectedImage) {
        formData.append('image', selectedImage)
      }
      
      onSubmit(formData)
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
            className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent outline-none transition-all duration-200 text-gray-500"
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
            className="w-full text-gray-500 px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
            placeholder="Tell us about your day..."
          />
        </div>

        {/* Image Upload Section */}
        <div>
          <label className="block text-sm font-medium text-stone-800 mb-2">
            Bild hinzufügen (optional)
          </label>
          
          {!selectedImage && !isProcessingImage ? (
            <div className="border-2 border-dashed border-stone-300 rounded-lg p-6 text-center hover:border-stone-400 transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer"
              >
                <Image className="w-12 h-12 text-stone-400 mx-auto mb-3" />
                <p className="text-stone-600 mb-2">Klicken Sie hier, um ein Bild hinzuzufügen</p>
                <p className="text-stone-500 text-sm">JPEG, PNG, GIF, WebP (max. 5MB)</p>
              </label>
            </div>
          ) : isProcessingImage ? (
            <div className="border-2 border-dashed border-stone-300 rounded-lg p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-400 mx-auto mb-3"></div>
              <p className="text-stone-600">Bild wird verarbeitet...</p>
            </div>
          ) : (
            <div className="relative">
              <div className="border border-stone-200 rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={imagePreview!}
                    alt="Vorschau"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-stone-800">{selectedImage?.name}</p>
                    <p className="text-stone-500 text-sm">
                      {selectedImage ? formatFileSize(selectedImage.size) : ''}
                    </p>
                  </div>
                  <Button3D
                    type="button"
                    onClick={removeImage}
                    variant="ghost"
                    size="sm"
                    icon={Trash2}
                    className="!p-2 text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button3D>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <Button3D
            type="submit"
            disabled={isLoading || isProcessingImage || !title.trim() || !content.trim()}
            variant="success"
            size="md"
            icon={Heart}
            isLoading={isLoading}
            className="flex-1"
          >
            {isLoading ? 'Saving...' : isProcessingImage ? 'Verarbeite Bild...' : 'Save'}
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
