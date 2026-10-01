'use client'
import Script from 'next/script'
import { Download, FilePlus2, Trash2 } from 'lucide-react'
import { useState } from 'react'
type Tab='merge'|'split'|'images'
type PdfPage = { drawImage: (image: unknown, options: { x: number; y: number; width: number; height: number }) => void }
type PdfImage = { width: number; height: number }
type PdfDocumentInstance = {
  getPageIndices: () => number[]
  getPageCount: () => number
  copyPages: (source: PdfDocumentInstance, indices: number[]) => Promise<PdfPage[]>
  addPage: (sizeOrPage?: [number, number] | PdfPage) => PdfPage
  embedPng: (bytes: ArrayBuffer) => Promise<PdfImage>
  embedJpg: (bytes: ArrayBuffer) => Promise<PdfImage>
  save: () => Promise<Uint8Array>
}
type PdfLibApi = { PDFDocument: { create: () => Promise<PdfDocumentInstance>; load: (bytes: ArrayBuffer) => Promise<PdfDocumentInstance> } }
declare global { interface Window { PDFLib?: PdfLibApi } }
export function FileStudio(){
 const [tab,setTab]=useState<Tab>('merge'),[files,setFiles]=useState<File[]>([]),[pages,setPages]=useState('1'),[ready,setReady]=useState(false),[busy,setBusy]=useState(false)
 const accept=tab==='images'?'image/*':'application/pdf'
 function add(list:FileList|null){if(list)setFiles(v=>[...v,...Array.from(list)])}
 async function run(){
  if(!ready||!files.length)return;setBusy(true)
  try{
   const pdfLib=window.PDFLib
   if(!pdfLib) return
   const {PDFDocument}=pdfLib
   let out: PdfDocumentInstance
   if(tab==='merge'){out=await PDFDocument.create();for(const f of files){const src=await PDFDocument.load(await f.arrayBuffer());const copied=await out.copyPages(src,src.getPageIndices());copied.forEach(p=>out.addPage(p))}}
   if(tab==='split'){const src=await PDFDocument.load(await files[0].arrayBuffer());out=await PDFDocument.create();const wanted=pages.split(',').flatMap(part=>{const [a,b]=part.trim().split('-').map(Number);if(!a)return[];return b?Array.from({length:b-a+1},(_,i)=>a+i):[a]}).filter((n,i,a)=>n>0&&n<=src.getPageCount()&&a.indexOf(n)===i);const copied=await out.copyPages(src,wanted.map(n=>n-1));copied.forEach(p=>out.addPage(p))}
   if(tab==='images'){out=await PDFDocument.create();for(const f of files){const bytes=await f.arrayBuffer();const img=f.type==='image/png'?await out.embedPng(bytes):await out.embedJpg(bytes);const page=out.addPage([img.width,img.height]);page.drawImage(img,{x:0,y:0,width:img.width,height:img.height})}}
   const bytes=await out.save(),blob=new Blob([bytes.buffer as ArrayBuffer],{type:'application/pdf'}),u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=tab==='merge'?'merged.pdf':tab==='split'?'pages.pdf':'images.pdf';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)
  }finally{setBusy(false)}
 }
 return <div className="studio-shell"><Script src="https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js" strategy="afterInteractive" onLoad={()=>setReady(true)}/>
 <div className="studio-tabs">{([['merge','Merge PDFs'],['split','Extract pages'],['images','Images → PDF']] as [Tab,string][]).map(([id,label])=><button data-active={tab===id} key={id} onClick={()=>{setTab(id);setFiles([])}}>{label}</button>)}</div>
 <div className="studio-workspace">
 <div className="tool-panel studio-controls"><div className="tool-panel__heading"><div><p>{tab}</p><h2>{tab==='merge'?'Combine PDFs':tab==='split'?'Extract PDF pages':'Images to PDF'}</h2></div></div>
 {tab==='split'&&<label className="tool-control"><span>Pages</span><input value={pages} onChange={e=>setPages(e.target.value)} placeholder="1, 3-5, 8"/></label>}
 <label className="studio-drop studio-drop--compact"><FilePlus2 size={28}/><strong>{tab==='split'?'Choose a PDF':'Add files'}</strong><span>{tab==='images'?'JPEG / PNG':'PDF'} · local processing</span><input multiple={tab!=='split'} accept={accept} type="file" onChange={e=>add(e.target.files)}/></label>
 <button className="studio-export" disabled={!ready||!files.length||busy} onClick={run}><Download size={17}/>{busy?'Working…':tab==='merge'?'Merge & download':tab==='split'?'Extract & download':'Create PDF'}</button><p className="tool-note">Files stay on your device. Nothing is uploaded.</p></div>
 <div className="tool-preview"><div className="tool-preview__heading"><div><p>Queue</p><strong>{files.length} file{files.length===1?'':'s'}</strong></div></div><div className="studio-file-list">{files.length?files.map((f,i)=><div key={f.name+i}><span><strong>{i+1}. {f.name}</strong><small>{(f.size/1024/1024).toFixed(2)} MB</small></span><button onClick={()=>setFiles(v=>v.filter((_,x)=>x!==i))}><Trash2 size={16}/></button></div>):<p className="tool-note">Add files to start. Their order here is the output order.</p>}</div></div>
 </div></div>
}
