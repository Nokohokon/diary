'use client'

import { BookOpen, LogIn } from 'lucide-react'
import Link from 'next/link'
import Button3D from '@/components/Button3D'

export default function Navbar() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-stone-200/30 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-r from-stone-500 to-stone-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-stone-800">
                My Diary
              </h1>
              <p className="text-sm text-stone-600">
                Your personal journal
              </p>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/auth/signin">
              <Button3D
                variant="primary"
                size="sm"
                icon={LogIn}
              >
                Sign In
              </Button3D>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
