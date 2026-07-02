let handler = async (m, { conn, text, participants }) => {
  let member = participants.map(u => u.id)
  let sum = !text ? member.length : Math.min(Number(text), member.length)

  let total = 0
  let sider = []

  for (let i = 0; i < sum; i++) {
    let users = participants.find(u => u.id === member[i]) || {}

    if (users.isAdmin || users.isSuperAdmin) continue

    let user = global.db?.data?.users?.[member[i]]

    if (!user || !user.chat || user.chat === 0) {
      if (!user || user.whitelist !== true) {
        total++
        sider.push(member[i])
      }
    }
  }

  if (total === 0 || sider.length === 0) {
    return conn.reply(
      m.chat,
      '*[❗ 𝙸𝙽𝙵𝙾 ❗]* ¡𝙴𝚂𝚃𝙴 𝙶𝚁𝚄𝙿𝙾 𝙽𝙾 𝚃𝙸𝙴𝙽𝙴 𝙵𝙰𝙽𝚃𝙰𝚂𝙼𝙰𝚂! 𝚃𝚘𝚍𝚘𝚜 𝚕𝚘𝚜 𝚖𝚒𝚎𝚖𝚋𝚛𝚘𝚜 𝚎𝚜𝚝𝚊́𝚗 𝚊𝚌𝚝𝚒𝚟𝚘𝚜 😎',
      m
    )
  }

  let teks = `[ ⚠ 𝗥𝗘𝗩𝗜𝗦𝗜𝗢́𝗡 𝗜𝗡𝗔𝗖𝗧𝗜𝗩𝗔 ⚠ ]

👥 *𝗚𝗥𝗨𝗣𝗢:* ${await conn.getName(m.chat)}
👤 *𝗠𝗜𝗘𝗠𝗕𝗥𝗢𝗦:* ${participants.length}

[ 👻 𝙻𝙸𝚂𝚃𝙰 𝙳𝙴 𝙵𝙰𝙽𝚃𝙰𝚂𝙼𝙰𝚂 👻 ]

${sider.map(v => `👻 @${v.split('@')[0]}`).join('\n')}

*𝗧𝗼𝘁𝗮𝗹:* ${total} usuario(s).

*𝗡𝗢𝗧𝗔:* 𝙻𝚊 𝚕𝚒𝚜𝚝𝚊 𝚜𝚎 𝚋𝚊𝚜𝚊 𝚎𝚗 𝚕𝚘𝚜 𝚞𝚜𝚞𝚊𝚛𝚒𝚘𝚜 𝚚𝚞𝚎 𝚗𝚘 𝚝𝚒𝚎𝚗𝚎𝚗 𝚛𝚎𝚐𝚒𝚜𝚝𝚛𝚘 𝚍𝚎 𝚖𝚎𝚗𝚜𝚊𝚓𝚎𝚜 𝚎𝚗 𝚎𝚕 𝚋𝚘𝚝`

  await conn.sendMessage(
    m.chat,
    {
      text: teks,
      mentions: sider
    },
    { quoted: m }
  )
}

handler.help = ['fantasmas']
handler.tags = ['group']
handler.command = /^(verfantasmas|fantasmas|sider)$/i
handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler
