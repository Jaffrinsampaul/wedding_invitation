'use client'

import { useEffect } from 'react'

/**
 * Observes elements with `data-reveal` and marks them as revealed when they
 * enter the viewport.
 *
 * Sets both `data-revealed="true"` and the `.is-revealed` CSS class.
 * Since React reconciles `className` from props on re-render, the data-attribute
 * `data-revealed="true"` ensures the element remains permanently visible even
 * when interactive state changes re-render the component.
 */
export function useScrollReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')

    if (prefersReducedMotion) {
      elements.forEach((el) => {
        el.dataset.revealed = 'true'
        el.classList.add('is-revealed')
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const delay = el.dataset.revealDelay || '0'
            el.style.transitionDelay = `${delay}ms`

            requestAnimationFrame(() => {
              el.dataset.revealed = 'true'
              el.classList.add('is-revealed')
            })

            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' },
    )

    elements.forEach((el) => {
      if (el.dataset.revealed === 'true' || el.classList.contains('is-revealed')) {
        el.dataset.revealed = 'true'
        el.classList.add('is-revealed')
        return
      }
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])
}
