const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const express = require('express')
const bodyParser = require('body-parser')
const apiRoutes = require('./api-routes')

app.prepare().then(() => {
	const server = express()
	server.use(bodyParser.json({limit: '50mb'}))
	server.use('/api/v1', apiRoutes)

	server.get('*', (req, res) => {
		return app.render(req, res, '/blocks', req.query)
	})

	server.get('*', (req, res) => {
		return handle(req, res)
  })

	server.listen(process.env.PORT || 5000, (err) => {
    if (err) throw err
    console.log('Ready on http://localhost:5000')
  })
})