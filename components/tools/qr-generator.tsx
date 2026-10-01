'use client'

import Script from 'next/script'
import { Download, ImagePlus, QrCode, RotateCcw, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

type DotStyle = 'square' | 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'extra-rounded'
type CornerStyle = 'square' | 'dot' | 'rounded' | 'extra-rounded'
type ErrorLevel = 'L' | 'M' | 'Q' | 'H'
type ExportSize = 512 | 1024 | 2048

type QrInstance = {
  append: (element: HTMLElement) => void
  update: (options: Record<string, unknown>) => void
  download: (options: { name: string; extension: 'png' | 'svg' }) => Promise<void> | void
}

declare global {
  interface Window {
    QRCodeStyling?: new (options: Record<string, unknown>) => QrInstance
  }
}

const presets = [
  { label: 'Classic', dots: 'square' as DotStyle, corners: 'square' as CornerStyle },
  { label: 'Soft', dots: 'rounded' as DotStyle, corners: 'extra-rounded' as CornerStyle },
  { label: 'Dots', dots: 'dots' as DotStyle, corners: 'dot' as CornerStyle },
]

export function QrGenerator() {
  const [data, setData] = useState('https://lattelix.ru')
  const [dots, setDots] = useState<DotStyle>('rounded')
  const [corners, setCorners] = useState<CornerStyle>('extra-rounded')
  const [foreground, setForeground] = useState('#111827')
  const [background, setBackground] = useState('#ffffff')
  const [errorLevel, setErrorLevel] = useState<ErrorLevel>('Q')
  const [size, setSize] = useState<ExportSize>(1024)
  const [margin, setMargin] = useState(32)
  const [logo, setLogo] = useState<string>()
  const [logoSize, setLogoSize] = useState(0.3)
  const [engineReady, setEngineReady] = useState(false)
  const [engineError, setEngineError] = useState(false)

  const canvasRef = useRef<HTMLDivElement>(null)
  const qrRef = useRef<QrInstance | null>(null)

  const options = useMemo<Record<string, unknown>>(
    () => ({
      width: size,
      height: size,
      type: 'svg',
      data: data.trim() || ' ',
      margin,
      qrOptions: {
        errorCorrectionLevel: errorLevel,
      },
      dotsOptions: {
        color: foreground,
        type: dots,
      },
      cornersSquareOptions: {
        color: foreground,
        type: corners,
      },
      cornersDotOptions: {
        color: foreground,
        type: corners === 'square' ? 'square' : 'dot',
      },
      backgroundOptions: {
        color: background,
      },
      image: logo,
      imageOptions: {
        crossOrigin: 'anonymous',
        hideBackgroundDots: true,
        imageSize: logoSize,
        margin: 8,
      },
    }),
    [background, corners, data, dots, errorLevel, foreground, logo, logoSize, margin, size],
  )

  useEffect(() => {
    const QrEngine = window.QRCodeStyling
    const target = canvasRef.current

    if (!engineReady || !QrEngine || !target) return

    if (!qrRef.current) {
      target.innerHTML = ''
      qrRef.current = new QrEngine(options)
      qrRef.current.append(target)
      return
    }

    qrRef.current.update(options)
  }, [engineReady, options])

  function applyPreset(preset: (typeof presets)[number]) {
    setDots(preset.dots)
    setCorners(preset.corners)
  }

  function handleLogo(file?: File) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') setLogo(reader.result)
    }
    reader.readAsDataURL(file)
  }

  function reset() {
    setData('https://lattelix.ru')
    setDots('rounded')
    setCorners('extra-rounded')
    setForeground('#111827')
    setBackground('#ffffff')
    setErrorLevel('Q')
    setSize(1024)
    setMargin(32)
    setLogo(undefined)
    setLogoSize(0.3)
  }

  function download(extension: 'png' | 'svg') {
    qrRef.current?.download({
      name: 'qr-code',
      extension,
    })
  }

  return (
    <div className="tool-shell">
      <Script
        id="qr-code-styling"
        onError={() => setEngineError(true)}
        onReady={() => setEngineReady(true)}
        src="https://cdn.jsdelivr.net/npm/qr-code-styling@1.9.2/lib/qr-code-styling.js"
        strategy="afterInteractive"
      />

      <div className="tool-panel">
        <div className="tool-panel__heading">
          <div>
            <p>Content</p>
            <h2>Build the code</h2>
          </div>
          <button className="tool-icon-button" onClick={reset} title="Reset" type="button">
            <RotateCcw aria-hidden="true" size={17} />
          </button>
        </div>

        <label className="tool-control">
          <span>URL or text</span>
          <textarea
            onChange={(event) => setData(event.target.value)}
            placeholder="https://example.com"
            rows={3}
            value={data}
          />
        </label>

        <fieldset className="tool-fieldset">
          <legend>Preset</legend>
          <div className="tool-preset-list">
            {presets.map((preset) => {
              const active = preset.dots === dots && preset.corners === corners
              return (
                <button
                  aria-pressed={active}
                  data-active={active}
                  key={preset.label}
                  onClick={() => applyPreset(preset)}
                  type="button"
                >
                  {preset.label}
                </button>
              )
            })}
          </div>
        </fieldset>

        <div className="tool-control-grid">
          <label className="tool-control">
            <span>Module style</span>
            <select onChange={(event) => setDots(event.target.value as DotStyle)} value={dots}>
              <option value="square">Square</option>
              <option value="rounded">Rounded</option>
              <option value="dots">Dots</option>
              <option value="classy">Classy</option>
              <option value="classy-rounded">Classy rounded</option>
              <option value="extra-rounded">Extra rounded</option>
            </select>
          </label>

          <label className="tool-control">
            <span>Corner style</span>
            <select onChange={(event) => setCorners(event.target.value as CornerStyle)} value={corners}>
              <option value="square">Square</option>
              <option value="rounded">Rounded</option>
              <option value="extra-rounded">Extra rounded</option>
              <option value="dot">Dot</option>
            </select>
          </label>
        </div>

        <div className="tool-control-grid">
          <label className="tool-control">
            <span>Foreground</span>
            <span className="tool-color-control">
              <input
                aria-label="Foreground color"
                onChange={(event) => setForeground(event.target.value)}
                type="color"
                value={foreground}
              />
              <code>{foreground}</code>
            </span>
          </label>

          <label className="tool-control">
            <span>Background</span>
            <span className="tool-color-control">
              <input
                aria-label="Background color"
                onChange={(event) => setBackground(event.target.value)}
                type="color"
                value={background}
              />
              <code>{background}</code>
            </span>
          </label>
        </div>

        <div className="tool-control-grid">
          <label className="tool-control">
            <span>Error correction</span>
            <select onChange={(event) => setErrorLevel(event.target.value as ErrorLevel)} value={errorLevel}>
              <option value="L">L — 7%</option>
              <option value="M">M — 15%</option>
              <option value="Q">Q — 25%</option>
              <option value="H">H — 30%</option>
            </select>
          </label>

          <label className="tool-control">
            <span>Export size</span>
            <select onChange={(event) => setSize(Number(event.target.value) as ExportSize)} value={size}>
              <option value={512}>512 × 512</option>
              <option value={1024}>1024 × 1024</option>
              <option value={2048}>2048 × 2048</option>
            </select>
          </label>
        </div>

        <label className="tool-control tool-range-control">
          <span>
            Quiet zone <strong>{margin}px</strong>
          </span>
          <input
            max={96}
            min={0}
            onChange={(event) => setMargin(Number(event.target.value))}
            step={4}
            type="range"
            value={margin}
          />
        </label>

        <div className="tool-logo-row">
          <label className="tool-file-button">
            <ImagePlus aria-hidden="true" size={17} />
            {logo ? 'Replace logo' : 'Add logo'}
            <input
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              onChange={(event) => handleLogo(event.target.files?.[0])}
              type="file"
            />
          </label>

          {logo ? (
            <button className="tool-secondary-button" onClick={() => setLogo(undefined)} type="button">
              <Trash2 aria-hidden="true" size={16} />
              Remove
            </button>
          ) : null}
        </div>

        {logo ? (
          <label className="tool-control tool-range-control">
            <span>
              Logo size <strong>{Math.round(logoSize * 100)}%</strong>
            </span>
            <input
              max={0.45}
              min={0.16}
              onChange={(event) => setLogoSize(Number(event.target.value))}
              step={0.01}
              type="range"
              value={logoSize}
            />
          </label>
        ) : null}
      </div>

      <aside className="tool-preview">
        <div className="tool-preview__heading">
          <div>
            <p>Live preview</p>
            <strong>{engineError ? 'Engine unavailable' : engineReady ? 'Ready' : 'Loading engine…'}</strong>
          </div>
          <QrCode aria-hidden="true" size={25} strokeWidth={1.55} />
        </div>

        <div className="qr-stage">
          <div className="qr-canvas" ref={canvasRef} />
        </div>

        <div className="tool-downloads">
          <button disabled={!engineReady || engineError} onClick={() => download('png')} type="button">
            <Download aria-hidden="true" size={17} />
            PNG
          </button>
          <button
            className="tool-secondary-button"
            disabled={!engineReady || engineError}
            onClick={() => download('svg')}
            type="button"
          >
            <Download aria-hidden="true" size={17} />
            SVG
          </button>
        </div>

        <p className="tool-note">
          QR content and uploaded logos stay in this browser tab. No account or generator API is used.
        </p>
      </aside>
    </div>
  )
}
