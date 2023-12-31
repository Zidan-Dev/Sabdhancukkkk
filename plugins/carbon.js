let Carbon = require("unofficial-carbon-now")

let handler = async(m, { conn, usedPrefix, command, text }) => {
  if (!m.quoted && !text) throw `• *Example* : ${usedPrefix + command} text/reply\n\n_Gesek pesan ini kekanan untuk membuat gambar teks *carbon*_`             
  m.reply('Wait diproses..')
  let buat = new Carbon.createCarbon().setCode(m.quoted ? m.quoted.text : text)
  let hasil = await Carbon.generateCarbon(buat)
  conn.sendMedia(m.chat, hasil, m)
}
handler.help = ['carbon'].map(v => v + ' <text>')
handler.tags = ['maker']
handler.command = /^(carbon)$/i
handler.limit = true
module.exports = handler
