import { z } from "zod";
import bcrypt from "bcryptjs";
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

  signup: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const exists = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (exists) {
        throw new Error("El usuario ya existe.");
      }

      const hashedPassword = await bcrypt.hash(input.password, 10);

      const user = await ctx.db.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
          name: input.name,
        },
      });

      return { id: user.id, email: user.email };
    }),
});
