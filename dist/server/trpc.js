import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
const t = initTRPC.context().meta().create();
export const router = t.router;
export const publicProcedure = t.procedure;
