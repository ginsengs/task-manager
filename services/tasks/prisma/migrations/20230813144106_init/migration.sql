-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('Pending', 'Done');

-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('user', 'admin', 'manager');

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "public_uuid" UUID NOT NULL,
    "description" TEXT,
    "assignee_uuid" UUID NOT NULL,
    "price" INTEGER NOT NULL,
    "status" "TaskStatus" NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "public_uuid" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "role" "user_role" NOT NULL DEFAULT 'user'
);

-- CreateIndex
CREATE UNIQUE INDEX "tasks_public_uuid_key" ON "tasks"("public_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "users_public_uuid_key" ON "users"("public_uuid");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assignee_uuid_fkey" FOREIGN KEY ("assignee_uuid") REFERENCES "users"("public_uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
