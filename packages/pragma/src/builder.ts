import { From, Select, Where } from './components'

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

export const build = (queryNode: QueryNode) => {
  const result: string[] = []

  switch (true) {
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
    default:
      throw new Error(`Unknown query node: ${queryNode}`)
  }

  return result.join(' ')
}
