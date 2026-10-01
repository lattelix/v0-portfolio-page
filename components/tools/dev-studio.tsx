'use client'
import { Check, Copy, RefreshCw } from 'lucide-react'
import { useState } from 'react'
type Tab='json'|'base64'|'url'|'uuid'|'time'
const tabs:[Tab,string][]=[['json','JSON'],['base64','Base64'],['url','URL'],['uuid','UUID'],['time','Timestamp']]
export function DevStudio(){
 const [tab,setTab]=useState<Tab>('json'),[input,setInput]=useState(''),[output,setOutput]=useState(''),[copied,setCopied]=useState(false)
 function copy(){if(!output)return;navigator.clipboard.writeText(output);setCopied(true);setTimeout(()=>setCopied(false),1200)}
 function run(action?:string){try{
  if(tab==='json'){const parsed:unknown=JSON.parse(input);setOutput(action==='minify'?JSON.stringify(parsed):JSON.stringify(parsed,null,2))}
  if(tab==='base64')setOutput(action==='decode'?decodeURIComponent(escape(atob(input))):btoa(unescape(encodeURIComponent(input))))
  if(tab==='url')setOutput(action==='decode'?decodeURIComponent(input):encodeURIComponent(input))
  if(tab==='uuid'){const n=Math.max(1,Math.min(100,Number(input)||1));setOutput(Array.from({length:n},()=>crypto.randomUUID()).join('\n'))}
  if(tab==='time'){const raw=input.trim();const date=/^\d{10,13}$/.test(raw)?new Date(Number(raw)*(raw.length===10?1000:1)):new Date(raw||Date.now());if(Number.isNaN(date.getTime()))throw new Error('Invalid date');setOutput(['ISO: '+date.toISOString(),'Unix: '+Math.floor(date.getTime()/1000),'Milliseconds: '+date.getTime(),'Local: '+date.toLocaleString()].join('\n'))}
 }catch(e){setOutput('Error: '+(e instanceof Error?e.message:'Invalid input'))}}
 function switchTab(id:Tab){setTab(id);setInput(id==='uuid'?'5':id==='time'?String(Math.floor(Date.now()/1000)):'');setOutput('')}
 return <div className="studio-shell"><div className="studio-tabs">{tabs.map(([id,label])=><button data-active={tab===id} key={id} onClick={()=>switchTab(id)}>{label}</button>)}</div><div className="dev-workspace"><div className="tool-panel"><div className="tool-panel__heading"><div><p>{tab}</p><h2>{tab==='json'?'Format & validate JSON':tab==='base64'?'Encode / decode Base64':tab==='url'?'Encode / decode URL data':tab==='uuid'?'Generate UUID v4':'Convert timestamps'}</h2></div></div><label className="tool-control"><span>{tab==='uuid'?'How many':tab==='time'?'Timestamp or date':'Input'}</span>{tab==='uuid'?<input type="number" min="1" max="100" value={input} onChange={e=>setInput(e.target.value)}/>:<textarea rows={10} value={input} onChange={e=>setInput(e.target.value)} placeholder={tab==='json'?'{ "hello": "world" }':tab==='time'?'Unix timestamp, ISO date, or leave blank':'Paste text here…'}/>}</label><div className="dev-actions">{tab==='json'?<><button onClick={()=>run('format')}>Format</button><button className="tool-secondary-button" onClick={()=>run('minify')}>Minify</button></>:tab==='base64'||tab==='url'?<><button onClick={()=>run('encode')}>Encode</button><button className="tool-secondary-button" onClick={()=>run('decode')}>Decode</button></>:<button onClick={()=>run()}><RefreshCw size={16}/>{tab==='uuid'?'Generate':'Convert'}</button>}</div></div><div className="tool-preview dev-output"><div className="tool-preview__heading"><div><p>Output</p><strong>{output?'Ready':'Waiting for input'}</strong></div><button className="tool-icon-button" disabled={!output} onClick={copy}>{copied?<Check size={16}/>:<Copy size={16}/>}</button></div><pre>{output||'Your result will appear here.'}</pre></div></div></div>
}
