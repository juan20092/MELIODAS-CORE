/**
 * @Author: Meliodas Bot Team
 * @Description: Comando Tagall / Invocación optimizado y funcional.
 */

let handler = async (m, { isOwner, isAdmin, conn, participants, args }) => {
  // Validación de seguridad
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn)
    throw false
  }

  // Reacción de procesamiento
  await m.react('👀')

  const pesan = args.join(' ') || 'Sin mensaje específico.'
  const totalMiembros = participants.length

  // Tu diseño original fluido, limpio y estético
  let teks = `🗣️  *𝗜𝗡𝗩𝗢𝗖𝗔𝗖𝗜𝗢𝗡 𝗚𝗘𝗡𝗘𝗥𝗔𝗟 !*\n\n`
  teks += `  >> 📩 *𝙈𝙀𝙉𝙎𝘼𝙅𝙀 :* ${pesan}\n`
  teks += `  >> 👥 *𝙈𝙄𝙀𝙈𝘽𝙍𝙊𝙎 :* [ ${totalMiembros} ]\n\n`
  teks += `───────────────────\n\n`

  // Lista de miembros
  for (let mem of participants) {
    teks += ` 🐉  @${mem.id.split('@')[0]}\n`
  }

  teks += `\n───────────────────\n`
  teks += `> 𝙈𝙀𝙇𝙄𝙊𝘿𝘼𝙎 𝘽𝙊𝙏`

  // Envío seguro y directo al chat
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
          newsletterName: '↯ 𝘔𝘌𝘓𝘐𝘖𝘋𝘈𝘚 𝘉放𝘛 - 𝘊𝘏𝘈𝘕𝘕𝘌𝘓'
        },
        // Aquí se renderiza tu imagen de forma nativa arriba del texto (Estilo Premium)
        externalAdReply: {
          title: 'ＭＥＬＩＯＤＡＳ  ＢＯＴ',
          body: '📢 ¡Invocación General del Staff!',
          mediaType: 1,
          previewType: 0,
          renderLargerThumbnail: true, // Cambia a false si prefieres la miniatura pequeña
          thumbnailUrl: 'https://cdn.dix.lat/me/b0216efd-5f4a-4f5a-97bf-b62a81d10014.jpg',
          sourceUrl: 'https://atom.bio/meliodas-bot'
        }
      }
    },
    { quoted: m } // Usamos el mensaje original para evitar que WhatsApp lo bloquee
  )
  
  await m.react('✅')
}

handler.command = /^(tagall|invocar|invocacion|todos|invocación)$/i
handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler
