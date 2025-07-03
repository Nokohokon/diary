'use client'

import { useSession } from 'next-auth/react'
import { BookOpen, Heart, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Button3D from '@/components/Button3D'
import Dashboard from '@/components/Dashboard'

export default function Home() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{backgroundColor: '#F5F3F0'}}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-600"></div>
      </div>
    )
  }

  if (session) {
    return <Dashboard />
  }

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundColor: '#F5F3F0',
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(210, 190, 170, 0.08) 0%, transparent 40%),
          radial-gradient(circle at 80% 70%, rgba(190, 175, 160, 0.06) 0%, transparent 35%),
          radial-gradient(circle at 40% 80%, rgba(200, 185, 170, 0.05) 0%, transparent 30%),
          linear-gradient(45deg, rgba(210, 195, 180, 0.02) 0%, transparent 100%),
          repeating-linear-gradient(
            0deg,
            transparent 0px,
            transparent 2px,
            rgba(200, 185, 170, 0.015) 2px,
            rgba(200, 185, 170, 0.015) 3px
          ),
          repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 2px,
            rgba(210, 195, 180, 0.015) 2px,
            rgba(210, 195, 180, 0.015) 3px
          )
        `
      }}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-stone-100 to-stone-200 rounded-3xl mb-8 shadow-lg border border-stone-300">
              <BookOpen className="w-10 h-10 text-stone-700" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-stone-700 to-stone-600 bg-clip-text text-transparent mb-6">
              My Diary
            </h1>
            <p className="text-xl text-stone-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Capture your most precious moments, thoughts and experiences. 
              A safe space for your personal stories.
            </p>
            <Link href="/auth/signin">
              <Button3D
                variant="primary"
                size="lg"
                icon={Heart}
                className="inline-flex"
              >
                Get Started
              </Button3D>
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-stone-300/40 shadow-lg">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-200 to-blue-300 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Heart className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-3">Personal & Private</h3>
              <p className="text-stone-700">
                Your entries are visible only to you. Secure passwordless login via email.
              </p>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-stone-300/40 shadow-lg">
              <div className="w-14 h-14 bg-gradient-to-r from-green-200 to-green-300 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-3">Mood Tracking</h3>
              <p className="text-stone-700">
                Track your emotions and discover patterns in your wellbeing.
              </p>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-stone-300/40 shadow-lg">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-200 to-purple-300 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <BookOpen className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-3">Simple & Beautiful</h3>
              <p className="text-stone-700">
                Intuitive user interface with modern design for a pleasant writing experience.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 border border-stone-300/40 shadow-lg">
            <h2 className="text-2xl font-bold text-stone-800 mb-4">
              Ready to tell your story?
            </h2>
            <p className="text-stone-700 mb-6">
              Start writing today and discover the power of journaling.
            </p>
            <Link href="/auth/signin">
              <Button3D
                variant="secondary"
                size="md"
                icon={BookOpen}
              >
                Sign up for free
              </Button3D>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
