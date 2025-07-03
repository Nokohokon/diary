'use client'

import { useState, Suspense } from 'react'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { Mail, Heart, BookOpen } from 'lucide-react'
import Button3D from '@/components/Button3D'

function SignInForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const result = await signIn('email', {
        email,
        callbackUrl,
        redirect: false,
      })

      if (result?.error) {
        setMessage('Error sending email. Please try again.')
      } else {
        setMessage('✨ Check your email for the magic link!')
      }
    } catch {
      setMessage('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
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
      <div className="max-w-md w-full">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-stone-300/40">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent mb-2">
              My Diary
            </h1>
            <p className="text-amber-800">
              Sign in to capture your thoughts
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-amber-800 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-200 bg-white/50"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <Button3D
              type="submit"
              disabled={isLoading}
              variant="primary"
              size="lg"
              icon={Heart}
              isLoading={isLoading}
              className="w-full"
            >
              {isLoading ? 'Sending...' : 'Send Magic Link'}
            </Button3D>

            {message && (
              <div className={`text-center p-3 rounded-lg ${
                message.includes('✨') 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {message}
              </div>
            )}
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-stone-600">
              No passwords needed! We&apos;ll send you a secure link via email.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SignIn() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-700"></div>
      </div>
    }>
      <SignInForm />
    </Suspense>
  )
}
