import chalk from 'chalk'

function cleanText(value = '') {
  return String(value)
    .replace(/\s+/g, ' ')
    .trim()
}

function getPreview(msg) {
  const content = msg?.message || {}

  if (content.conversation) return cleanText(content.conversation)
  if (content.extendedTextMessage?.text) return cleanText(content.extendedTextMessage.text)
  if (content.imageMessage?.caption) return cleanText(content.imageMessage.caption)
  if (content.videoMessage?.caption) return cleanText(content.videoMessage.caption)
  if (content.documentMessage?.caption) return cleanText(content.documentMessage.caption)
  if (content.audioMessage) return '🎵 Audio'
  if (content.imageMessage) return '🖼️ Imagen'
  if (content.videoMessage) return '🎥 Video'
  if (content.stickerMessage) return '🎴 Sticker'
  if (content.documentMessage) return `📄 Documento: ${content.documentMessage.fileName || 'sin nombre'}`
  if (content.locationMessage) return '📍 Ubicación'
  if (content.contactMessage) return '📇 Contacto'
  if (content.liveLocationMessage) return '📍 Ubicación en vivo'

  return '📦 Mensaje sin texto'
}

function getMessageType(msg) {
  const content = msg?.message || {}

  if (content.imageMessage) return 'imagen'
  if (content.videoMessage) return 'video'
  if (content.audioMessage) return 'audio'
  if (content.stickerMessage) return 'sticker'
  if (content.documentMessage) return 'documento'
  if (content.locationMessage) return 'ubicación'
  if (content.contactMessage) return 'contacto'
  if (content.liveLocationMessage) return 'ubicación en vivo'
  if (content.extendedTextMessage || content.conversation) return 'texto'

  return 'mensaje'
}

export function logMessages(conn) {
  conn.ev.on('messages.upsert', (m) => {
    const msg = m.messages?.[0]
    if (!msg?.message) return

    const jid = msg.key?.remoteJid || 'unknown'
    const isGroup = jid.endsWith('@g.us')
    const sender = msg.key?.participant || msg.key?.remoteJid || 'unknown'
    const preview = getPreview(msg)
    const type = getMessageType(msg)
    const senderLabel = msg.key?.fromMe ? chalk.greenBright('YO') : chalk.cyan(sender)
    const roomLabel = isGroup ? chalk.magentaBright.bold('GRUPO') : chalk.yellowBright.bold('PRIVADO')
    const timestamp = chalk.gray(new Date().toLocaleTimeString('es-ES', { hour12: false }))
    const line = chalk.dim('═').repeat(60)

    console.log(`\n${chalk.bold.cyan(line)}`)
    console.log(`${timestamp} ${roomLabel}`)
    console.log(chalk.white(`📍 Chat: ${chalk.blue(jid)}`))
    console.log(chalk.white(`👤 Remitente: ${senderLabel}`))
    console.log(chalk.white(`🧩 Tipo: ${chalk.yellow(type)}`))
    console.log(chalk.white(`💬 Mensaje: ${chalk.white(preview)}`))
    console.log(`${chalk.bold.cyan(line)}\n`)
  })
}
