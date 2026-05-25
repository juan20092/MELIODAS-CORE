import { smsg } from "./wzr/simple.js"
import fs from "fs"
import fetch from "node-fetch"

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

global.dfail = (type, m, conn) => {
  const msg = {
    rowner: '⚠️ 𝘈𝘤𝘤𝘦𝘴𝘰 𝘳𝘦𝘴𝘵𝘳𝘪𝘯𝘨𝘪𝘥𝘰 𝘓𝘰 𝘴𝘪𝘦𝘯𝘵𝘰',
    owner: '⚠️ 𝘊𝘰𝘮𝘢𝘯𝘥𝘰 𝘳𝘦𝘴𝘦𝘳𝘷𝘢𝘥𝘰 𝘌𝘴𝘵𝘦 𝘤𝘰𝘮𝘢𝘯𝘥𝘰 𝘦𝘴 𝘴𝘰𝘭𝘰 𝘱𝘢𝘳𝘢 𝘮𝘪 𝘱𝘳𝘰𝘱𝘪𝘦𝘵𝘢𝘳𝘪𝘰 𝘗𝘳𝘪𝘷𝘪𝘭𝘦𝘨𝘪𝘰𝘴 𝘦𝘹𝘤𝘭𝘶𝘴𝘪𝘷𝘰𝘴',
    mods: '⚠️ 𝘌𝘴𝘵𝘦 𝘤𝘰𝘮𝘢𝘯𝘥𝘰 𝘴𝘰𝘭𝘰 𝘭𝘰 𝘱𝘶𝘦𝘥𝘰 𝘶𝘴𝘢𝘳 𝘺𝘰 𝘗𝘳𝘪𝘷𝘪𝘭𝘦𝘨𝘪𝘰𝘴 𝘥𝘦 𝘮𝘰𝘥𝘦𝘳𝘢𝘥𝘰𝘳𝘦𝘴',
    premium: '⚠️ 𝘌𝘴𝘵𝘦 𝘤𝘰𝘮𝘢𝘯𝘥𝘰 𝘦𝘴 𝘴𝘰𝘭𝘰 𝘱𝘢𝘳𝘢 𝘶𝘴𝘶𝘢𝘳𝘪𝘰𝘴 𝘗𝘳𝘦𝘮𝘪𝘶𝘮 (𝘝𝘐𝘗)',
    group: '⚠️ 𝘊𝘰𝘮𝘢𝘯𝘥𝘰 𝘱𝘢𝘳𝘢 𝘨𝘳𝘶𝘱𝘰𝘴',
    private: '⚠️ 𝘊𝘰𝘮𝘢𝘯𝘥𝘰 𝘴𝘰𝘭𝘰 𝘱𝘢𝘳𝘢 𝘱𝘳𝘪𝘷𝘢𝘥𝘰',
    admin: '⚠️ 𝘕𝘦𝘤𝘦𝘴𝘪𝘵𝘢𝘴 𝘴𝘦𝘳 admin',
    botAdmin: '⚠️ 𝘌𝘭 𝘣𝘰𝘵 𝘯𝘦𝘤𝘦𝘴𝘪𝘵𝘢 𝘴𝘦𝘳 admin',
    restrict: '[ 🔐 ] 𝘊𝘰𝘮𝘢𝘯𝘥𝘰 𝘥𝘦𝘴𝘢𝘤𝘵𝘪𝘷𝘢𝘥𝘰'
  }[type]

  if (!msg) return

  const _ctx =
    global.fake?.contextInfo ||
    global.rcanal?.contextInfo ||
    null

  return conn.sendMessage(
    m.chat,
    { text: msg, contextInfo: _ctx },
    { quoted: m }
  )
}

