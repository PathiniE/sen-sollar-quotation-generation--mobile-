"use client"

import { useState, useEffect } from 'react'

export default function MobileOnly({ children }) {
  const [isMobile, setIsMobile] = useState(true)
  
  useEffect(() => {
    // Check if window width is greater than 768px (standard tablet breakpoint)
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    // Check on initial load
    checkIfMobile()
    
    // Listen for window resize events
    window.addEventListener('resize', checkIfMobile)
    
    // Clean up event listener
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])
  
  if (!isMobile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
          <h1 className="text-2xl font-bold mb-4">Mobile Version Only</h1>
          <p className="text-gray-600 mb-6">
            This application is optimized for mobile devices only. Please access it from a mobile device or resize your browser window to a smaller width.
          </p>
          <div className="w-full max-w-xs mx-auto">
            <div className="border-2 border-gray-300 rounded-lg p-4 flex items-center justify-center">
              <div className="w-32 h-64 bg-gray-200 rounded-lg flex items-center justify-center text-sm text-gray-500">
                Mobile Preview
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return children
}