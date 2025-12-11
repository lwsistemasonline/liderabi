/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `company_subscriptions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "company_subscriptions" ADD COLUMN     "cnpj" VARCHAR(18);

-- CreateIndex
CREATE UNIQUE INDEX "company_subscriptions_cnpj_key" ON "company_subscriptions"("cnpj");
