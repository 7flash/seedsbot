const TelegramBot = require('node-telegram-bot-api')
const fp = require('fastify-plugin')
const dotenv = require('dotenv').config()

const token = process.env.BOT_TOKEN
const chatId = process.env.CHAT_ID

module.exports = fp(function (fastify, opts, next) {
  const telegram = new TelegramBot(token, { polling: false })

  fastify.decorate('sendTelegramMessage', function (title, body, image, account) {
    const message = `#gooddeed by ${account} \n\n *${title}* \n ${body}`

    return telegram.sendPhoto(
      chatId,
      image,
      {
        caption: message,
        "contentType": "image/png",
        parse_mode: "Markdown"
      }
    ).catch(err => { console.error(err) })
  })

  next()
})
