/*
  Warnings:

  - The primary key for the `Goal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Goal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `goalId` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_goalId_fkey";

-- AlterTable
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Goal_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "goalId",
ADD COLUMN     "goalId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
