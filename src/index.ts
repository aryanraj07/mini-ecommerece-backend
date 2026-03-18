import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext } from "./server/context.js";
import crypto from "crypto";

import { appRouter } from "./server/index.js";
import cookieParser from "cookie-parser";

import {
  generateOpenApiDocument,
  createOpenApiExpressMiddleware,
} from "trpc-to-openapi";
import fs from "fs/promises";
import fss from "fs";

import cors from "cors";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const ssl = {
  ca: fss.readFileSync("./ca.pem").toString(),
};
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});
const app = express();
const allowedOrigins = [
  "http://localhost:3000",
  "https://mini-ecommerce-full-mini-ecommerce.vercel.app",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(cookieParser());
app.post(
  "/api/webhook/razorpay",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    console.log("🔔 Razorpay Webhook Hit");
    const singnature = req.headers["x-razorpay-signature"] as string;
    console.log("➡️ Received Signature:", singnature);
    const rawBody = req.body.toString();
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(rawBody)
      .digest("hex");
    if (expectedSignature !== singnature) {
      console.log("❌ Invalid Signature");
      return res.status(400).send("Invalid Signature");
    }
    const event = JSON.parse(rawBody);
    // console.log("FULL EVENT:", JSON.stringify(event, null, 2));

    console.log("✅ Signature Verified");
    console.log("📦 Event Type:", event.event);
    try {
      if (event.event === "payment.captured") {
        const payment = event.payload.payment.entity;
        console.log("💰 Payment Captured:", payment.id);
        await prisma.$transaction(async (tx) => {
          const order = await tx.order.findUnique({
            where: {
              paymentId: payment.order_id,
            },
            include: {
              items: true,
            },
          });
          if (!order) {
            console.log("⚠️ Order Not Found");
            return;
          }

          if (order.paymentStatus === "SUCCESS") {
            console.log("⚠️ Order Already Processed");
            return;
          }

          await tx.order.update({
            where: {
              id: order.id,
            },
            data: {
              paymentStatus: "SUCCESS",
              orderStatus: "CONFIRMED",
            },
          });
          console.log("✅ Order Updated:", order.id);
          for (const item of order.items) {
            await tx.product.update({
              where: {
                id: item.productId,
              },
              data: {
                stock: {
                  decrement: item.quantity,
                },
              },
            });
          }
          await tx.cartItem.deleteMany({
            where: {
              userId: order.userId,
              id: {
                in: order.items.map((i) => i.cartItemId),
              },
            },
          });
          console.log("🛒 Stock Updated & Cart Cleared");
        });
      }
      if (event.event === "payment.failed") {
        console.log("❌ Payment Failed Event Received");
      }

      res.json({ status: "ok" });
    } catch (err) {
      console.error("🔥 Webhook Error:", err);
      res.status(500).send("Server Error");
    }
  },
);
app.use(express.json());
app.get("/", (req, res) => {
  return res.json({ status: "Server is up and runnings" });
});

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
const PORT = Number(process.env.PORT) || 8000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
