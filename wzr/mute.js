const mutedUsers = new Set()

export function muteUser(jid) {
  mutedUsers.add(jid)
}

export function unmuteUser(jid) {
  mutedUsers.delete(jid)
}

export function isMuted(jid) {
  return mutedUsers.has(jid)
}

export async function deleteMutedMessage(conn, m) {
  if (!m.isGroup) return false
  if (!isMuted(m.sender)) return false

  try {
    await conn.sendMessage(m.chat, {
      delete: m.key
    })
  } catch {}

  return true
}

export function getMutedUsers() {
  return [...mutedUsers]
}

export function clearMutedUsers() {
  mutedUsers.clear()
}