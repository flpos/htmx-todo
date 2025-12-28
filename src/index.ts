import http from 'node:http'
import { serveHome } from './serve-home.js'
import { serveStatic } from './serve-static.js'
import { todoRoutes } from './domain/todo/Todo.routes.js'

const PORT = 8080
const server = http.createServer(async (req, res) => {
  if (!req.url) {
    return res.end()
  }

  if (req.url === '/') {
    return serveHome(req, res)
  }

  if (req.url.startsWith('/static/')) {
    return serveStatic(req, res)
  }

  if (req.url.startsWith('/api/todos')) {
    req.url = req.url.replace('/api/todos', '')
    return todoRoutes(req, res)
  }

  res.statusCode = 404
  res.end('Nao encontrado')
})

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
