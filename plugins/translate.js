const translate = require('translate-google-api')
const defaultLang = 'id'
const tld = null

let handler = async (m, { args, usedPrefix, command }) => {
    let err = `
Contoh:
${usedPrefix + command} <lang> [text]
${usedPrefix + command} id your messages

Daftar bahasa yang didukung: https://cloud.google.com/translate/docs/languages
`.trim()

    let lang = args[0]
    let text = args.slice(1).join(' ')
    if (!text && !m.quoted) throw "Masukkan teks atau reply pesan tersebut."
    if ((args[0] || '').length !== 2) {
        lang = defaultLang
        text = args.join(' ')
    }
    if (!text && m.quoted && m.quoted.text) text = m.quoted.text

    let result
    try {
        result = await translate(`${text}`, {
            tld,
            to: lang,
        })
    } catch (e) {
        result = await translate(`${text}`, {
            tld,
            to: defaultLang,
        })
        throw err
    } finally {
        m.reply(result[0])
    }

}
handler.help = ['translate'].map(v => v + ' <kodebahasa> <teks>')
handler.tags = ['tools']
handler.command = /^(tr(anslate)?)$/i
handler.limit = true
handler.fail = null
handler.exp = 0
module.exports = handler
