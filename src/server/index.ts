import { router } from "./trpc.js";
// root router
const appRouter = router({});
// This type will later used by frontend
export type AppRouter = typeof appRouter;
