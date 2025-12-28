import type { RequestListener } from 'node:http'
import fs from 'node:fs'
import path from 'node:path'

const staticPath = path.join(process.cwd(), 'static')

export const serveStatic: RequestListener = (req, res) => {
  const requestedFileName = req.url!.replace('/static', '')
  const requestedFile = path.join(staticPath, requestedFileName)

  res.setHeader('Content-Type', getContentType(requestedFile))
  fs.createReadStream(requestedFile).on('error', (error) => {
    if (error.message.startsWith('ENOENT')) {
      res.statusCode = 404
      res.end('Not Found')
    } else {
      res.statusCode = 500
      res.end(error.message)
    }
  }).pipe(res)
}

const getContentType = (file: string) => {
  const ext = file.split('.').pop()
  switch (ext) {
    default:
      return 'text/plain'
  }
}
