-- CreateTable
CREATE TABLE "public"."Checkout" (
    "id" TEXT NOT NULL,
    "checkoutId" TEXT NOT NULL,
    "userId" TEXT,
    "productId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "paymentProcessor" TEXT,
    "customerEmail" TEXT,
    "customerName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Checkout_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Checkout_checkoutId_key" ON "public"."Checkout"("checkoutId");

-- AddForeignKey
ALTER TABLE "public"."UserBalanace" ADD CONSTRAINT "UserBalanace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Checkout" ADD CONSTRAINT "Checkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
