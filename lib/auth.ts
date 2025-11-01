import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { polar, checkout, webhooks } from "@polar-sh/better-auth"; 
import { Polar } from "@polar-sh/sdk"; 

const prisma = new PrismaClient();
/* eslint-disable @typescript-eslint/no-explicit-any */


const polarClient = new Polar({ 
    accessToken: process.env.POLAR_ACCESS_TOKEN, 
    // Use 'sandbox' if you're using the Polar Sandbox environment
    // Remember that access tokens, products, etc. are completely separated between environments.
    // Access tokens obtained in Production are for instance not usable in the Sandbox environment.
     server: 'sandbox'
}); 

export const auth = betterAuth({ 
  trustedOrigins: ["http://localhost:3000", "https://flow-df6qxc5yd-ruhamabeks-projects.vercel.app"],
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
              productId: process.env.LARGE_PRODUCT_ID!,
              slug: "Large-Pack"  
            },
            {
              productId: process.env.MEDIUM_PRODUCT_ID!,
              slug: "Medium-Pack"   
            },
            {
              productId: process.env.SMALL_PRODUCT_ID!,
              slug: "Small-Pack"    
            }
          ],
          successUrl: "/success?checkout_id={CHECKOUT_ID}",
          returnUrl: "https://flow-lfu3x82uy-ruhamabeks-projects.vercel.app/dashboard/billing",
          authenticatedUsersOnly: true,
        }),
webhooks({
  secret: process.env.POLAR_WEBHOOK_SECRET!,
  onPayload: async (payload) => {
 
     if (["checkout.created", "checkout.updated"].includes(payload.type)) {
      await handleCheckoutWebhook(payload.data);
    }
  },
}),

      ],
    }),
  ],
});

 

async function handleCheckoutWebhook(checkoutData: any) {
  try {
 
    if (!checkoutData.customerEmail) {
      console.warn("No customer email in checkout data");
      return;
    }

     const user = await prisma.user.findFirst({
      where: { email: checkoutData.customerEmail },
    });

    if (!user) {
      console.warn(`User not found for email: ${checkoutData.customerEmail}`);
      return;
    }

     const savedCheckout = await prisma.checkout.upsert({
      where: { checkoutId: checkoutData.id },
      create: {
        checkoutId: checkoutData.id,
        userId: user.id,
        productId: checkoutData.productId,
        productName: checkoutData.product?.name ?? null,
        amount: checkoutData.totalAmount,
        currency: checkoutData.currency,
        status: checkoutData.status,
        paymentProcessor: checkoutData.paymentProcessor,
        customerEmail: checkoutData.customerEmail,
        customerName: checkoutData.customerName,
      },
      update: {
        status: checkoutData.status,
        amount: checkoutData.totalAmount,
        productName: checkoutData.product?.name ?? undefined,
      },
    });

    console.log(`Checkout ${savedCheckout.id} processed for user ${user.id}`);

     if (checkoutData.status === "completed" || checkoutData.status === "succeeded") {
      await handleTransactionCreation(user.id, savedCheckout, checkoutData);
    }

  } catch (error) {
    console.error("Error processing webhook:", error);
  }
}
 

async function handleTransactionCreation(userId: string, checkout: any, checkoutData: any) {
  try {
     const uniqueTransactionId = `${checkoutData.id}-${Date.now()}`;

       await prisma.transaction.create({
      data: {
        checkoutId: checkout.id,
        userId: userId,
        amount: checkoutData.totalAmount,
        currency: checkoutData.currency,
        status: "success",
        transactionId: uniqueTransactionId,
      },
    });

 
     await handleCreditAddition(userId, checkoutData);
  } catch (error) {
    console.error("❌ Error creating transaction:", error);
  }
}

 

async function handleCreditAddition(userId: string, checkoutData: any) {
  try {
    let creditsToAdd = 0;
    const productName = checkoutData.product?.name;

    switch (productName) {
      case "Large Pack":
        creditsToAdd = 10000;
        break;
      case "Medium Pack":
        creditsToAdd = 5000;
        break;
      case "Small Pack":
        creditsToAdd = 1000;
        break;
      default:
        console.warn(`Unknown product: ${productName}`);
        return;
    }

    if (creditsToAdd > 0) {
      await prisma.userBalanace.upsert({
        where: { userId: userId },
        create: { userId: userId, credits: creditsToAdd },
        update: { credits: { increment: creditsToAdd } },
      });

     }
  } catch (error) {
    console.error("Error adding credits:", error);
  }
}
