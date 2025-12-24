import {
  build,
  CreateTable,
  Field,
  From,
  Insert,
  jsdbxPragma as _h,
  Select,
  Value,
  Where,
} from '@jsdbx/pragma'
import { nanoid } from 'nanoid'
import { DatabaseSync } from 'node:sqlite'

export class Repository {
  constructor() {
    this.db = new DatabaseSync(':memory:')
  }

  init() {
    this.db.exec(
      build(
        <CreateTable name="links" ifNotExists>
          <Field name="hash" type="TEXT" constraints={['PRIMARY KEY']} />
          <Field name="url" type="TEXT" constraints={['NOT NULL']} />
        </CreateTable>,
      ),
    )
  }

  addLink(link) {
    const hash = nanoid(6)

    this.db.exec(
      build(
        <Insert name="links" fields={['hash', 'url']}>
          <Value value={hash} />
          <Value value={link} />
        </Insert>,
      ),
    )

    return hash
  }

  getLink(hash) {
    const query = this.db.prepare(
      build(
        <Select fields={['url']}>
          <From table="links" />
          <Where assert={{ hash: { operator: '=', value: hash } }} />
        </Select>,
      ),
    )

    return query.get()
  }
}
