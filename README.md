Bootstrap 5.1 design study
===

💄 In this repository, I tried to study Bootstrap 5.1 and making calendar design without any libraries such as FullCalendar.

- Docker: 対応!
- Node.js: 24! (lint と test 用)
- Linter: html-validate, stylelint!
- Test: node:test!
- Bootstrap: 5.1.3!
- Font Awesome: 5.15.4!

## パッと実行してみたい

```bash
docker compose up --build web
# http://localhost:8080 を開く
```

lint と test のやり方は [README4DEV.md](./README4DEV.md) にあるよ。

https://user-images.githubusercontent.com/28250432/154175414-28294cef-3086-4e24-b87a-148a1310f89d.mp4

## Bootstrap v5

- https://getbootstrap.com/docs/5.1/migration/

There are some differences and breaking changes between v4 and v5. For example, `.right-*` is renamed to `.end-*`. It's interesting.

![migrating](https://user-images.githubusercontent.com/28250432/153972507-98fdddf3-44af-4148-8f67-cd2eb0ec4b02.png)

## New things in this repository

- Tried to use `shadow`,
- Tried not to use `left` nor `right` but to use `start` and `end` those are new in v5,
- Tried to use `d-grid` to make buttons block,
- Tried not to use `my-1` to place spaces but to use `gy-1`,
- Tried to create my original navbar with dropdown menu,
- Tried to create calendar by myself,
- Tried to overwrite Bootstrap default colors,
