export default function handler(req, res){
  const ADMIN_PASS = process.env.NYROS_ADMIN_PASS || "";
  if(req.method === "POST"){
    const { password } = req.body || {};
    if(password && password === ADMIN_PASS) return res.status(200).json({ ok: true });
    return res.status(401).json({ ok: false });
  }
  // GET logs (requires header)
  const auth = req.headers['x-admin-pass'] || "";
  if(auth !== ADMIN_PASS) return res.status(401).json({ error: "unauthorized" });
  const logs = { started: new Date().toISOString(), activity: ["core v2 started","monitor initialized"] };
  return res.status(200).json(logs);
}
