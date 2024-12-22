import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const qrcodeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      title: z.string().min(3),
      description: z.string(),
      contactInfo: z.string(),
      contactEmail: z.string().email(),
      turnstileSecretKey: z.string().optional(),
      turnstileSiteKey: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.qRCode.create({
        data: {
          userId: ctx.session.user.id,
          title: input.title,
          description: input.description,
          contactInfo: input.contactInfo,
          contactEmail: input.contactEmail,
          turnstileSecretKey: input.turnstileSecretKey,
          turnstileSiteKey: input.turnstileSiteKey,
        },
      });
    }),
});
