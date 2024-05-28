# AutoCook-Backend

## Requirements

-   [NodeJS](https://nodejs.org/)
-   [pnpm](https://pnpm.io/)
-   [MySQL](https://dev.mysql.com/downloads/windows/installer/8.0.html) (no Oracle user needed, click the tiny link below the grey box)
-   [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) (no Oracle user needed, click the tiny link below the grey box)

For users of [Chocolatey](https://chocolatey.org/):

```powershell
choco install nodejs -y
choco install pnpm -y
choco install mysql -y
choco install mysql.workbench -y
```

## Before starting/testing this project

Create a `.env.development` (development) file with the following template.

```ini
NODE_ENV=development
PORT=9000
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=autocook
DATABASE_USERNAME=root
DATABASE_PASSWORD=root
AUTH_JWT_SECRET=eenveeltemoeilijksecretdatniemandooitzalradenandersisdesitegehacked
```

## Start this project

-   Install all dependencies: `pnpm install`
-   Make sure `.env.development` exists
-   create a local server in mysql with a scheme called `autocook`
-   Start the development server: `pnpm dev`