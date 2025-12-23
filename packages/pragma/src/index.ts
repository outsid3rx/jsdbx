import {
  From,
  IFromProps,
  ISelectProps,
  IWhereProps,
  Select,
  Where,
} from './components'

interface ComponentsMap {
  Select: typeof Select
  From: typeof From
  Where: typeof Where
}
interface ComponentsPropsMap {
  Select: ISelectProps
  From: IFromProps<string>
  Where: IWhereProps
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
export { From, Select, Where } from './components'
