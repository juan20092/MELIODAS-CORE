import { unmuteUser, isMuted } from '../../wzr/mute.js'

let handler = async (m, { conn }) => {
  let user = m.mentionedJid?.[0] || m.quoted?.sender

  if (!user) {
    return m.reply('⚠️ Etiqueta o responde al usuario que deseas desmutear.')
  }

  if (!isMuted(user)) {
    return m.reply('❌ Ese usuario no está muteado.')
  }

  unmuteUser(user)

  await conn.sendMessage(
    m.chat,
    {
      text: `✅ @${user.split('@')[0]} ha sido desmuteado.`,
      mentions: [user]
    },
    { quoted: m }
  )
}

handler.help = ['unmute @usuario']
handler.tags = ['group']
handler.command = ['unmute']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler