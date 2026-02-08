import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext } from "./server/context.js";
import { appRouter } from "./server/index.js";
import {
  generateOpenApiDocument,
  createOpenApiExpressMiddleware,
} from "trpc-to-openapi";
import fs from "fs/promises";

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  return res.json({ status: "Server is up and runnings" });
});
/* 👇 */
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "Mini Ecommerce App",
  baseUrl: "http://localhost:8000/api",
  version: "1.0.0",
});
fs.writeFile("openapi-specification.json", JSON.stringify(openApiDocument));
app.get("/openapi/json", (req, res) => res.json(openApiDocument));
app.use(
  "/api",
  createOpenApiExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);
app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
