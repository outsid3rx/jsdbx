export interface ISelectProps {
  fields: '*' | string[]
}

export interface IFromProps<Tables extends string> {
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

export const Select = (props: ISelectProps) => {
  return {
    type: 'select',
    props,
  }
}

export const From = <T extends string = string>(props: IFromProps<T>) => {
  return {
    type: 'from',
    props,
  }
}

export const Where = (props: IWhereProps) => {
  return {
    type: 'where',
    props,
  }
}

export const CreateTable = (props: ICreateTableProps) => {
  return {
    type: 'create-table',
    props,
  }
}

export const Field = (props: IFieldProps) => {
  return {
    type: 'field',
    props,
  }
}

export const Insert = (props: IInsertProps) => {
  return {
    type: 'insert',
    props,
  }
}

export const Value = (props: IValueProps) => {
  return {
    type: 'value',
    props,
  }
}
