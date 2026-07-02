import axios from 'axios'

let handler = async (m, { conn }) => {

  const horarioFecha = new Date().toLocaleString('es-CO', {
    timeZone: 'America/Bogota'
  })
  
  function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}

const uptime = clockString(process.uptime() * 1000)

  const labelTest = "𝐌𝐄𝐋𝐈𝐎𝐃𝐀𝐒 - 𝐁𝐎𝐓"
  const imgUrl = "https://cdn.dix.lat/me/b0216efd-5f4a-4f5a-97bf-b62a81d10014.jpg"
  const videoUrl = [
  "https://cdn.dix.lat/me/be57966c-c848-4b75-ae07-89b3ddde95a4.mp4",
  "https://cdn.dix.lat/me/a1ec69ee-cca1-49f0-8c28-d094d38c6100.mp4",
  "https://cdn.dix.lat/me/fe8060a6-7147-40d9-9c83-7da1c9623593.mp4"
  ];
  
  let fakeQuoted = m;

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
  } catch (e) {
    console.error(e)
  }

  let menu = `╔═══≪ °❈° ≫═══╗
        𝑴𝑬𝑳𝑰𝑶𝑫𝑨𝑺 𝑩𝑶𝑻
╚═══≪ °❈° ≫═══╝


┏━━━━━━━━━━┓

❖ 𝐔𝐬𝐮𝐚𝐫𝐢𝐨 ⤞ @${m.sender.split('@')[0]}

❖ 𝐂𝐫𝐞𝐚𝐝𝐨𝐫 ⤞ +573223702049

❖ 𝐔𝐩𝐭𝐢𝐦𝐞 ⤞ ${uptime}

❖ 𝐅𝐞𝐜𝐡𝐚 ⤞ \`\`\`${horarioFecha}\`\`\`


┗━━━━━━━━━━┛

  「 🐉 *𝘔𝘌𝘕𝘜 𝘗𝘙𝘐𝘕𝘊𝘐𝘗𝘈𝘓* 」  
┣━━━━━━━━━━━━━━━━━━┫
┃ ৎ٠࣪⭑📜 ⋗ *menu*
┃ ৎ٠࣪⭑📜 ⋗ *menuff*
┗━━━━━━━━━━━━━━━━━━┛

  「 👥 *𝘎𝘙𝘜𝘗𝘖𝘚* 」  
┣━━━━━━━━━━━━━━━━━━┫
┃ ৎ٠࣪⭑🔇 ⋗ *mute*
┃ ৎ٠࣪⭑🔇 ⋗ *unmute*
┃ ৎ٠࣪⭑👢 ⋗ *kick* @user
┃ ৎ٠࣪⭑👻 ⋗ *fantasmas*
┃ ৎ٠࣪⭑📈 ⋗ *promote*
┃ ৎ٠࣪⭑📉 ⋗ *demote*
┃ ৎ٠࣪⭑📢 ⋗ *todos*
┃ ৎ٠࣪⭑📝 ⋗ *n* <texto>
┃ ৎ٠࣪⭑📊 ⋗ *encuesta*
┃ ৎ٠࣪⭑🔓 ⋗ *grupo abrir*
┃ ৎ٠࣪⭑🔓 ⋗ *grupo cerrar*
┃ ৎ٠࣪⭑⏰ ⋗ *abrirgrupoen* <horas>
┃ ৎ٠࣪⭑⏳ ⋗ *cerrargrupoen* <horas>
┃ ৎ٠࣪⭑⏰ ⋗ *horario*
┃ ৎ٠࣪⭑🔗 ⋗ *link*
┃ ৎ٠࣪⭑🗑️ ⋗ *del*
┃ ৎ٠࣪⭑🖼️ ⋗ *setfotogrupo*
┃ ৎ٠࣪⭑✏️ ⋗ *setnamegrupo*
┃ ৎ٠࣪⭑📜 ⋗ *setreglas*
┃ ৎ٠࣪⭑👋 ⋗ *setwelcome*
┃ ৎ٠࣪⭑👋 ⋗ *setbye*
┃ ৎ٠࣪⭑🎯 ⋗ *ruletaban*
┃ ৎ٠࣪⭑🎁 ⋗ *donarsala*
┗━━━━━━━━━━━━━━━━━━┛

  「 📥 *𝘋𝘌𝘚𝘊𝘈𝘙𝘎𝘈𝘚* 」  
┣━━━━━━━━━━━━━━━━━━┫
┃ ৎ٠࣪⭑🎵 ⋗ *play*
┃ ৎ٠࣪⭑📱 ⋗ *apk*
┃ ৎ٠࣪⭑🎬 ⋗ *ytmp3*
┃ ৎ٠࣪⭑🎬 ⋗ *ytmp4*
┃ ৎ٠࣪⭑🎧 ⋗ *spotify*
┃ ৎ٠࣪⭑🎧 ⋗ *spotifysearch*
┃ ৎ٠࣪⭑📸 ⋗ *instagram*
┃ ৎ٠࣪⭑🎭 ⋗ *tiktok*
<usuario>
┃ ৎ٠࣪⭑🎭 ⋗ *tiktokmr*
┃ ৎ٠࣪⭑🎥 ⋗ *fb* <link>
┗━━━━━━━━━━━━━━━━━━┛

  「 🫀 *𝘐𝘕𝘛𝘌𝘓𝘐𝘎𝘌𝘕𝘊𝘐𝘈 𝘈𝘙𝘛𝘐𝘍𝘐𝘊𝘐𝘈𝘓* 」  
┣━━━━━━━━━━━━━━━━━━┫
┃ ৎ٠࣪⭑✨ ⋗ *meta*
┃ ৎ٠࣪⭑🌌 ⋗ *geminis*
┃ ৎ٠࣪⭑💬 ⋗ *chatpg*
┃ ৎ٠࣪⭑🎨 ⋗ *imagen*
┃ ৎ٠࣪⭑👁️ ⋗ *visión*
┗━━━━━━━━━━━━━━━━━━┛

  「 🎭 *𝘚𝘛𝘐𝘊𝘓𝘌𝘙𝘚* 」  
┣━━━━━━━━━━━━━━━━━━┫
┃ ৎ٠࣪⭑🖌️ ⋗ *qc* 
┃ ৎ٠࣪⭑🎨 ⋗ *brat*
┃ ৎ٠࣪⭑🎨 ⋗ *bratv*
┃ ৎ٠࣪⭑😀 ⋗ *emojimix*
┃ ৎ٠࣪⭑🏷️ ⋗ *wm* 
┃ ৎ٠࣪⭑🌟 ⋗ *s*
┃ ৎ٠࣪⭑💩 ⋗ *scat*
┗━━━━━━━━━━━━━━━━━━┛

  「 🎨 *𝘌𝘋𝘐𝘊𝘐𝘖𝘕 & 𝘓𝘖𝘎𝘖𝘚* 」  
┣━━━━━━━━━━━━━━━━━━┫
┃ ৎ٠࣪⭑🔥 ⋗ *hd*
┃ ৎ٠࣪⭑🖼️ ⋗ *img* 
┃ ৎ٠࣪⭑🎞️ ⋗ *togif*
┃ ৎ٠࣪⭑🌐 ⋗ *tourl*
┃ ৎ٠࣪⭑❤️ ⋗ *logocorazon*
┃ ৎ٠࣪⭑❤️ ⋗ *logopareja*
┃ ৎ٠࣪⭑🎄 ⋗ *logosad*
┃ ৎ٠࣪⭑🐉 ⋗ *logodragonball*
┃ ৎ٠࣪⭑🐉 ⋗ *logonube*
┃ ৎ٠࣪⭑🐱 ⋗ *logagatito*
┃ ৎ٠࣪⭑🦾 ⋗ *logoguerrero*
┃ ৎ٠࣪⭑🍥 ⋗ *logonaruto*
┃ ৎ٠࣪⭑🚀 ⋗ *logofuturista*
┃ ৎ٠࣪⭑🚀 ⋗ *logocielo*
┃ ৎ٠࣪⭑🎨 ⋗ *logagraffiti3d*
┃ ৎ٠࣪⭑🎨 ⋗ *logamatrix*
┃ ৎ٠࣪⭑👻 ⋗ *logohorror*
┃ ৎ٠࣪⭑👻 ⋗ *logoalas*
┃ ৎ٠࣪⭑🏆 ⋗ *logogaming*
┃ ৎ٠࣪⭑🏆 ⋗ *logosolitario*
┃ ৎ٠࣪⭑🎮 ⋗ *logochicagamer*
┃ ৎ٠࣪⭑🎮 ⋗ *logopubg*
┃ ৎ٠࣪⭑🎮 ⋗ *logolol*
┃ ৎ٠࣪⭑👾 ⋗ *logoamongus*
┃ ৎ٠࣪⭑📖 ⋗ *logoportadaff*
┃ ৎ٠࣪⭑🐅 ⋗ *logovideointro*
┃ ৎ٠࣪⭑🎬 ⋗ *logovideogaming*
┗━━━━━━━━━━━━━━━━━━┛

  「 🎮 *𝘍𝘙𝘌𝘌 𝘍𝘐𝘙𝘌* 」  
┣━━━━━━━━━━━━━━━━━━┫
┃ ৎ٠࣪⭑⚔️ ⋗ *4vs4*
┃ ৎ٠࣪⭑⚔️ ⋗ *6vs6*
┃ ৎ٠࣪⭑⚔️ ⋗ *8vs8*
┃ ৎ٠࣪⭑⚔️ ⋗ *12vs12*
┃ ৎ٠࣪⭑⚔️ ⋗ *16vs16*
┃ ৎ٠࣪⭑🟦 ⋗ *cuadrilatero*
┃ ৎ٠࣪⭑🛑 ⋗ *hexagonal* 
┃ ৎ٠࣪⭑🔐 ⋗ *interna*
┃ ৎ٠࣪⭑🏝️ ⋗ *bermuda*
┃ ৎ٠࣪⭑💣 ⋗ *guerra*
┃ ৎ٠࣪⭑📜 ⋗ *reglasclk*
┗━━━━━━━━━━━━━━━━━━┛

  「 🧩 *𝘑𝘜𝘌𝘎𝘖𝘚 & 𝘋𝘐𝘝𝘌𝘙𝘚𝘐𝘖𝘕* 」  
┣━━━━━━━━━━━━━━━━━━┫
┃ ৎ٠࣪⭑❓ ⋗ *acertijo*
┃ ৎ٠࣪⭑❓ ⋗ *pregunta*
┃ ৎ٠࣪⭑❓ ⋗ *reto*
┃ ৎ٠࣪⭑🎲 ⋗ *dado*
┃ ৎ٠࣪⭑🛌 ⋗ *consejo*
┃ ৎ٠࣪⭑🛌 ⋗ *piropo*
┃ ৎ٠࣪⭑🔍 ⋗ *doxear*
┃ ৎ٠࣪⭑🤝 ⋗ *casar*
┃ ৎ٠࣪⭑🤝 ⋗ *divorcio*
┃ ৎ٠࣪⭑🤝 ⋗ *matrimonios*
┃ ৎ٠࣪⭑👫 ⋗ *formarpareja*
┃ ৎ٠࣪⭑👫 ⋗ *love*
┃ ৎ٠࣪⭑😍 ⋗ *minovia*
┃ ৎ٠࣪⭑😍 ⋗ *minovio*
┃ ৎ٠࣪⭑😍 ⋗ *enamorada*
┃ ৎ٠࣪⭑🤗 ⋗ *abrazar*
┃ ৎ٠࣪⭑🤗 ⋗ *besar*
┃ ৎ٠࣪⭑💃 ⋗ *triste*
┃ ৎ٠࣪⭑🔥 ⋗ *follar*
┃ ৎ٠࣪⭑🔥 ⋗ *violar*
┃ ৎ٠࣪⭑🔥 ⋗ *penetrar*
┃ ৎ٠࣪⭑🔥 ⋗ *horny*
┃ ৎ٠࣪⭑👑 ⋗ *top* <texto>
┃ ৎ٠࣪⭑👿 ⋗ *cachudo*
┃ ৎ٠࣪⭑👿 ⋗ *cachuda*
┃ ৎ٠࣪⭑😬 ⋗ *feo*
┃ ৎ٠࣪⭑😬 ⋗ *fea*
┃ ৎ٠࣪⭑🌈 ⋗ *gay*
┃ ৎ٠࣪⭑🌈 ⋗ *lesbiana*
┃ ৎ٠࣪⭑🐵 ⋗ *pajero*
┃ ৎ٠࣪⭑🐵 ⋗ *pajera*
┃ ৎ٠࣪⭑🐵 ⋗ *enano*
┃ ৎ٠࣪⭑🐵 ⋗ *enana*
┃ ৎ٠࣪⭑🇵🇪 ⋗ *peruano*
┃ ৎ٠࣪⭑🇵🇪 ⋗ *peruana*
┃ ৎ٠࣪⭑🇵🇪 ⋗ *rata*
┃ ৎ٠࣪⭑😈 ⋗ *puto*
┃ ৎ٠࣪⭑😈 ⋗ *puta*
┃ ৎ٠࣪⭑😈 ⋗ *prostituto*
┃ ৎ٠࣪⭑😈 ⋗ *prostituta*
┃ ৎ٠࣪⭑✊🏿 ⋗ *negro*
┃ ৎ٠࣪⭑✊🏿 ⋗ *negra*
┃ ৎ٠࣪⭑✊🏿 ⋗ *adoptado*
┃ ৎ٠࣪⭑✊🏿 ⋗ *adoptada*
┃ ৎ٠࣪⭑🤕 ⋗ *manco*
┃ ৎ٠࣪⭑🤕 ⋗ *manca*
┗━━━━━━━━━━━━━━━━━━┛

  「 ⚙️ *𝘊𝘖𝘕𝘍𝘐𝘎𝘜𝘙𝘈𝘊𝘐𝘖𝘕 / 𝘖𝘕-𝘖𝘍𝘍* 」  
┣━━━━━━━━━━━━━━━━━━┫
┃ ৎ٠࣪⭑⚙️ ⋗ *on welcome*
┃ ৎ٠࣪⭑⚙️ ⋗ *off welcome*
┃ ৎ٠࣪⭑⚙️ ⋗ *on antilink*
┃ ৎ٠࣪⭑⚙️ ⋗ *off antilink*
┃ ৎ٠࣪⭑⚙️ ⋗ *on antiarabes*
┃ ৎ٠࣪⭑⚙️ ⋗ *off antiarabes*
┃ ৎ٠࣪⭑⚙️ ⋗ *on detect*
┃ ৎ٠࣪⭑⚙️ ⋗ *off detect*
┃ ৎ٠࣪⭑⚙️ ⋗ *on modoadmin*
┃ ৎ٠࣪⭑⚙️ ⋗ *off modoadmin*
┃ ৎ٠࣪⭑⚙️ ⋗ *enable*
┃ ৎ٠࣪⭑⚙️ ⋗ *disable*
┗━━━━━━━━━━━━━━━━━━┛

  「 👑 *𝘊𝘙𝘌𝘈𝘋𝘖𝘓 / 𝘖𝘞𝘕𝘌𝘙* 」  
┣━━━━━━━━━━━━━━━━━━┫
┃ ৎ٠࣪⭑📡 ⋗ *ping*
┃ ৎ٠࣪⭑📡 ⋗ *runtime*
┃ ৎ٠࣪⭑👤 ⋗ *creador*
┃ ৎ٠࣪⭑🔄 ⋗ *update*
┃ ৎ٠࣪⭑🔄 ⋗ *reiniciar*
┃ ৎ٠࣪⭑⛔ ⋗ *banchat*
┃ ৎ٠࣪⭑⛔ ⋗ *unbanchat*
┃ ৎ٠࣪⭑🤖 ⋗ *setfotobot*
┃ ৎ٠࣪⭑🏷️ ⋗ *setbotname*
┃ ৎ٠࣪⭑📡 ⋗ *on antiprivado*
┃ ৎ٠࣪⭑📡 ⋗ *autoadmin*
┃ ৎ٠࣪⭑💡 ⋗ *lista grupos*
┃ ৎ٠࣪⭑🌐 ⋗ *salir*
┗━━━━━━━━━━━━━━━━━━┛

> © 𝑴𝑬𝑳𝑰𝑶𝑫𝑨𝑺 𝑩𝑶𝑻 𝖝 𝖩𝗎𝖺𝗇-𝖶𝗓`

  const randomVideo = videoUrl[Math.floor(Math.random() * videoUrl.length)]

await conn.sendMessage(
  m.chat,
  {
    video: { url: randomVideo },
    gifPlayback: true,
    caption: menu,
    mentions: [m.sender],
    contextInfo: {
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: global.ch || '120363419404216418@newsletter',
        newsletterName: '↯ 𝘔𝘌𝘓𝘐𝘖𝘋𝘈𝘚 𝘉𝘖𝘛 - 𝘊𝘏𝘈𝘕𝘕𝘌𝘓 𝟮𝟬𝟮𝟯'
      }
    }
  },
  { quoted: fakeQuoted }
) 
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu']

export default handler