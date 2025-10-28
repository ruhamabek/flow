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
    // server: 'sandbox'
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
                            productId: "324905f4-9c29-498c-b4cc-e9c81491d167", // ID of Product from Polar Dashboard
                            slug: "10000-credits" // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro
                        } ,
                        { 
                            productId: "993cdaee-f3d7-49c7-ba96-26247310ec5a", // ID of Product from Polar Dashboard
                            slug: "5000-credits" // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro
                        } ,
                        { 
                            productId: "33e6841b9-7701-4982-b825-d34670c5e59d", // ID of Product from Polar Dashboard
                            slug: "1000-credits" // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro
                        } ,
                    ], 
                    successUrl: "/success?checkout_id={CHECKOUT_ID}", 
                    authenticatedUsersOnly: true
                }), 
                portal()
            ], 
        }) 
    ]
});