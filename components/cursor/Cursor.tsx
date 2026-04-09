'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only run on desktop (no touch devices)
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Use GSAP quickTo for ultra-smooth cursor tracking
    // quickTo creates an optimized setter that avoids re-parsing the property string
    const moveDot = gsap.quickTo([dot], 'css', { duration: 0.1, ease: 'none' })
    const moveRing = gsap.quickTo([ring], 'css', { duration: 0.35, ease: 'power2.out' })

    let mouseX = 0
    let mouseY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Move dot instantly (feels attached to pointer)
      gsap.set(dot, { x: mouseX, y: mouseY })

      // Ring follows with spring lag
      gsap.to(ring, {
        x: mouseX,
        y: mouseY,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    // Expand cursor ring when hovering interactive elements
    const onMouseEnter = () => document.body.classList.add('cursor-hover')
    const onMouseLeave = () => document.body.classList.remove('cursor-hover')

    // Hide cursors when mouse leaves window
    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        gsap.to([dot, ring], { opacity: 0, duration: 0.3 })
      }
    }
    const onMouseIn = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
    }

    // Attach listeners
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseout', onMouseOut)
    document.addEventListener('mouseover', onMouseIn)

    const interactives = document.querySelectorAll('a, button, [data-cursor]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter)
      el.addEventListener('mouseleave', onMouseLeave)
    })

    // Use MutationObserver to catch dynamically added interactive elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnter)
        el.addEventListener('mouseleave', onMouseLeave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseout', onMouseOut)
      document.removeEventListener('mouseover', onMouseIn)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
