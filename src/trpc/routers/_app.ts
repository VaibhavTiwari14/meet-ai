import { agentsRouter } from "@/modules/agents/server/precedures";
import { createTRPCRouter } from "../init";
export const appRouter = createTRPCRouter({
  agents: agentsRouter,
});
export type AppRouter = typeof appRouter;
