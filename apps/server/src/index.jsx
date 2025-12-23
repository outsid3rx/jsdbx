import { H3, HTTPError, readBody, redirect, serve, serveStatic } from 'h3'
import { readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { object, pipe, safeParse, string, url } from 'valibot'

import { Repository } from './repository'

const app = new H3()
const repository = new Repository()

const urlValidation = object({
  link: pipe(string(), url('The url is badly formatted.')),
})

repository.init()

const staticHandler = (event) => {
  return serveStatic(event, {
    indexNames: ['/index.html'],
    getContents: (id) => readFile(join('./public', id)),
    getMeta: async (id) => {
      const stats = await stat(join('./public', id)).catch(() => {})
      if (stats?.isFile()) {
        return {
          size: stats.size,
          mtime: stats.mtimeMs,
        }
      }
    },
  })
}

app.post('/api/create/', async (event) => {
  const body = await readBody(event)
  const { success } = safeParse(urlValidation, body)

  if (!success) {
    throw new HTTPError('Invalid link', { status: 400 })
  }

  return {
    link: repository.addLink(body.link),
  }
})
app.get('/r/:hash', (event) =>
  redirect(repository.getLink(event.context.params.hash).url),
)
app.use('/*', staticHandler)
app.use('/assets/*', staticHandler)

serve(app, { port: 3000 })
