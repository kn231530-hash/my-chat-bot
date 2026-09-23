"use client";
import {useState} from "react";
export default function Home(){
 const [messages,setMessages]=useState([{role:"assistant",content:"Hi! 👋 Main aapka AI chatbot hoon. Kuch bhi pooch sakte hain."}]);
 const [input,setInput]=useState(""); const [loading,setLoading]=useState(false);
 async function send(e){e.preventDefault(); if(!input.trim()||loading)return; const text=input.trim(); const next=[...messages,{role:"user",content:text}]; setMessages(next);setInput("");setLoading(true);
  try{const r=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:next})});const d=await r.json();setMessages([...next,{role:"assistant",content:d.reply||d.error||"Sorry, response nahi mila."}]);}catch{setMessages([...next,{role:"assistant",content:"Server se connection nahi ho saka."}]);}finally{setLoading(false)} }
 return <main><div className="chat"><h1>🤖 My AI Chatbot</h1><div className="messages">{messages.map((m,i)=><div key={i} className={"msg "+m.role}><b>{m.role==="user"?"You":"AI"}</b><p>{m.content}</p></div>)}{loading&&<div className="msg assistant"><b>AI</b><p>Thinking...</p></div>}</div><form onSubmit={send}><input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type your message..." /><button>Send</button></form></div></main>}