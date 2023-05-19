/*
  Warnings:

  - Added the required column `user_id` to the `cardio-solicitations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `diet-solicitations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `workout-solicitations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cardio-solicitations" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "diet-solicitations" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "workout-solicitations" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "workout-solicitations" ADD CONSTRAINT "workout-solicitations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diet-solicitations" ADD CONSTRAINT "diet-solicitations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cardio-solicitations" ADD CONSTRAINT "cardio-solicitations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
