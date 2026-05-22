export function logMessages(conn) {
  conn.ev.on('messages.upsert', (m) => {
    const msg = m.messages?.[0]
    if (!msg?.message) return

    const jid = msg.key.remoteJid
    const isGroup = jid.endsWith('@g.us')
    const sender = msg.key.participant || msg.key.remoteJid

    const text =
      msg.message?.conversation ||
      msg.message?.extendedTextMessage?.text ||
      msg.message?.imageMessage?.caption ||
      msg.message?.videoMessage?.caption ||
      ''

    if (isGroup) {
      console.log(`
╭──── GRUPO ────
│ 📌 ${jid}
│ 👤 ${sender}
│ 💬 ${text}
╰──────────────
`)
    } else {
      console.log(`
╭──── PRIVADO ────
│ 👤 ${sender}
│ 💬 ${text}
╰────────────────
`)
    }
  })
}
