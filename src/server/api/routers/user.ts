import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user) return;
    return await ctx.db.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),
});
