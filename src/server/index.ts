import { router } from "./trpc.js";
// root router
const appRouter = router({});
export type AppRouter = typeof appRouter;

