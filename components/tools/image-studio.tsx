'use client'

import { Download, ImagePlus, RotateCcw } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

type Tab = 'resize' | 'crop' | 'upscale' | 'compress' | 'convert'
type Format = 'image/png' | 'image/jpeg' | 'image/webp'
const tabs: {id: Tab; label: string}[] = [
  {id:'resize',label:'Resize'}, {id:'crop',label:'Crop'}, {id:'upscale',label:'Upscale'}, {id:'compress',label:'Compress'}, {id:'convert',label:'Convert'}
]

export function ImageStudio() {
  const [file,setFile]=useState<File>()
  const [url,setUrl]=useState('')
  const [tab,setTab]=useState<Tab>('resize')
  const [width,setWidth]=useState(0), [height,setHeight]=useState(0)
  const [original,setOriginal]=useState({width:0,height:0})
  const [lock,setLock]=useState(true)
  const [scale,setScale]=useState(2)
  const [quality,setQuality]=useState(.86)
  const [format,setFormat]=useState<Format>('image/png')
  const [crop,setCrop]=useState({x:0,y:0,w:100,h:100})
  const canvas=useRef<HTMLCanvasElement>(null)

  useEffect(()=>()=>{if(url) URL.revokeObjectURL(url)},[url])

  function load(next?: File) {
    if(!next) return
    if(url) URL.revokeObjectURL(url)
    const nextUrl=URL.createObjectURL(next)
    const img=new Image()
    img.onload=()=>{setOriginal({width:img.naturalWidth,height:img.naturalHeight});setWidth(img.naturalWidth);setHeight(img.naturalHeight);setCrop({x:0,y:0,w:100,h:100})}
    img.src=nextUrl; setFile(next); setUrl(nextUrl)
  }
  const out = useMemo(()=>{
    if(tab==='upscale') return {w:Math.round(original.width*scale),h:Math.round(original.height*scale)}
    if(tab==='crop') return {w:Math.max(1,Math.round(original.width*crop.w/100)),h:Math.max(1,Math.round(original.height*crop.h/100))}
    return {w:width||original.width,h:height||original.height}
  },[tab,scale,original,crop,width,height])

  function changeWidth(v:number){setWidth(v);if(lock&&original.width)setHeight(Math.round(v*original.height/original.width))}
  function changeHeight(v:number){setHeight(v);if(lock&&original.height)setWidth(Math.round(v*original.width/original.height))}
  function reset(){setWidth(original.width);setHeight(original.height);setScale(2);setQuality(.86);setCrop({x:0,y:0,w:100,h:100});setFormat('image/png')}

  async function exportImage(){
    if(!url||!canvas.current) return
    const img=new Image(); img.src=url; await img.decode()
    const c=canvas.current, ctx=c.getContext('2d'); if(!ctx) return
    let sx=0,sy=0,sw=img.naturalWidth,sh=img.naturalHeight
    if(tab==='crop'){sx=img.naturalWidth*crop.x/100;sy=img.naturalHeight*crop.y/100;sw=img.naturalWidth*crop.w/100;sh=img.naturalHeight*crop.h/100}
    c.width=out.w;c.height=out.h
    ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high'
    if(format==='image/jpeg'){ctx.fillStyle='#fff';ctx.fillRect(0,0,c.width,c.height)}
    ctx.drawImage(img,sx,sy,sw,sh,0,0,c.width,c.height)
    const blob=await new Promise<Blob|null>(resolve=>c.toBlob(resolve,format,quality)); if(!blob)return
    const a=document.createElement('a'), u=URL.createObjectURL(blob); a.href=u
    const ext=format==='image/jpeg'?'jpg':format.split('/')[1];a.download=`image-${tab}.${ext}`;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)
  }

  return <div className="studio-shell">
    <div className="studio-tabs" role="tablist">{tabs.map(t=><button data-active={tab===t.id} key={t.id} onClick={()=>setTab(t.id)}>{t.label}</button>)}</div>
    {!file ? <label className="studio-drop"><ImagePlus size={34}/><strong>Drop or choose an image</strong><span>PNG, JPEG or WebP · processed locally</span><input accept="image/*" type="file" onChange={e=>load(e.target.files?.[0])}/></label> :
    <div className="studio-workspace">
      <aside className="tool-panel studio-controls">
        <div className="tool-panel__heading"><div><p>{tab}</p><h2>{file.name}</h2></div><button className="tool-icon-button" onClick={reset}><RotateCcw size={17}/></button></div>
        <div className="studio-meta"><span>Original</span><strong>{original.width} × {original.height}</strong><span>Output</span><strong>{out.w} × {out.h}</strong></div>
        {tab==='resize' && <><div className="tool-control-grid"><label className="tool-control"><span>Width</span><input type="number" min="1" value={width} onChange={e=>changeWidth(+e.target.value)}/></label><label className="tool-control"><span>Height</span><input type="number" min="1" value={height} onChange={e=>changeHeight(+e.target.value)}/></label></div><label className="studio-check"><input type="checkbox" checked={lock} onChange={e=>setLock(e.target.checked)}/> Lock aspect ratio</label></>}
        {tab==='upscale' && <div className="tool-preset-list">{[2,3,4].map(n=><button data-active={scale===n} onClick={()=>setScale(n)} key={n}>{n}×</button>)}</div>}
        {tab==='crop' && <><p className="tool-note">Crop by percentages — precise and predictable on any image size.</p>{(['x','y','w','h'] as const).map(k=><label className="tool-control tool-range-control" key={k}><span>{k==='x'?'Left':k==='y'?'Top':k==='w'?'Width':'Height'} <strong>{crop[k]}%</strong></span><input type="range" min="0" max={k==='x'||k==='y'?90:100} value={crop[k]} onChange={e=>setCrop({...crop,[k]:+e.target.value})}/></label>)}</>}
        {tab==='compress' && <label className="tool-control tool-range-control"><span>Quality <strong>{Math.round(quality*100)}%</strong></span><input type="range" min=".2" max="1" step=".01" value={quality} onChange={e=>setQuality(+e.target.value)}/></label>}
        {(tab==='convert'||tab==='compress') && <label className="tool-control"><span>Output format</span><select value={format} onChange={e=>setFormat(e.target.value as Format)}><option value="image/png">PNG</option><option value="image/jpeg">JPEG</option><option value="image/webp">WebP</option></select></label>}
        <label className="tool-file-button"><ImagePlus size={17}/>Replace image<input accept="image/*" type="file" onChange={e=>load(e.target.files?.[0])}/></label>
        <button className="studio-export" onClick={exportImage}><Download size={17}/>Export image</button>
        <p className="tool-note">{tab==='upscale'?'High-quality browser resampling. This increases resolution but does not invent AI detail.':'Everything stays in this browser tab.'}</p>
      </aside>
      <div className="tool-preview studio-preview"><div className="tool-preview__heading"><div><p>Preview</p><strong>{out.w} × {out.h}</strong></div></div><div className="studio-image-stage"><img src={url} alt="Selected preview" style={tab==='crop'?{clipPath:`inset(${crop.y}% ${100-crop.x-crop.w}% ${100-crop.y-crop.h}% ${crop.x}%)`}:undefined}/></div></div>
    </div>}
    <canvas ref={canvas} hidden />
  </div>
}
