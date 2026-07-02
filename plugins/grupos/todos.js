/**
 * @Author: Meliodas Bot Team
 * @Description: Comando Tagall / Invocación con diseño premium y optimizado.
 */

import { Buffer } from 'buffer'

let handler = async (m, { isOwner, isAdmin, conn, participants, args }) => {
  // Validación de seguridad de nivel de entrada
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn)
    throw false
  }

  // Feedback táctil instantáneo
  await m.react('👀')

  const pesan = args.join(' ') || 'Sin mensaje específico.'
  const totalMiembros = participants.length

  // DISEÑO PREMIUM: Fluido, moderno y limpio (estilo original mejorado)
  let teks = `🗣️  *𝗜𝗡𝗩𝗢𝗖𝗔𝗖𝗜𝗢𝗡 𝗚𝗘𝗡𝗘𝗥𝗔𝗟 !*\n\n`
  teks += `  >> 📩 *𝙈𝙀𝙉𝙎𝘼𝙅𝙀 :* ${pesan}\n`
  teks += `  >> 👥 *𝙈𝙄𝙀𝙈𝘽𝙍𝙊𝙎 :* [ ${totalMiembros} ]\n\n`
  teks += `───────────────────\n\n`

  // Lista de miembros estilizada y alineada
  for (let [index, mem] of participants.entries()) {
    const numero = (index + 1).toString().padStart(2, '0')
    teks += ` 🐉  @${mem.id.split('@')[0]}\n`
  }

  teks += `\n───────────────────\n`
  teks += `> 𝙈𝙀𝙇𝙄𝙊𝘿𝘼𝙎 𝘽𝙊𝙏 — 𝘼𝙡𝙡 𝙍𝙞𝙜𝙝𝙩𝙨 𝙍𝙚𝙨𝙚𝙧𝙫𝙖𝙙𝙤𝙨`

  const labelTest = "ＭＥＬＩＯＤＡＳ  ＢＯＴ"
  
  // Fake Quoted optimizado en memoria (Cero Lag)
  const fakeQuoted = {
    key: {
      participant: '0@s.whatsapp.net',
      remoteJid: 'status@broadcast',
      fromMe: false,
      id: 'MeliodasPremiumContext'
    },
    message: {
      locationMessage: {
        name: labelTest,
        jpegThumbnail: Buffer.alloc(0) 
      }
    },
    participant: '0@s.whatsapp.net'
  }

  // Envío del paquete con metadata avanzada de canal
  await conn.sendMessage(
    m.chat,
    {
      text: teks,
      mentions: participants.map(v => v.id),
      contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: global.ch || '120363419404216418@newsletter',
          newsletterName: '↯ 𝘔𝘌𝘓𝘐𝘖𝘋𝘈𝘚 𝘉𝘖𝘛 - 𝘊𝘏𝘈𝘕𝘕𝘌𝘓'
        },
        // Muestra la imagen directamente en la tarjeta de contexto de forma nativa
        externalAdReply: {
          title: '📢 Mención General del Staff',
          body: 'Meliodas Bot v2.0',
          mediaType: 1,
          previewType: 0,
          renderLargerThumbnail: false,
          thumbnailUrl: 'https://cdn.dix.lat/me/b0216efd-5f4a-4f5a-97bf-b62a81d10014.jpg',
          sourceUrl: 'https://atom.bio/meliodas-bot' // Puedes poner tu enlace
        }
      }
    },
    {
      quoted: fakeQuoted
    }
  )
  
  await m.react('✅')
}

handler.command = /^(tagall|invocar|invocacion|todos|invocación)$/i
handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler

