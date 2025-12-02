import { useState } from "react";
import "../styles/globals.css";

export default function Tarpea(){
  const [pwd, setPwd] = useState("");
  const [ok, setOk] = useState(false);
  const [logs, setLogs] = useState(null);

  async function login(){
    const r = await fetch('/api/admin', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ password: pwd })
    });
    const j = await r.json();
    if(j.ok) setOk(true);
    else alert('Senha incorreta');
  }

  async function loadLogs(){
    const r = await fetch('/api/admin', { headers: { 'x-admin-pass': pwd }});
    const j = await r.json();
    setLogs(j);
  }

  if(!ok) return (
    <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'center',height:'70vh'}}>
      <div className="panel" style={{maxWidth:420}}>
        <h2 style={{color:'#00f0df'}}>Painel Nyros X — /tarpea</h2>
        <input className="input" type="password" placeholder="Senha" value={pwd} onChange={e=>setPwd(e.target.value)} />
        <div style={{marginTop:12}}>
          <button className="btn" onClick={login}>Entrar</button>
        </div>
        <div style={{marginTop:8,color:'#9aa3ad',fontSize:13}}>Senha temporária: Ouver7</div>
      </div>
    </div>
  );

  return (
    <div className="container">
      <h2 style={{color:'#00f0df'}}>Painel /tarpea</h2>
      <div style={{display:'flex',gap:12}}>
        <button className="btn" onClick={loadLogs}>Ver logs</button>
      </div>
      <div style={{marginTop:12}} className="panel">
        <pre style={{whiteSpace:'pre-wrap',wordBreak:'break-word'}}>{JSON.stringify(logs, null, 2)}</pre>
      </div>
    </div>
  );
}
