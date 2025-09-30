-- CreateTable
CREATE TABLE "public"."UserBalanace" (
    "userId" TEXT NOT NULL,
    "credits" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserBalanace_pkey" PRIMARY KEY ("userId")
);
