import z from "zod";

export const createCredentialSchema = z.object({
    name: z.string().max(30),
    value: z.string().max(500),
})

export type createCredentialType = z.infer<typeof createCredentialSchema>;