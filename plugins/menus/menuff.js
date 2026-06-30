import fs, { promises } from 'fs'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
try {
let d = new Date(new Date().getTime() + 3600000) // Corrección de sintaxis de fecha
let locale = 'es'
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
let _uptime = process.uptime() * 1000
let uptime = clockString(_uptime)

// VALIDACIÓN: Evita el error si global.db o global.db.data no existen aún
let totalUsers = global.db && global.db.data && global.db.data.users ? global.db.data.users : {}
let rtotalreg = Object.values(totalUsers).filter(user => user && user.registered == true).length 

let more = String.fromCharCode(8206)
let readMore = more.repeat(850)   
let taguser = conn.getName(m.sender)

let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let menu = `
¡Hola! 👋🏻 @${m.sender.split("@")[0]}
 \`\`\`${week}, ${date}\`\`\`
 
╭━━━[ 𝗙𝗥𝗘𝗘 𝗙𝗜𝗥𝗘 🎮]━⬣ ¡ *Jᴜᴇɢᴀs ꜰʀᴇᴇ ꜰɪʀᴇ ᴄᴏɴ ᴛᴜs ᴀᴍɪɢᴏs* !
────────────
» 𝗟𝗜𝗦𝗧𝗔𝗦 𝗩𝗦 «
┊🇧🇷➺ .𝟭𝘃𝘀𝟭
┊🇧🇷➺ .𝟰𝘃𝘀𝟰 𝗵𝗼𝗿𝗮
┊🇧🇷➺ .𝟲𝘃𝘀𝟲 𝗵𝗼𝗿𝗮
┊🇧🇷➺ .𝟴𝘃𝘀𝟴 𝗵𝗼𝗿𝗮
┊🇧🇷➺ .𝟭𝟮𝘃𝘀𝟭𝟮 𝗵𝗼𝗿𝗮
┊🇧🇷➺ .𝟭𝟲𝘃𝘀𝟭𝟲 𝗵𝗼𝗿𝗮
┊🇧🇷➺ .𝟮𝟬𝘃𝘀𝟮𝟬 𝗵𝗼𝗿𝗮
┊🏴‍☠️➺ .𝗶𝗻𝘁𝗲𝗿𝗻𝗮𝟰𝘃𝘀𝟰 𝗵𝗼𝗿𝗮
┊🏴‍☠️➺ .𝗶𝗻𝘁𝗲𝗿𝗻𝗮𝟲𝘃𝘀𝟲 𝗵𝗼𝗿𝗮
┊🇦🇶➺ .𝘀𝗰𝗿𝗶𝗺
┊🇦🇶➺ .𝘀𝗰𝗿𝗶𝗺𝗱𝘂𝗼
┊🇦🇶➺ .𝗺𝗮𝗽𝗮𝗰𝘂𝗮𝗱𝗿𝗶𝗹𝗮𝘁𝗲𝗿𝗼
┊🇦🇶➺ .𝗹𝗶𝘀𝘁𝗮𝗰𝘂𝗮𝗱𝗿𝗶𝗹𝗮𝘁𝗲𝗿𝗼
┊🇦🇶➺ .𝗺𝗮𝗽𝗮𝗵𝗲𝘅𝗮𝗴𝗼𝗻𝗮𝗹
┊🇦🇶➺ .𝗹𝗶𝘀𝘁𝗮𝗵𝗲𝘅𝗮𝗴𝗼𝗻𝗮𝗹 
────────────
» 𝗠𝗔𝗣𝗔𝗦 𝗙𝗥𝗘𝗘 𝗙𝗜𝗥𝗘 «
┊🗼➺ .𝗯𝗲𝗿𝗺𝘂𝗱𝗮
┊🏝️➺ .𝗽𝘂𝗿𝗴𝗮𝘁𝗼𝗿𝗶𝗼
┊🏜️➺ .𝗸𝗮𝗹𝗮𝗵𝗮𝗿𝗶 
┊🏗️➺ .𝗻𝗲𝘅𝘁𝗲𝗿𝗿𝗮
┊🏞️➺ .𝗮𝗹𝗽𝗲𝘀
────────────
» 𝙀𝙉𝘾𝙐𝙀𝙎𝙏𝘼 «
┊⚙️➺ .𝗲𝗻𝗰𝘂𝗲𝘀𝘁𝗮
» 𝗔𝗥𝗠𝗔𝗥 𝗦𝗤𝗨𝗔𝗗 
┊🌟➺ .𝗰𝗹𝗮𝘀𝗶𝗳𝗶𝗰𝗮𝘁𝗼𝗿𝗶𝗮
┊🌟➺ .𝗱𝘂𝗲𝗹𝗼
┊🌟➺ .𝗱𝘂𝗼
┊🌟➺ .𝗰𝗼𝗺𝗽𝗲
» 𝗡𝗢𝗩𝗔𝗧𝗢𝗦 «
┊🗣️➺ .𝗺𝗮𝗻𝗰𝗮 𝘁𝗮𝗴
┊🗣️➺ .𝗺𝗮𝗻𝗰𝗼 𝘁𝗮𝗴
╰━━━━━━⋆◈⋆━━⬣
 `.trim()
    
const vi = ['https://telegra.ph/file/523e4cd6e968fcab7c160.mp4']

// Asegura que funciones de arrays como getRandom no rompan si no existen en tu bot
const getMedia = (arr) => typeof arr.getRandom === 'function' ? arr.getRandom() : arr[Math.floor(Math.random() * arr.length)]

try {
await conn.sendMessage(m.chat, { video: { url: getMedia(vi) }, gifPlayback: true, caption: menu, mentions: [m.sender, global.conn.user.jid] }, { quoted: fkontak }) 
} catch (error) {
try {
await conn.sendMessage(m.chat, { image: { url: gataMenu.getRandom() }, gifPlayback: false, caption: menu, mentions: [m.sender, global.conn.user.jid] }, { quoted: fkontak }) 
} catch (error) {
try {
await conn.sendMessage(m.chat, { image: gataImg.getRandom(), gifPlayback: false, caption: menu, mentions: [m.sender, global.conn.user.jid] }, { quoted: fkontak }) 
} catch (error) {
try{
await conn.sendFile(m.chat, imagen5, 'menu.jpg', menu, fkontak, false, { mentions: [m.sender, global.conn.user.jid] })
} catch (error) {
return 
}}}} 

} catch (e) {
  console.error(e)
  await conn.sendMessage(
    m.chat,
    {
      text: `❌ Error al ejecutar el comando *${command}*.\n\n${e.message}`
    },
    { quoted: m }
  )
}}

handler.command = /^(menuff|menufreefire)$/i
handler.register = false
handler.group = true
export default handler
    
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
