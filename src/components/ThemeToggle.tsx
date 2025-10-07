'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [isDarkMode, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const theme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (theme === 'dark' || (!theme && prefersDark)) {
      setIsDark(true)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDark(newTheme)
    
    if (newTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  if (!mounted) {
    return <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700" />
  }

  return (
    <button
      onClick={toggleTheme}
      className="
        p-2
        rounded-lg
        bg-gray-200
        dark:bg-gray-700
        hover:bg-gray-300
        dark:hover:bg-gray-600
        transition-colors
        duration-200
      "
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun size={20} className="text-yellow-400" />
      ) : (
        <Moon size={20} className="text-gray-700" />
      )}
    </button>
  )
}