'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

interface Button3DProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  icon?: LucideIcon
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const variants = {
  primary: {
    base: 'bg-gradient-to-b from-amber-100 via-amber-200 to-amber-300 hover:from-amber-200 hover:via-amber-300 hover:to-amber-400 text-amber-900 border border-amber-300',
    shadow: 'shadow-[0_4px_0_0_rgb(180,131,69)] hover:shadow-[0_2px_0_0_rgb(180,131,69)] active:shadow-[0_1px_0_0_rgb(180,131,69)]',
    active: 'active:translate-y-1'
  },
  secondary: {
    base: 'bg-gradient-to-b from-slate-100 via-slate-200 to-slate-300 hover:from-slate-200 hover:via-slate-300 hover:to-slate-400 text-slate-800 border border-slate-300',
    shadow: 'shadow-[0_4px_0_0_rgb(100,116,139)] hover:shadow-[0_2px_0_0_rgb(100,116,139)] active:shadow-[0_1px_0_0_rgb(100,116,139)]',
    active: 'active:translate-y-1'
  },
  success: {
    base: 'bg-gradient-to-b from-green-100 via-green-200 to-green-300 hover:from-green-200 hover:via-green-300 hover:to-green-400 text-green-800 border border-green-300',
    shadow: 'shadow-[0_4px_0_0_rgb(34,107,74)] hover:shadow-[0_2px_0_0_rgb(34,107,74)] active:shadow-[0_1px_0_0_rgb(34,107,74)]',
    active: 'active:translate-y-1'
  },
  danger: {
    base: 'bg-gradient-to-b from-red-100 via-red-200 to-red-300 hover:from-red-200 hover:via-red-300 hover:to-red-400 text-red-800 border border-red-300',
    shadow: 'shadow-[0_4px_0_0_rgb(153,27,27)] hover:shadow-[0_2px_0_0_rgb(153,27,27)] active:shadow-[0_1px_0_0_rgb(153,27,27)]',
    active: 'active:translate-y-1'
  },
  ghost: {
    base: 'bg-gradient-to-b from-stone-50 via-stone-100 to-stone-200 hover:from-stone-100 hover:via-stone-200 hover:to-stone-300 text-stone-700 border border-stone-300',
    shadow: 'shadow-[0_3px_0_0_rgb(120,113,108)] hover:shadow-[0_1px_0_0_rgb(120,113,108)] active:shadow-[0_0px_0_0_rgb(120,113,108)]',
    active: 'active:translate-y-1'
  }
}

const sizes = {
  sm: 'px-3 py-2 text-sm rounded-md',
  md: 'px-4 py-3 text-base rounded-lg',
  lg: 'px-6 py-4 text-lg rounded-xl'
}

export default function Button3D({ 
  children, 
  icon: Icon, 
  variant = 'primary', 
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props 
}: Button3DProps) {
  const variantStyles = variants[variant]
  const sizeStyles = sizes[size]
  
  const isDisabled = disabled || isLoading

  return (
    <button
      className={`
        ${variantStyles.base}
        ${variantStyles.shadow}
        ${sizeStyles}
        font-semibold
        transition-all 
        duration-200 
        ease-out
        transform
        ${!isDisabled ? variantStyles.active : ''}
        ${!isDisabled ? 'hover:-translate-y-0.5' : ''}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-amber-400
        select-none
        relative
        ${className}
      `}
      disabled={isDisabled}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {Icon && <Icon className="w-5 h-5" />}
            {children && <span>{children}</span>}
          </>
        )}
      </div>
    </button>
  )
}
