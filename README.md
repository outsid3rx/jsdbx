# jsdbx

[Демо](https://dlinks.ru)
[Docs on english](./docs/README.en.md)

![Демо](./docs/code.png)

А что, если бы `SQL`-запросы можно было бы верстать так, словно пишешь `React`-компоненты?

## Описание

Это шуточный проект и демонстрация возможности, не стоит воспринимать эту шутку близко к сердцу.
В проекте реализована `pragma` и библиотека компонентов для построения SQL-запросов поверх `Babel` и `@babel/plugin-transform-react-jsx`

## Пример работы

Для примера можно рассмотреть файл `repository.tsx` из `./apps/server/src`

```jsx
import { build, CreateTable, Field, jsdbxPragma as _h } from '@jsdbx/pragma'

db.exec(
  build(
    <CreateTable name="links" ifNotExists>
      <Field name="hash" type="TEXT" constraints={['PRIMARY KEY']} />
      <Field name="url" type="TEXT" constraints={['NOT NULL']} />
    </CreateTable>
  )
)
```

Компоненты превращаются в дерево из которого утилита `build` собирает конечный запрос.
Импорт `jsdbxPragma` необходим для верной подстановки и вызова функции после транспиляции.

## Установка и запуск локально

В первую очередь необходимо установить зависимости:

```shell
yarn install
```

Далее необходимо собрать пакет `pragma` и приложение `server`:

```shell
yarn workspace @jsdbx/pragma build
yarn workspace @jsdbx/server build
```

Далее необходимо запустить приложение `web`:

```shell
yarn workspace @jsdbx/web build
```

## Запуск в продакшн-режиме

Для запуска в продакшн-режиме достаточно собрать и запустить Docker-образ, указав в переменной домен приложения:

```shell
docker build --build-arg VITE_PUBLIC_HOST=$HOST .
docker run -p 3000:3000 $HASH
```