const fp = require('fastify-plugin')
const bearerAuthPlugin = require('fastify-bearer-auth')
const dotenv = require('dotenv').config()

const authToken =  process.env.AUTH_TOKEN

module.exports = fp(function (fastify, opts, next) {
    fastify.register(bearerAuthPlugin, { keys: [authToken] })

    next()
})