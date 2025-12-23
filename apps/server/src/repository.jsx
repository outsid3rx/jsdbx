import { build, From, jsdbxPragma as _h, Select, Where } from '@jsdbx/pragma'
import { nanoid } from 'nanoid'
import { DatabaseSync } from 'node:sqlite'

export class Repository {
  constructor() {
    this.db = new DatabaseSync(':memory:')
  }

  init() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS links (
        hash TEXT PRIMARY KEY,
        url  TEXT NOT NULL
      );
    `)
  }

  addLink(link) {
    const insert = this.db.prepare(
      'INSERT INTO links (hash, url) VALUES (?, ?)',
    )
    const hash = nanoid(6)
    insert.run(hash, link)

    return hash
  }

  getLink(hash) {
    const query = this.db.prepare(
      build(
        <Select fields="*">
          <From table="links" />
          <Where assert={{ hash: { operator: '=', value: hash } }} />
        </Select>,
      ),
    )

    return query.get()
  }
}
