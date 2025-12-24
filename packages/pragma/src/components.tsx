export interface ISelectProps {
  fields: '*' | string[]
}

export interface IFromProps<Tables extends string = string> {
  table: Tables
}

export interface IWhereProps {
  assert: {
    [column: string]: {
      operator: string
      value: string | number
    }
  }
}

export interface ICreateTableProps {
  name: string
  ifNotExists?: boolean
}

export interface IFieldProps {
  name: string
  type: string
  constraints: string[]
}

export interface IInsertProps {
  name: string
  fields: string[]
}

export interface IValueProps {
  value: string | number
}

function createComponent<T extends object>(type: string) {
  return (props: T) => ({
    type,
    props,
  })
}

export const Select = createComponent<ISelectProps>('select')
export const From = createComponent<IFromProps>('from')
export const Where = createComponent<IWhereProps>('where')
export const CreateTable = createComponent<ICreateTableProps>('create-table')
export const Field = createComponent<IFieldProps>('field')
export const Insert = createComponent<IInsertProps>('insert')
export const Value = createComponent<IValueProps>('value')
