## About project

This projects is example of tRPC API with Prisma ORM. API has not been tested in production and in terms of security.
To use API you need tRPC client. I created CLI for this purpose which acts as a client - https://github.com/kamil-kubiczek/expense-tracker-cli
Feel free to fork or inspire.

**Project status: 🟢Ready to use**

**Warning: 🟡Although `production` mode exists, code has not been tested production**



## Features

Features are described here - https://roadmap.sh/projects/expense-tracker-api


## Installation
### 1. Clone this repository
```
git clone https://github.com/kamil-kubiczek/expense-tracker-api
```

### 2. Install npm dependencies using  bun
```
bun i 
```



## How to run API

**Prerequisites:**

-  must have `bun` installed
-  must have `npm@8.19.4 or higher` installed

**Steps**

1. Copy `.env.example` and rename to `.env`
2. Generate 2x base64 strings for JWT secrets
3. Change NODE_ENV to `development`. `production` mode needs `CLIENT_URL` to be set up to handle CORS properly
4. Run `bun run start` in CLI


## Testing

I made E2E tests using Vitest. I know they aren't very usefull, but as an example they work perfectly.
Run tests using `npm run test`

