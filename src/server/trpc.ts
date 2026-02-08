import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import type { OpenApiMeta } from "trpc-to-openapi";
import type { Context } from "./context.js";

const t = initTRPC.context<Context>().meta<OpenApiMeta>().create();
export const router = t.router;
export const publicProcedure = t.procedure;
