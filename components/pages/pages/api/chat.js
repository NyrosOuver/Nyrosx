export default async function handler(req, res){
  try{
    const { message } = req.body || { message: "" };
    // STUB — substitua por chamada ao seu LLM (OpenAI/otro) usando process.env.OPENAI_API_KEY
    const reply = `⚡ Nyros X (v2.0) recebeu: "${message}". Resposta mock ativa.`;
    return res.status(200).json({ reply });
  }catch(e){
    return res.status(500).json({ reply: "Erro interno" });
  }
}
