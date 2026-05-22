import { smsg } from "./wzr/simple.js"
import fs from "fs"

global.plugins = {}
global.groupMetaCache ||= new Map()

const pluginFolder = "./plugins"

async function loadPlugins() {
  for (const file of fs.readdirSync(pluginFolder)) {
    if (!file.endsWith(".js")) continue

    try {
      const mod = await import(`./plugins/${file}?update=${Date.now()}`)
      global.plugins[file] = mod.default || mod
      console.log(`✅ Plugin cargado → ${file}`)
    } catch (e) {
      console.log(`❌ Error plugin → ${file}`)
      console.log(e)
    }
  }
}

await loadPlugins()

fs.watch(pluginFolder, async (_, file) => {
  if (!file?.endsWith(".js")) return

  try {
    console.log(`♻️ Plugin actualizado → ${file}`)
    delete global.plugins[file]

    const mod = await import(`./plugins/${file}?update=${Date.now()}`)
    global.plugins[file] = mod.default || mod
  } catch (e) {
    console.log(`❌ Error recargando → ${file}`)
    console.log(e)
  }
})

const DIGITS = s => String(s || "").replace(/\D/g, "")

const OWNER_NUMBERS = (global.owner || []).map(v =>
  DIGITS(Array.isArray(v) ? v[0] : v)
)

global.dfail = (type, m, conn) => {
  const msg = {
    owner: "⚠️ Solo el owner puede usar esto",
    admin: "⚠️ Solo administradores",
    botAdmin: "⚠️ Necesito ser admin",
    group: "⚠️ Solo en grupos",
    private: "⚠️ Solo en privado"
  }[type]

  if (!msg) return
  conn.sendMessage(m.chat, { text: msg }, { quoted: m })
}


export async function handler(chatUpdate) {
  try {
    const m = chatUpdate.messages?.[0]
    if (!m?.message) return
    if (m.key?.fromMe) return

    const conn = global.conn

    m = smsg(conn, m)

    if (!m.text) return


    const prefix = /^[./#!]/
    const isPrefix = prefix.test(m.text)

    if (!isPrefix) return

    const usedPrefix = m.text.match(prefix)[0]

    const args = m.text
      .slice(usedPrefix.length)
      .trim()
      .split(/ +/)

    const command = args.shift()?.toLowerCase() || ""
    const text = args.join(" ")

    let groupMetadata = null
    let participants = []
    let isAdmin = false
    let isBotAdmin = false

    if (m.isGroup) {
      let cached = global.groupMetaCache.get(m.chat)

      if (!cached || Date.now() - cached.ts > 15000) {
        groupMetadata = await conn.groupMetadata(m.chat)
        participants = groupMetadata.participants || []

        const adminSet = new Set()

        for (const p of participants) {
          const num = DIGITS(p.id)
          if (p.admin) adminSet.add(num)
        }

        cached = {
          ts: Date.now(),
          meta: groupMetadata,
          adminSet
        }

        global.groupMetaCache.set(m.chat, cached)
      }

      groupMetadata = cached.meta
      participants = groupMetadata.participants

      const senderNum = DIGITS(m.sender)
      const botNum = DIGITS(conn.user.id)

      isAdmin = cached.adminSet.has(senderNum)
      isBotAdmin = cached.adminSet.has(botNum)
    }

    const isOwner = (global.owner || [])
      .map(v => DIGITS(v))
      .includes(DIGITS(m.sender)) || m.fromMe


    for (const name in global.plugins) {
      const plugin = global.plugins[name]
      if (!plugin) continue

      let match = false

      if (plugin.command instanceof RegExp) {
        match = plugin.command.test(command)
      } else if (Array.isArray(plugin.command)) {
        match = plugin.command.includes(command)
      } else if (typeof plugin.command === "string") {
        match = plugin.command === command
      }

      if (!match) continue


      if (plugin.group && !m.isGroup)
        return global.dfail("group", m, conn)

      if (plugin.private && m.isGroup)
        return global.dfail("private", m, conn)

      if (plugin.owner && !isOwner)
        return global.dfail("owner", m, conn)

      if (plugin.admin && !isAdmin)
        return global.dfail("admin", m, conn)

      if (plugin.botAdmin && !isBotAdmin)
        return global.dfail("botAdmin", m, conn)

      try {
        await plugin(m, {
          conn,
          args,
          text,
          command,
          usedPrefix,
          participants,
          groupMetadata,
          isOwner,
          isAdmin,
          isBotAdmin
        })
      } catch (e) {
        console.log(`❌ Error en plugin ${name}`)
        console.log(e)
      }

      return
    }

  } catch (e) {
    console.log("❌ ERROR HANDLER GLOBAL")
    console.log(e)
  }
}
