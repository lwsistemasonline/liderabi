/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_company_subscriptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_roles_objects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_company_id_fkey";

-- DropForeignKey
ALTER TABLE "user_company_subscriptions" DROP CONSTRAINT "user_company_subscriptions_company_id_fkey";

-- DropForeignKey
ALTER TABLE "user_company_subscriptions" DROP CONSTRAINT "user_company_subscriptions_role_id_fkey";

-- DropForeignKey
ALTER TABLE "user_company_subscriptions" DROP CONSTRAINT "user_company_subscriptions_subscription_id_fkey";

-- DropForeignKey
ALTER TABLE "user_company_subscriptions" DROP CONSTRAINT "user_company_subscriptions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_logs" DROP CONSTRAINT "user_logs_company_id_fkey";

-- DropForeignKey
ALTER TABLE "user_logs" DROP CONSTRAINT "user_logs_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_company_id_fkey";

-- DropForeignKey
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_role_id_fkey";

-- DropForeignKey
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_subscription_id_fkey";

-- DropForeignKey
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_roles_objects" DROP CONSTRAINT "user_roles_objects_object_id_fkey";

-- DropForeignKey
ALTER TABLE "user_roles_objects" DROP CONSTRAINT "user_roles_objects_user_role_id_fkey";

-- DropTable
DROP TABLE "user";

-- DropTable
DROP TABLE "user_company_subscriptions";

-- DropTable
DROP TABLE "user_logs";

-- DropTable
DROP TABLE "user_roles";

-- DropTable
DROP TABLE "user_roles_objects";

-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR(26) NOT NULL,
    "company_id" VARCHAR(26) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "mobile_number" VARCHAR(20),
    "telegram_id" VARCHAR(26),
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_subscriptions" (
    "id" VARCHAR(26) NOT NULL,
    "user_id" VARCHAR(26) NOT NULL,
    "company_id" VARCHAR(26) NOT NULL,
    "subscription_id" VARCHAR(26),
    "role_id" VARCHAR(26),
    "email" VARCHAR(100),
    "email_verified" TIMESTAMP(3),
    "password" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_logs" (
    "id" TEXT NOT NULL,
    "datelog" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" VARCHAR(26) NOT NULL,
    "company_id" VARCHAR(26) NOT NULL,
    "ip_address" VARCHAR(15) NOT NULL,
    "endpoint" VARCHAR(255) NOT NULL,
    "method" VARCHAR(10) NOT NULL,
    "status_code" SMALLINT NOT NULL,
    "entity" VARCHAR(100) NOT NULL,
    "changes" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_roles" (
    "id" VARCHAR(26) NOT NULL,
    "company_id" VARCHAR(26) NOT NULL,
    "subscription_id" VARCHAR(26),
    "user_id" VARCHAR(26) NOT NULL,
    "role_id" VARCHAR(26) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_roles_objects" (
    "id" VARCHAR(26) NOT NULL,
    "user_role_id" VARCHAR(26) NOT NULL,
    "object_id" VARCHAR(26) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_roles_objects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_mobile_number_key" ON "users"("mobile_number");

-- CreateIndex
CREATE UNIQUE INDEX "users_telegram_id_key" ON "users"("telegram_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_subscriptions_email_key" ON "users_subscriptions"("email");

-- CreateIndex
CREATE INDEX "users_subscriptions_user_id_company_id_subscription_id_idx" ON "users_subscriptions"("user_id", "company_id", "subscription_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_subscriptions" ADD CONSTRAINT "users_subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_subscriptions" ADD CONSTRAINT "users_subscriptions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_subscriptions" ADD CONSTRAINT "users_subscriptions_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "company_subscriptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_subscriptions" ADD CONSTRAINT "users_subscriptions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_logs" ADD CONSTRAINT "users_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_logs" ADD CONSTRAINT "users_logs_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "company_subscriptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_roles_objects" ADD CONSTRAINT "users_roles_objects_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "users_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_roles_objects" ADD CONSTRAINT "users_roles_objects_object_id_fkey" FOREIGN KEY ("object_id") REFERENCES "objects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
