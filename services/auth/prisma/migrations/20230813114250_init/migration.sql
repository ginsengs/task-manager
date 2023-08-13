-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('user', 'admin', 'manager');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "public_uuid" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "beak_size" TEXT NOT NULL,
    "role" "user_role" NOT NULL DEFAULT 'user',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_public_uuid_key" ON "users"("public_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_beak_size_key" ON "users"("username", "beak_size");
