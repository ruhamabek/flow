-- CreateTable
CREATE TABLE "public"."Credential" (
    "id" TEXT NOT NULL,
    "useId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Credential_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Credential_useId_name_key" ON "public"."Credential"("useId", "name");
