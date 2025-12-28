import type { RequestListener } from 'node:http'
import fs from 'node:fs'
import path from 'node:path'

const staticPath = path.join(process.cwd(), 'static')

export const serveHome: RequestListener = (_req, res) => {
  res.setHeader('Content-Type', 'text/html')
  fs.createReadStream(path.join(staticPath, 'index.html')).on('error', (error) => {
    if (error.message.startsWith('ENOENT')) {
      res.statusCode = 404
      res.end('Not Found')
    } else {
      res.statusCode = 500
      res.end(error.message)
    }
  }).pipe(res)
}
