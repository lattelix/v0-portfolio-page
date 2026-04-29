'use client'

import { useEffect, useRef, type CSSProperties } from 'react'

type SceneStyle = CSSProperties & {
  '--scene-x': string
  '--scene-y': string
}

export function LivingScene() {
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scene = sceneRef.current

    if (!scene) {
      return
    }

    let frame = 0

    const updatePointer = (event: PointerEvent) => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const x = event.clientX / window.innerWidth
        const y = event.clientY / window.innerHeight

        scene.style.setProperty('--scene-x', x.toFixed(3))
        scene.style.setProperty('--scene-y', y.toFixed(3))
      })
    }

    window.addEventListener('pointermove', updatePointer, { passive: true })

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', updatePointer)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="living-scene"
      ref={sceneRef}
      style={{ '--scene-x': '0.5', '--scene-y': '0.45' } as SceneStyle}
    >
      <div className="scene-layer scene-sky" />
      <div className="scene-layer scene-atmosphere" />
      <div className="scene-layer scene-grid" />
      <div className="scene-layer scene-far-ridge" />
      <div className="scene-layer scene-mid-ridge" />
      <div className="scene-layer scene-forest" />
      <div className="scene-layer scene-water" />
      <div className="scene-layer scene-signal scene-signal-a" />
      <div className="scene-layer scene-signal scene-signal-b" />
      <div className="scene-layer scene-code-rain" />
    </div>
  )
}
