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
