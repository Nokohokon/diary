import { Mail, CheckCircle, BookOpen } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function VerifyRequest() {
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
      {/* Navbar */}
      <Navbar />

      <div className="flex items-center justify-center p-4" style={{ minHeight: 'calc(100vh - 160px)' }}>
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

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-stone-200/30">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-stone-600">
              © 2025 Konja Rehm
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://konja-rehm.de/impressum"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-sm font-medium bg-gradient-to-b from-stone-50 via-stone-100 to-stone-200 hover:from-stone-100 hover:via-stone-200 hover:to-stone-300 text-stone-700 border border-stone-300 rounded-md shadow-[0_2px_0_0_rgb(120,113,108)] hover:shadow-[0_1px_0_0_rgb(120,113,108)] active:shadow-[0_0px_0_0_rgb(120,113,108)] transition-all duration-200 ease-out transform hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-400 select-none"
              >
                Imprint
              </a>
              <Link
                href="/privacy"
                className="px-3 py-2 text-sm font-medium bg-gradient-to-b from-stone-50 via-stone-100 to-stone-200 hover:from-stone-100 hover:via-stone-200 hover:to-stone-300 text-stone-700 border border-stone-300 rounded-md shadow-[0_2px_0_0_rgb(120,113,108)] hover:shadow-[0_1px_0_0_rgb(120,113,108)] active:shadow-[0_0px_0_0_rgb(120,113,108)] transition-all duration-200 ease-out transform hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-400 select-none"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
