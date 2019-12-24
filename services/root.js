'use strict'

module.exports = function (fastify, opts, next) {
  fastify.get('/', function (request, reply) {
    reply.send({ root: true })
  })

  fastify.post('/', function (request, reply) {
    try {
      const body = typeof request.body == 'object' ? request.body : JSON.parse(request.body)
    
      const messageTitle = body['title']
      const messageBody = body['partial_body']
      const messageImage = body['image']
      const messageAccount = body['account_name']
      
      fastify.sendTelegramMessage(messageTitle, messageBody, messageImage, messageAccount)
  
      reply.send({
        success: true
      })
    } catch (err) {
      console.error(err)

      reply.send({
        success: false
      })
    }
  })

  next()
}

// If you prefer async/await, use the following
//
// module.exports = async function (fastify, opts) {
//   fastify.get('/', async function (request, reply) {
//     return { root: true }
//   })
// }
