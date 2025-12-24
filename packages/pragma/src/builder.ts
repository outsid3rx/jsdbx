import {
  CreateTable,
  Field,
  From,
  Insert,
  Select,
  Value,
  Where,
} from './components'

interface QueryNode {
  type: 'select' | 'from'
  props: Record<string, unknown>
  children: QueryNode[]
}

const isSelectNode = (value: object): value is ReturnType<typeof Select> =>
  'type' in value && value.type === 'select'
const isFromNode = (value: object): value is ReturnType<typeof From> =>
  'type' in value && value.type === 'from'
const isWhereNode = (value: object): value is ReturnType<typeof Where> =>
  'type' in value && value.type === 'where'
const isCreateTableNode = (
  value: object,
): value is ReturnType<typeof CreateTable> =>
  'type' in value && value.type === 'create-table'
const isFieldNode = (value: object): value is ReturnType<typeof Field> =>
  'type' in value && value.type === 'field'
const isInsertNode = (value: object): value is ReturnType<typeof Insert> =>
  'type' in value && value.type === 'insert'
const isValueNode = (value: object): value is ReturnType<typeof Value> =>
  'type' in value && value.type === 'value'

export const build = (queryNode: QueryNode) => {
  const result: string[] = []

  switch (true) {
    case isCreateTableNode(queryNode): {
      const { props } = queryNode
      result.push(
        `CREATE TABLE ${props.ifNotExists ? 'IF NOT EXISTS' : ''} ${props.name} (${(props.children as QueryNode[]).map(build).join(', ')});`,
      )

      break
    }
    case isInsertNode(queryNode): {
      const { props } = queryNode
      result.push(
        `INSERT INTO ${props.name} (${props.fields.join(', ')}) VALUES (${(props.children as QueryNode[]).map(build).join(', ')});`,
      )

      break
    }
    case isSelectNode(queryNode): {
      const { props } = queryNode
      result.push(
        `SELECT ${typeof props.fields === 'string' ? props.fields : props.fields.join(', ')}`,
        ...(props.children as QueryNode[]).map(build),
      )

      break
    }
    case isFromNode(queryNode): {
      const { props } = queryNode
      result.push(`FROM ${props.table}`)

      break
    }
    case isWhereNode(queryNode): {
      const { props } = queryNode
      const fields = Object.entries(props.assert).map(
        ([field, { operator, value }]) => [
          `${field} ${operator} ${typeof value === 'string' ? `'${value}'` : value}`,
        ],
      )
      result.push(`WHERE ${fields.join(' AND ')}`)

      break
    }
    case isFieldNode(queryNode): {
      const { props } = queryNode
      result.push(`${props.name} ${props.type} ${props.constraints.join(' ')}`)

      break
    }
    case isValueNode(queryNode): {
      const { props } = queryNode
      result.push(
        typeof props.value === 'string'
          ? `'${props.value}'`
          : String(props.value),
      )

      break
    }
    default:
      throw new Error(`Unknown query node: ${queryNode}`)
  }

  return result.join(' ')
}
