const express = require('express')
const apiRoutes = express.Router()
const blockRoutes = require('./block')

apiRoutes.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to the API',
  v1: '/api/v1'
}))

// apiRoutes.use('/auth', authRoutes)
apiRoutes.use('/block', blockRoutes)

module.exports = apiRoutes