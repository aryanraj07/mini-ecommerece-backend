# Project Setup

```node
pnpm init
```

### Dev dependcies

```pnpm
pnpm i typescript @types/node tsc-watch

```

### Installing express

```pnpm
pnpm i express
pnpm i @types/express -D
```

## Initialize typescript

```pnpm
tsc --init
```

### Initialize a dev script in package.json

```json
"dev": "tsc-watch --onSuccess \"node dist/index\"",
```

# Seeding Database

```ts
pnpm i @faker-js/faker

```

Was facing error in database seeding with prisma v7 setup so what i changed is

## Prisma Schema provider

```ts
 generator client {
  provider = "prisma-client-js"
}
```

### Create Src Directory

> Create a file index.ts and iniitalize the app using express

## Seed apdaptor provider

> IN prisma client a provider is needed unlike prisma cli

```ts
import "dotenv/config";
import { faker } from "@faker-js/faker";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Prisma } from "@prisma/client";
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
  adapter,
});
```

## Migration of schema into db

>

```ts
npx prisma migrate dev --name init
```

## Generate prisma to regenrate client

```ts
npx prisma generate
```

## Seed the Database

```ts
npx prisma  db seed
```

# Trpc Setup

## Benifits

> Apis are

1. Type Safed

2) Well Structured
3) Input Output Validation
4) Open api spec layer over the api for good docs

### Install Trpc

```pnpm
pnpm add @trpc/server
```

> ### Create a router instance

server/trpc.ts

```ts
import { initTRPC } from "@trpc/server";
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create();
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
```

### Next, we'll initialize our main router instance, commonly referred to as appRouter, in which we'll later add procedures to. Lastly, we need to export the type of the router which we'll later use on the client side

server/index.ts

```ts
import { router } from "./trpc"; // Root router
const appRouter = router({
  // ...
});
// Export type router type signature,
// NOT the router itself.
// This type will later used by fronted
export type AppRouter = typeof appRouter;
```
