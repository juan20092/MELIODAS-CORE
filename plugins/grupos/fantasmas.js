let handler = async (m, { conn, text, participants }) => {
let member = participants.map(u => u.id)
if (!text) {
var sum = member.length
} else {
var sum = Number(text)
}
var total = 0
var sider = []

for (let i = 0; i < sum && i < member.length; i++) {
let users = m.isGroup ? participants.find(u => u.id == member[i]) || {} : {}

let user = global.db?.data?.users?.[member[i]]

if ((typeof user == 'undefined' || user.chat == 0) && !users.isAdmin && !users.isSuperAdmin) {
if (typeof user !== 'undefined') {
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

if (total == 0) return conn.reply(m.chat, `*[❗𝙸𝙽𝙵𝙾❗]* 𝙴𝚂𝚃𝙴 𝙶𝚁𝚄𝙿𝙾 𝙽𝙾 𝚃𝙸𝙴𝙽𝙴 𝙵𝙰𝙽𝚃𝙰𝚂𝙼𝙰𝚂, 𝚀𝚄𝙴 𝙱𝚄𝙴𝙽 𝚃𝚁𝙰𝙱𝙰𝙹𝙾 𝙷𝙰𝙲𝙴 𝙴𝙻 𝙰𝙳𝙼𝙸𝙽`, m)

m.reply(`[ ⚠ 𝚁𝙴𝚅𝙸𝚂𝙸Ó𝙽 𝙸𝙽𝙰𝙲𝚃𝙸𝚅𝙰 ⚠ ]

𝙶𝚁𝚄𝙿𝙾: ${await conn.getName(m.chat)}
𝙼𝙸𝙴𝙼𝙱𝚁𝙾𝚂: ${sum}

[ ⇲ 𝙻𝙸𝚂𝚃𝙰 𝙳𝙴 𝙵𝙰𝙽𝚃𝙰𝚂𝙼𝙰𝚂 ⇱ ]

${sider.map(v => '👻 @' + v.replace(/@.+/, '')).join('\n')}

𝙽𝙾𝚃𝙰: 𝙴𝚂𝚃𝙾 𝙽𝙾 𝙿𝚄𝙴𝙳𝙴 𝚂𝙴𝚁 100% 𝙲𝙾𝚁𝚁𝙴𝙲𝚃𝙾, 𝙴𝙻 𝙱𝙾𝚃 𝙸𝙽𝙸𝙲𝙸𝙰 𝙴𝙻 𝙲𝙾𝙽𝚃𝙴𝙾 𝙳𝙴 𝙼𝙴𝙽𝚂𝙰𝙹𝙴𝚂 𝙳𝙴𝚂𝙳𝙴 𝙻𝙰 𝙰𝙲𝚃𝙸𝚅𝙰𝙲𝙸Ó𝙽 𝙴𝙽 𝙴𝚂𝚃𝙴 𝙶𝚁𝚄𝙿𝙾`, null, { mentions: sider })
}

handler.help = ['fantasmas']
handler.tags = ['group']
handler.command = /^(verfantasmas|fantasmas|sider)$/i
handler.admin = true
handler.botAdmin = true

export default handler