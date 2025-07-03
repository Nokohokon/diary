import { Mail, CheckCircle, BookOpen } from 'lucide-react'
import Link from 'next/link'

export default function VerifyRequest() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4"
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
      <div className="max-w-md w-full">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-stone-200/30 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-2xl font-bold text-stone-800 mb-4">
            Email sent! ✨
          </h1>
          
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <Mail className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-green-800 text-sm">
              We&apos;ve sent a magic link to your email address.
            </p>
          </div>
          
          <div className="space-y-4 text-stone-600 text-sm">
            <p>
              Click the link in the email to sign in.
            </p>
            <p>
              <strong>Tip:</strong> Check your spam folder too!
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-stone-200">
            <Link 
              href="/auth/signin"
              className="inline-flex items-center text-stone-700 hover:text-stone-800 font-medium transition-colors"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
