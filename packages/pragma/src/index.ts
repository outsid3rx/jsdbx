import {
  CreateTable,
  Field,
  From,
  ICreateTableProps,
  IFieldProps,
  IFromProps,
  IInsertProps,
  Insert,
  ISelectProps,
  IValueProps,
  IWhereProps,
  Select,
  Value,
  Where,
} from './components'

interface ComponentsMap {
  Select: typeof Select
  From: typeof From
  Where: typeof Where
  CreateTable: typeof CreateTable
  Field: typeof Field
  Insert: typeof Insert
  Value: typeof Value
}
interface ComponentsPropsMap {
  Select: ISelectProps
  From: IFromProps<string>
  Where: IWhereProps
  CreateTable: ICreateTableProps
  Field: IFieldProps
  Insert: IInsertProps
  Value: IValueProps
}

export const jsdbxPragma = {
  create<Component extends keyof ComponentsMap>(
    component: ComponentsMap[Component],
    props: ComponentsPropsMap[Component],
    ...children: ComponentsMap[Component][]
  ) {
    const resultProps = Object.assign(props ?? {}, { children })
    return component(resultProps as any)
  },
}

export { build } from './builder'
export {
  CreateTable,
  Field,
  From,
  Insert,
  Select,
  Value,
  Where,
} from './components'
