# Шаблон Фронтенда

> Данная инструкция актуальна для всех фронтендов, написанных на этом шаблоне. Также частично подходит для других фронтендов, но изменения могут быть значительными в зависимости от используемых технологий.

> Не забывайте, чтобы фронтенды на шаблоне - не значит что они будут болт-в-болт деплоемы по этой инструкции. Эта инструкция - общий ориентир.

> Шаблон содержит настроенные автолинтеры и хуки которые будут запускаться автоматически при коммите.

# Содержание

-   [Быстрый запуск - ручной](#1)
-   [Полезности](#2)
-   [Правила работы с git](#3)
-   [Список используемых технологий](#4)
-   [Список используемых библиотек](#5)

# <a name="1">Быстрый запуск</a>

### Требования

-   Node.js 18+

### Инструкция

1. Скопируйте `.env.example` в `.env` и измените в соответствии со своим окружением.
2. Запустите `npm i`.
3. Запустите `npm run dev`.
4. Наслаждайтесь.

# <a name="2">Полезности</a>

1. Сгенерировать build файл в /public папке: `npm run generate:build`
2. Упрощенный коммит через терминал: `npm run commit`
3. Поднять версию приложения, обновить app.json и сгенерировать CHANGELOG.md:

    - `npm run release`
    - `npm run release:alpha` - для альфа версий
    - `npm run release:beta` - для бета версий
    - `npm run release:patch` - для патч версий
    - `npm run release:minor` - для минор версий
    - `npm run release:major` - для мажор версий

    > После этих комманд нужно будет обязательно вызвать `git push --follow-tags origin develop` что бы запушить тег версии на гитхаб.

# <a name="3">Правила работы с репозиторием</a>

1. Все изменения вносятся в новую ветку созданную на основе `develop`.
2. Каждый коммит должен быть сопровожден комментарием, описывающим суть изменений.
3. Оформление коммитов должно соответствовать [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). (можно оформлять через `npm run commit`)
    - `feature` - новая функциональность
    - `fix` - исправление ошибок
    - `refactor` - изменение кода без исправления ошибок и добавления новых функций
    - `style` - изменение стилей
    - `test` - добавление тестов
    - `docs` - изменение документации
    - `chore` - изменение конфигурации проекта и другие вспомогательные изменения
4. После завершения работы над задачей, создается **Merge Request** в ветку `develop`.
5. Каждый **Merge Request** должен содержать ссылки на задачи которые он решает.
6. Необходимо указывать в **Merge Request** проверяющего кода (обычно это **Team Lead** или **Tech Lead** проекта).

# <a name="4">Список используемых технологий</a>

-   React
-   Vite
-   TypeScript

# <a name="5">Список используемых библиотек</a>

-   axios - для HTTP запросов
-   mantine - для работы с UI
-   react-router - для роутинга
-   react-hook-form - для работы с формами
-   vite - для сборки проекта и запуска dev сервера
-   vite-plugin-checker - для проверки типов во время разработки
-   typescript - для типизации всего проекта и его зависимостей (включая библиотеки)
-   eslint - для линтинга
-   zustand - для работы с глобальным стейтом
-   zod - для валидации входных данных
-   radash - содержит удобные функции для работы с массивами и объектами
-   dayjs - для работы с датой и временем
-   @tanstack/react-query - для работы с запросами
-   @tanstack/table - для работы с таблицами
-   iconify - для иконок в UI
-   lint-staged - для запуска линтеров перед коммитом
-   husky - для запуска хуков перед коммитом
-   prettier - для форматирования кода
-   sort-package-json - для сортировки package.json
-   @trivago/prettier-plugin-sort-imports - для сортировки импортов

# <a name="6">Список расширений</a>

### Visual Studio Code

-   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
-   [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
-   [Console Ninja](https://marketplace.visualstudio.com/items?itemName=WallabyJs.console-ninja)
-   [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
-   [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
-   [IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)
-   [Pretty TypeScript Errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors)
-   [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify)
