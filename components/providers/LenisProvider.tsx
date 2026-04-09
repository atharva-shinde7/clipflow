'use client'

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins once globally
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface LenisProviderProps {
  children: React.ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,            // Scroll duration multiplier
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo ease out
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenisRef.current = lenis

    // Connect Lenis with GSAP ScrollTrigger
    // This ensures scroll-triggered animations fire at the correct Lenis scroll position
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP ticker to drive Lenis RAF loop
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // Prevent GSAP from creating its own RAF loop (Lenis handles it)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000)
      })
    }
  }, [])

  return <>{children}</>
}
