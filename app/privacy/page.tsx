import { Shield, Lock, Eye, Mail, Database, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Button3D from '@/components/Button3D'

export default function PrivacyPolicy() {
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
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 border border-stone-300/40 mb-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent mb-4">
              Privacy Policy
            </h1>
            <p className="text-stone-600 text-lg">
              How we protect and handle your personal information
            </p>
            <p className="text-stone-500 text-sm mt-2">
              Last updated: July 3, 2025
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-stone-800 mb-4 flex items-center gap-3">
              <Eye className="w-6 h-6 text-blue-600" />
              Overview
            </h2>
            <p className="text-stone-700 leading-relaxed mb-4">
              My Diary is committed to protecting your privacy. This policy explains how we collect, 
              use, and safeguard your personal information when you use our personal journaling service.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-blue-800 text-sm font-medium">
                <strong>Our Promise:</strong> Your diary entries are private and belong to you. 
                We never share, sell, or use your personal content for any purpose other than providing you with the service.
              </p>
            </div>
          </div>

          {/* Data Collection */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-stone-800 mb-4 flex items-center gap-3">
              <Database className="w-6 h-6 text-green-600" />
              Information We Collect
            </h2>
            
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="font-semibold text-green-800 mb-2">Account Information</h3>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Email address (for authentication only)</li>
                  <li>• Account creation and last login timestamps</li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <h3 className="font-semibold text-amber-800 mb-2">Diary Content</h3>
                <ul className="text-amber-700 text-sm space-y-1">
                  <li>• Your diary entries (title, content, mood)</li>
                  <li>• Entry creation and modification dates</li>
                  <li>• Only stored to provide you with the journaling service</li>
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <h3 className="font-semibold text-purple-800 mb-2">Technical Information</h3>
                <ul className="text-purple-700 text-sm space-y-1">
                  <li>• Session tokens (for keeping you logged in)</li>
                  <li>• Basic error logs (for service improvement)</li>
                  <li>• No tracking cookies or analytics</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Data */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-stone-800 mb-4 flex items-center gap-3">
              <Lock className="w-6 h-6 text-amber-600" />
              How We Use Your Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-6">
                <h3 className="font-semibold text-stone-800 mb-3">✅ What We Do</h3>
                <ul className="text-stone-700 text-sm space-y-2">
                  <li>• Store your diary entries securely</li>
                  <li>• Send authentication emails</li>
                  <li>• Provide you access to your content</li>
                  <li>• Maintain service functionality</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="font-semibold text-red-800 mb-3">❌ What We Never Do</h3>
                <ul className="text-red-700 text-sm space-y-2">
                  <li>• Read or analyze your diary content</li>
                  <li>• Share your data with third parties</li>
                  <li>• Use your content for advertising</li>
                  <li>• Sell your personal information</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-stone-800 mb-4 flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-600" />
              Data Security
            </h2>
            
            <p className="text-stone-700 leading-relaxed mb-6">
              We implement industry-standard security measures to protect your information:
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                <Lock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-blue-800 text-sm">Encryption</h4>
                <p className="text-blue-700 text-xs mt-1">Data encrypted in transit and at rest</p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <Mail className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-green-800 text-sm">Passwordless</h4>
                <p className="text-green-700 text-xs mt-1">Secure email-based authentication</p>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
                <Database className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold text-purple-800 text-sm">Secure Storage</h4>
                <p className="text-purple-700 text-xs mt-1">Protected database infrastructure</p>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-stone-800 mb-4 flex items-center gap-3">
              <Trash2 className="w-6 h-6 text-red-600" />
              Your Rights
            </h2>
            
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-6">
              <p className="text-stone-700 leading-relaxed mb-4">
                You have complete control over your data:
              </p>
              <ul className="text-stone-700 space-y-2">
                <li>• <strong>Access:</strong> View all your stored data through your dashboard</li>
                <li>• <strong>Edit:</strong> Modify or update your diary entries at any time</li>
                <li>• <strong>Delete:</strong> Remove individual entries or your entire account</li>
                <li>• <strong>Export:</strong> Request a copy of your data (contact us)</li>
              </ul>
            </div>
          </div>

          {/* Data Retention */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-stone-800 mb-4">Data Retention</h2>
            <p className="text-stone-700 leading-relaxed mb-4">
              Your data is kept only as long as you maintain an active account. When you delete your account:
            </p>
            <ul className="text-stone-700 space-y-2 ml-6">
              <li>• All diary entries are permanently deleted within 30 days</li>
              <li>• Account information is removed from our systems</li>
              <li>• Backups are overwritten according to our retention schedule</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-stone-800 mb-4">Contact Us</h2>
            <p className="text-stone-700 leading-relaxed mb-4">
              If you have questions about this privacy policy or your data, please contact us:
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-amber-800 font-medium">
                Email: <a href="mailto:private@konja-rehm.de" className="underline hover:text-amber-900">private@konja-rehm.de</a>
              </p>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center pt-8 border-t border-stone-200">
            <Link href="/">
              <Button3D
                variant="secondary"
                size="md"
              >
                <Shield className="w-5 h-5" />
                Back to Home
              </Button3D>
            </Link>
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
