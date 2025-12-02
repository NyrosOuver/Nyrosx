import { useState } from "react";

export default function TerminalPanel({ onSend, placeholder="Digite comando..." }) {
  const [input, setInput] = useState("");

  return (
    <div style={{
      background: "#020202",
      border: "1px solid rgba(0,255,200,0.12)",
      padding: 14,
      borderRadius: 8,
      marginTop: 18
    }}>
      <div style={{ color: "#00f0df", marginBottom: 8, fontWeight:700 }}>nyrosx@core:~$</div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => {
          if(e.key === "Enter" && input.trim()){
            onSend(input.trim());
            setInput("");
          }
        }}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: 10,
          background: "#061017",
          color: "#0aff9d",
          border: "1px solid rgba(0,255,200,0.08)",
          borderRadius: 6,
          outline: "none",
          fontSize: 14
        }}
      />
    </div>
  );
}
