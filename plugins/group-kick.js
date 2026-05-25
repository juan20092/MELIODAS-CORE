let handler = async (m, { conn }) => {

  const chatMetadata = await conn.groupMetadata(m.chat)
  const groupAdmins = chatMetadata.participants.filter(p => p.admin)
  const isAdmin = groupAdmins.some(admin => admin.id === m.sender)

  if (!isAdmin) return

  const target =
    m.mentionedJid?.[0] ||
    m.quoted?.sender

  if (!target) {
    return conn.sendMessage(m.chat, {
      text: `
┏━━━━━━━━━┓
                𝐊𝐈𝐂𝐊
┗━━━━━━━━━┛

➥ 𝙈𝙚𝙣𝙘𝙞𝙤𝙣𝙖 ο 𝙧𝙚𝙨𝙥ο𝙣𝙙𝙚
➥ 𝙖𝙡 𝙪𝙨𝙪𝙖𝙧ἰο 𝙦𝙪𝙚
➥ 𝙙𝙚𝙨𝙚𝙖𝙨 𝙚𝙭𝙪𝙡𝙨𝙖𝙧
      `.trim(),
      ...global.rcanal
    }, { quoted: m })
  }

  const groupOwner = chatMetadata.owner || chatMetadata.id.split('-')[0] + '@s.whatsapp.net'

  if (target === groupOwner) {
    return conn.sendMessage(m.chat, {
      text: `❌ *No puedes expulsar al Dueño/Creador del grupo.*`,
      ...global.rcanal
    }, { quoted: m })
  }

  try {

    await conn.groupParticipantsUpdate(
      m.chat,
      [target],
      "remove"
    )

    let username = target.split("@")[0]

    await conn.sendMessage(m.chat, {
      text: `
┏━━━━━━━━━┓
                𝐊𝐈𝐂𝐊
┗━━━━━━━━━┛

➥ @${username}

> ⟢ 𝙁𝙪𝙚 𝙚𝙭𝙪𝙡𝙨𝙖𝙙ο 𝙙𝙚𝙡 𝙜𝙧𝙪𝙥ο
      `.trim(),
      mentions: [target],
      contextInfo: {
        ...(global.rcanal?.contextInfo || {}),
        mentionedJid: [target]
      }
    }, { quoted: m })

  } catch (e) {
    console.log(e)

    return conn.sendMessage(m.chat, {
      text: `
┏━━━━━━━━━┓
                𝐊𝐈𝐂𝐊
┗━━━━━━━━━┛

> ➥ 𝙀𝙡 𝙗ο𝙩 𝙣ο 𝙚𝙨 𝙖𝙙𝙢𝙞н
> ➥ 𝙊 𝙚𝙡 𝙪𝙨𝙪𝙖𝙧ἰο 𝙮𝙖 𝙣ο 𝙚𝙨𝙩𝙖
      `.trim(),
      ...global.rcanal
    }, { quoted: m })
  }
}

handler.help = ["kick"]
handler.tags = ["grupos"]
handler.command = /^kick$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler
