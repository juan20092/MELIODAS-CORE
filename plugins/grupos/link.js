import axios from 'axios'

let handler = async (m, { conn, isAdmin, isBotAdmin }) => {
  if (!m.isGroup) throw '❖ *ᴇꜱᴛᴇ ᴄᴏᴍᴀɴᴅᴏ ᴇꜱ ꜱᴏʟᴏ ᴘᴀʀᴀ ɢʀᴜᴘᴏꜱ*'
  if (!isAdmin) return global.dfail('admin', m, conn)
  if (!isBotAdmin) return global.dfail('botAdmin', m, conn)

  const labelTest = "𝐌𝐄𝐋𝐈𝐎𝐃𝐀𝐒 - 𝐁𝐎𝐓"
  const imgUrl = "https://cdn.dix.lat/me/b0216efd-5f4a-4f5a-97bf-b62a81d10014.jpg"

  let fakeQuoted = m

  try {
    const response = await axios.get(imgUrl, {
      responseType: 'arraybuffer'
    }).catch(() => null)

    if (response) {
      const thumbBuffer = response.data

      fakeQuoted = {
        key: {
          participant: '0@s.whatsapp.net',
          remoteJid: 'status@broadcast',
          fromMe: false,
          id: 'LinkGroup'
        },
        message: {
          locationMessage: {
            name: labelTest,
            jpegThumbnail: thumbBuffer
          }
        },
        participant: '0@s.whatsapp.net'
      }
    }
  } catch (e) {
    console.error(e)
  }

  let code = await conn.groupInviteCode(m.chat)
  let link = `https://chat.whatsapp.com/${code}`

  let pp = imgUrl
  try {
    const profilePic = await conn.profilePictureUrl(m.chat, 'image')
    if (profilePic) pp = profilePic
  } catch {}

  let groupName = await conn.getName(m.chat)
  let metadata = await conn.groupMetadata(m.chat)

  let texto = `
> 🔗 𝗟𝗜𝗡𝗞 𝗗𝗘𝗟 𝗚𝗥𝗨𝗣𝗢

> 》𝗚𝗥𝗨𝗣𝗢: ${groupName} 
> 》𝗘𝗡𝗟𝗔𝗖𝗘 𝗗𝗘𝗟 𝗚𝗥𝗨𝗣𝗢: ${link}

> ${global.botName}
`

  await conn.sendMessage(m.chat, {
    react: {
      text: '🔗',
      key: m.key
    }
  })

  await conn.sendMessage(
    m.chat,
    {
      image: { url: pp },
      caption: texto,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: global.ch || '120363419404216418@newsletter',
          newsletterName: '𝘔𝘌𝘓𝘐𝘖𝘋𝘈𝘚 𝘉𝘖𝘛 - 𝘊𝘏𝘈𝘕𝘕𝘌𝘓 𝟮𝟬𝟮𝟯'
        }
      }
    },
    { quoted: fakeQuoted }
  )
}

handler.command = ['link']
handler.help = ['link']
handler.tags = ['grupo']
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler
