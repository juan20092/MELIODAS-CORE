import { setTimeout as delay } from 'timers/promises'

global.groupMetaCache ||= new Map()

function bind(conn) {
  if (conn.__storeBound) return
  conn.__storeBound = true

  if (!conn.chats) conn.chats = Object.create(null)

  const upsert = id => {
    return conn.chats[id] ||= { id }
  }

  const updateContacts = list => {
    list = list?.contacts || list
    if (!Array.isArray(list)) return

    for (const c of list) {
      const id = conn.decodeJid(c.id)
      if (!id || id === 'status@broadcast') continue

      const chat = upsert(id)
      if (id.endsWith('@g.us')) {
        chat.subject ||= c.subject || c.name || ''
      } else {
        chat.name ||= c.notify || c.name || ''
      }
    }
  }

  conn.ev.on('contacts.upsert', updateContacts)
  conn.ev.on('contacts.set', updateContacts)

  conn.ev.on('chats.set', async ({ chats }) => {
    const gruposParaCargar = []

    for (let { id, name, readOnly } of chats || []) {
      id = conn.decodeJid(id)
      if (!id || id === 'status@broadcast') continue

      const chat = upsert(id)
      chat.isChats = !readOnly

      if (name) {
        if (id.endsWith('@g.us')) chat.subject = name
        else chat.name = name
      }

      if (id.endsWith('@g.us') && !global.groupMetaCache.has(id)) {
        gruposParaCargar.push({ id, chat })
      }
    }

    if (gruposParaCargar.length > 0) {
      (async () => {
        for (const item of gruposParaCargar) {
          try {
            
            await delay(2500) 
            
            if (global.groupMetaCache.has(item.id)) continue

            const meta = await conn.groupMetadata(item.id).catch(() => null)
            if (meta) {
              global.groupMetaCache.set(item.id, meta)
              item.chat.subject = meta.subject
              item.chat.metadata = meta
            }
          } catch (e) {
          }
        }
      })()
    }
  })

  conn.ev.on('groups.update', async updates => {
    for (const u of updates || []) {
      const id = conn.decodeJid(u.id)
      if (!id || !id.endsWith('@g.us')) continue

      const chat = upsert(id)
      chat.isChats = true

      if (u.subject) chat.subject = u.subject

      try {
        const meta = await conn.groupMetadata(id).catch(() => null)
        if (meta) {
          global.groupMetaCache.set(id, meta)
          chat.metadata = meta
        }
      } catch {}
    }
  })

  conn.ev.on('presence.update', ({ id, presences }) => {
    const sender = Object.keys(presences || {})[0] || id
    const jid = conn.decodeJid(sender)
    if (!jid) return

    upsert(jid).presences = presences[sender]?.lastKnownPresence || 'composing'
  })
}

export default {
  bind
}

