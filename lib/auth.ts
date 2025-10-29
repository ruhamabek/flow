import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth"; 
import { Polar } from "@polar-sh/sdk"; 

const prisma = new PrismaClient();


const polarClient = new Polar({ 
    accessToken: process.env.POLAR_ACCESS_TOKEN, 
    // Use 'sandbox' if you're using the Polar Sandbox environment
    // Remember that access tokens, products, etc. are completely separated between environments.
    // Access tokens obtained in Production are for instance not usable in the Sandbox environment.
     server: 'sandbox'
}); 

export const auth = betterAuth({ 
   emailAndPassword: {
        minPasswordLength: 4,
		maxPasswordLength: 128,    
        enabled: true
    } ,
    socialProviders:{
      github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
polar({
  client: polarClient,
  createCustomerOnSignUp: true,
  use: [
    checkout({
      products: [
                        {
                            productId: "280ce939-1fb5-4c35-9871-a70e31e390d2",
                            slug: "Large-Pack" // Custom slug for easy reference in Checkout URL, e.g. /checkout/Large-Pack
                        },
                       {
                            productId: "7d85e7a7-6857-4061-8526-5262460e2a5c",
                            slug: "Medium-Pack" // Custom slug for easy reference in Checkout URL, e.g. /checkout/Medium-Pack
                        },
                        {
                            productId: "2a435417-6ee1-43a5-b1d0-58dc1c192fe6",
                            slug: "Small-Pack" // Custom slug for easy reference in Checkout URL, e.g. /checkout/Small-Pack
                        }
                    ],
      successUrl: "/success?checkout_id={CHECKOUT_ID}",
      returnUrl: "http://localhost:3000/dashboard/billing",
      authenticatedUsersOnly: true,
    }),
           webhooks({
               secret: process.env.POLAR_WEBHOOK_SECRET!,
               onPayload: async (payload) => {
                      console.log("Received webhook payload:", payload.type);
                   },
                })
            ],
        })
  ],
})

