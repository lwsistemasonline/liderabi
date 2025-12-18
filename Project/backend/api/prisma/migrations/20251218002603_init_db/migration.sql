-- CreateTable
CREATE TABLE "company_groups" (
    "id" VARCHAR(26) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "company_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type_companies" (
    "id" VARCHAR(26) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "type_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company" (
    "id" VARCHAR(26) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "companyGroupId" VARCHAR(26) NOT NULL,
    "parentCompanyId" VARCHAR(26),
    "typeCompanyId" VARCHAR(26),
    "contactData" JSONB,
    "addressData" JSONB,
    "credentialPowerBi" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_subscriptions" (
    "id" VARCHAR(26) NOT NULL,
    "companyId" VARCHAR(26) NOT NULL,
    "levelId" VARCHAR(26) NOT NULL,
    "discount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "methodPaymentId" VARCHAR(26),
    "typeChargeId" VARCHAR(26),
    "cnpj" VARCHAR(18),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "company_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "method_payments" (
    "id" VARCHAR(26) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "method_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type_charges" (
    "id" VARCHAR(26) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "type_charges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "levels" (
    "id" VARCHAR(26) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_billings" (
    "id" VARCHAR(26) NOT NULL,
    "companyId" VARCHAR(26) NOT NULL,
    "subscriptionId" VARCHAR(26) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "billingDate" TIMESTAMP(3) NOT NULL,
    "valueBilling" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "paymentDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "company_billings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR(26) NOT NULL,
    "companyId" VARCHAR(26) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "mobileNumber" VARCHAR(20),
    "telegramId" VARCHAR(26),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_subscriptions" (
    "id" VARCHAR(26) NOT NULL,
    "userId" VARCHAR(26) NOT NULL,
    "companyId" VARCHAR(26) NOT NULL,
    "subscriptionId" VARCHAR(26),
    "roleId" VARCHAR(26),
    "email" VARCHAR(100),
    "emailVerified" TIMESTAMP(3),
    "password" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "id" VARCHAR(26) NOT NULL,
    "identifier" VARCHAR(100) NOT NULL,
    "token" VARCHAR(100) NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verification_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_logs" (
    "id" TEXT NOT NULL,
    "datelog" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" VARCHAR(26) NOT NULL,
    "companyId" VARCHAR(26) NOT NULL,
    "ip_address" VARCHAR(15) NOT NULL,
    "endpoint" VARCHAR(255) NOT NULL,
    "method" VARCHAR(10) NOT NULL,
    "status_code" SMALLINT NOT NULL,
    "entity" VARCHAR(100) NOT NULL,
    "changes" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" VARCHAR(26) NOT NULL,
    "sessionToken" VARCHAR(512) NOT NULL,
    "userId" VARCHAR(26) NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" VARCHAR(26) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type_objects" (
    "id" VARCHAR(26) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "type_objects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "objects" (
    "id" VARCHAR(26) NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "price" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "typeObjectId" VARCHAR(26) NOT NULL,
    "parentObjectId" VARCHAR(26),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "objects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles_objects" (
    "id" VARCHAR(26) NOT NULL,
    "roleId" VARCHAR(26) NOT NULL,
    "objectId" VARCHAR(26) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "roles_objects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_parameters" (
    "id" VARCHAR(26) NOT NULL,
    "companyId" VARCHAR(26) NOT NULL,
    "parameters" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "company_parameters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_roles" (
    "id" VARCHAR(26) NOT NULL,
    "companyId" VARCHAR(26) NOT NULL,
    "subscriptionId" VARCHAR(26),
    "userId" VARCHAR(26) NOT NULL,
    "roleId" VARCHAR(26) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_roles_objects" (
    "id" VARCHAR(26) NOT NULL,
    "userRoleId" VARCHAR(26) NOT NULL,
    "objectId" VARCHAR(26) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_roles_objects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_subscriptions_cnpj_key" ON "company_subscriptions"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "users_mobileNumber_key" ON "users"("mobileNumber");

-- CreateIndex
CREATE UNIQUE INDEX "users_telegramId_key" ON "users"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "users_subscriptions_email_key" ON "users_subscriptions"("email");

-- CreateIndex
CREATE INDEX "users_subscriptions_userId_companyId_subscriptionId_idx" ON "users_subscriptions"("userId", "companyId", "subscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE INDEX "roles_name_idx" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "type_objects_name_key" ON "type_objects"("name");

-- CreateIndex
CREATE UNIQUE INDEX "objects_code_key" ON "objects"("code");

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_companyGroupId_fkey" FOREIGN KEY ("companyGroupId") REFERENCES "company_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_typeCompanyId_fkey" FOREIGN KEY ("typeCompanyId") REFERENCES "type_companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_subscriptions" ADD CONSTRAINT "company_subscriptions_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_subscriptions" ADD CONSTRAINT "company_subscriptions_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_subscriptions" ADD CONSTRAINT "company_subscriptions_methodPaymentId_fkey" FOREIGN KEY ("methodPaymentId") REFERENCES "method_payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_subscriptions" ADD CONSTRAINT "company_subscriptions_typeChargeId_fkey" FOREIGN KEY ("typeChargeId") REFERENCES "type_charges"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_billings" ADD CONSTRAINT "company_billings_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_billings" ADD CONSTRAINT "company_billings_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "company_subscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_subscriptions" ADD CONSTRAINT "users_subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_subscriptions" ADD CONSTRAINT "users_subscriptions_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_subscriptions" ADD CONSTRAINT "users_subscriptions_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "company_subscriptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_subscriptions" ADD CONSTRAINT "users_subscriptions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_logs" ADD CONSTRAINT "users_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_logs" ADD CONSTRAINT "users_logs_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "objects" ADD CONSTRAINT "objects_typeObjectId_fkey" FOREIGN KEY ("typeObjectId") REFERENCES "type_objects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles_objects" ADD CONSTRAINT "roles_objects_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles_objects" ADD CONSTRAINT "roles_objects_objectId_fkey" FOREIGN KEY ("objectId") REFERENCES "objects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_parameters" ADD CONSTRAINT "company_parameters_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "company_subscriptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_roles_objects" ADD CONSTRAINT "users_roles_objects_userRoleId_fkey" FOREIGN KEY ("userRoleId") REFERENCES "users_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_roles_objects" ADD CONSTRAINT "users_roles_objects_objectId_fkey" FOREIGN KEY ("objectId") REFERENCES "objects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
