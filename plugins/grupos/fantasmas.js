let handler = async (m, { conn, text, participants }) => {
  let member = participants.map(u => u.id)

  let sum = !text ? member.length : Number(text)
  let total = 0
  let sider = []

  for (let i = 0; i < sum && i < member.length; i++) {
    let users = m.isGroup ? participants.find(u => u.id == member[i]) || {} : {}

    let user = global.db?.data?.users?.[member[i]]

    if ((!user || user.chat == 0) && !users.isAdmin && !users.isSuperAdmin) {
      if (user) {
        if (user.whitelist == false) {
          total++
          sider.push(member[i])
        }
      } else {
        total++
        sider.push(member[i])
      }
    }
  }

  if (total == 0) {
    return conn.reply(
      m.chat,
      `*[❗ INFO ❗]* ESTE GRUPO NO TIENE FANTASMAS, ¡BUEN TRABAJO!`,
      m
    )
  }

  let teks = `[ ⚠ REVISIÓN INACTIVA ⚠ ]

👥 *GRUPO:* ${await conn.getName(m.chat)}
👤 *MIEMBROS:* ${sum}

[ 👻 LISTA DE FANTASMAS 👻 ]

${sider.map(v => `👻 @${v.split('@')[0]}`).join('\n')}

*NOTA:* Esto no puede ser 100% correcto, el bot inicia el conteo de mensajes desde que fue agregado al grupo.`

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