import { useState } from "react";
import TerminalPanel from "../components/TerminalPanel";
import "../styles/globals.css";

export default function Home(){
  const [messages, setMessages] = useState([]);

  async function sendMessage(text){
    setMessages(prev => [...prev, { role: "user", content: text }]);
    try{
      const r = await fetch('/api/chat', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ message: text })
      });
      const j = await r.json();
      setMessages(prev => [...prev, { role:'ai', content: j.reply }]);
    }catch(e){
      setMessages(prev => [...prev, { role:'ai', content: 'Erro: não foi possível contactar o núcleo.' }]);
    }
  }

  return (
    <div className="container">
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}>
        <div>
          <h1 style={{margin:0,fontSize:28,color:'#00f0df'}}>Nyros X</h1>
          <div style={{color:'#9aa3ad'}}>O núcleo — pergunte, execute, cresça.</div>
        </div>
        <div>
          <a className="btn" href="/tarpea" style={{textDecoration:'none'}}>Painel /tarpea</a>
        </div>
      </header>

      <main style={{marginTop:18}}>
        <div className="panel" style={{minHeight:320}}>
          {messages.length === 0 && <div style={{color:'#9aa3ad'}}>Converse com o Nyros X — diga algo no terminal abaixo.</div>}
          {messages.map((m,i)=>(
            <div key={i} className={m.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
              <div className={`bubble ${m.role==='user' ? 'bubble-user' : 'bubble-ai'}`}>
                <strong style={{display:'block',fontSize:12,color:'#9aa3ad'}}>{m.role==='user' ? 'Você' : 'Nyros'}</strong>
                <div style={{marginTop:6}}>{m.content}</div>
              </div>
            </div>
          ))}
        </div>

        <TerminalPanel onSend={sendMessage} placeholder="Pergunta pro Nyros..." />
      </main>
    </div>
  );
}
