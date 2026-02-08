import { router } from "./trpc.js";
import { productRouter } from "./routes/product/product.routes.js";
// root router
export const appRouter = router({
  products: productRouter,
});
// This type will later used by frontend
export type AppRouter = typeof appRouter;
