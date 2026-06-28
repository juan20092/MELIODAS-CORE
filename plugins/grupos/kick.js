import axios from 'axios'

let handler = async (m, { conn, isAdmin, isBotAdmin }) => {
  if (!isAdmin) return global.dfail("admin", m, conn)
  if (!isBotAdmin) return global.dfail("botAdmin", m, conn)
  const target =
    m.mentionedJid?.[0] ||
    m.quoted?.sender ||
    m.quoted?.participant ||
    m.quoted?.key?.participant

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
          id: 'KiritoTest'
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
  } catch (err) {
    console.error("Error al crear el Fake Chat:", err)
  }

  if (!target) {
    return conn.sendMessage(
      m.chat,
      {
        text: '> ⟪ 🦖 𝗺𝗲𝗻𝗰𝗶𝗼𝗻𝗮 𝗼 𝗿𝗲𝘀𝗽𝗼𝗻𝗱𝗲 𝗮𝗹 𝘂𝘀𝘂𝗮𝗿𝗶𝗼 𝗾𝘂𝗲 𝗱𝗲𝘀𝗲𝗮𝘀 𝗲𝗹𝗶𝗺𝗶𝗻𝗮𝗿 ⟫',
        contextInfo: {
          forwardingScore: 1,
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

  await conn.groupParticipantsUpdate(
    m.chat,
    [target],
    'remove'
  )

      await conn.sendMessage(m.chat, {
  react: {
    text: '✅',
    key: m.key
  }
})

  await conn.sendMessage(
    m.chat,
    {
      text: '✅ *ᴜsᴇʀ ᴇʟɪᴍɪɴᴀᴅᴏ ᴄᴏɴ ᴇxɪᴛᴏ*', 
      contextInfo: {
        forwardingScore: 1,
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

handler.command = ['kick']
handler.help = ["kick"]
handler.tags = ["grupo"]
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