export async function handler(chatUpdate) {
  try {

    let m = chatUpdate.messages?.[0]

    if (!m?.message) return
    if (m.key?.fromMe) return

    const conn = global.conn

    m = smsg(conn, m)

    if (!m.text) return

    let _user =
      global.db?.data?.users?.[m.sender] || {}

    const isROwner = [
      conn.decodeJid(global.conn.user.id),
      ...(global.owner || []).map(([number, tipo]) =>
        number.replace(/[^0-9]/g, '') +
        (tipo === 'jid'
          ? '@s.whatsapp.net'
          : '@lid')
      )
    ].includes(m.sender)

    const isOwner = isROwner || m.fromMe

    const isMods =
      isOwner ||
      (global.mods || []).map(v =>
        v.replace(/[^0-9]/g, '') +
        '@s.whatsapp.net'
      ).includes(m.sender)

    const isPrems =
      isROwner ||
      (global.prems || []).map(v =>
        v.replace(/[^0-9]/g, '') +
        '@s.whatsapp.net'
      ).includes(m.sender) ||
      _user.prem === true

    if (m.isBaileys) return

    m.exp = (m.exp || 0) + Math.ceil(Math.random() * 10)

    for (const name in global.plugins) {
      const plug = global.plugins[name]

      if (plug?.all && typeof plug.all === "function") {
        try {
          await plug.all.call(conn, m)
        } catch (e) {
          console.log(`❌ all error ${name}:`, e)
        }
      }
    }

    const prefix = /^[./#!]/

    if (!prefix.test(m.text)) return

    let usedPrefix = m.text.match(prefix)?.[0]

    const args = m.text
      .slice(usedPrefix.length)
      .trim()
      .split(/ +/)

    const command =
      args.shift()?.toLowerCase() || ""

    const text = args.join(" ")

    let groupMetadata = {}

    if (m.isGroup) {

      groupMetadata =
        conn.chats?.[m.chat]?.metadata

      if (
        !groupMetadata ||
        Object.keys(groupMetadata).length === 0
      ) {
        try {

          groupMetadata =
            await conn.groupMetadata(m.chat)

          if (!conn.chats[m.chat])
            conn.chats[m.chat] = {}

          conn.chats[m.chat].metadata =
            groupMetadata

        } catch {

          groupMetadata = {}
        }
      }
    }

    const participants = m.isGroup
      ? groupMetadata.participants || []
      : []

    const user = (
      m.isGroup
        ? participants.find(
            u =>
              conn.decodeJid(u.id) ===
              m.sender
          )
        : {}
    ) || {}

    const bot = (
      m.isGroup
        ? participants.find(u => {
            const id =
              conn.decodeJid(u.id)

            const botIds = [
              conn.decodeJid(
                global.conn.user?.jid || ''
              ),
              conn.decodeJid(
                global.conn.user?.lid || ''
              ),
              conn.decodeJid(
                global.conn.user?.id || ''
              )
            ]

            return botIds.includes(id)
          })
        : {}
    ) || {}

    const isRAdmin =
      user?.admin === 'superadmin'

    const isAdmin =
      isRAdmin ||
      user?.admin === 'admin'

    const isBotAdmin =
      ['admin', 'superadmin']
      .includes(bot?.admin)

    for (const name in global.plugins) {

      const plugin = global.plugins[name]

      if (!plugin) continue

      let match = false

      if (plugin.customPrefix instanceof RegExp) {

        match = plugin.customPrefix.test(
          usedPrefix + command
        )

      } else if (
        plugin.command instanceof RegExp
      ) {

        const src = plugin.command.source

        if (!src || src === '(?:)')
          continue

        const anchored = new RegExp(
          `^(?:${src})$`,
          plugin.command.flags.replace('g', '')
        )

        match = anchored.test(command)

      } else if (
        Array.isArray(plugin.command)
      ) {

        match = plugin.command
          .map(c =>
            String(c).toLowerCase()
          )
          .includes(command)

      } else if (
        typeof plugin.command === "string"
      ) {

        match =
          plugin.command.toLowerCase() ===
          command
      }

      if (!match) continue

      if (plugin.group && !m.isGroup)
        return global.dfail(
          "group",
          m,
          conn
        )

      if (plugin.private && m.isGroup)
        return global.dfail(
          "private",
          m,
          conn
        )

      if (plugin.owner && !isOwner)
        return global.dfail(
          "owner",
          m,
          conn
        )

      if (plugin.admin && !isAdmin)
        return global.dfail(
          "admin",
          m,
          conn
        )

      if (plugin.botAdmin && !isBotAdmin)
        return global.dfail(
          "botAdmin",
          m,
          conn
        )

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
          isROwner,
          isMods,
          isPrems,
          isAdmin,
          isBotAdmin
        })

      } catch (e) {

        console.log(
          `❌ Error en plugin ${name}`
        )

        console.log(e)
      }

      return
    }

  } catch (e) {

    console.log("❌ ERROR HANDLER GLOBAL")

    console.log(e)
  }
}
