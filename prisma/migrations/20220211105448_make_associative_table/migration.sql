/*
  Warnings:

  - You are about to drop the column `tagId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the `_PostToTag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_PostToTag" DROP CONSTRAINT "_PostToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostToTag" DROP CONSTRAINT "_PostToTag_B_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "tagId";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "tag",
ADD COLUMN     "name" VARCHAR(30) NOT NULL;

-- DropTable
DROP TABLE "_PostToTag";

-- CreateTable
CREATE TABLE "TagsOnPosts" (
    "postId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TagsOnPosts_pkey" PRIMARY KEY ("postId","tagId")
);

-- AddForeignKey
ALTER TABLE "TagsOnPosts" ADD CONSTRAINT "TagsOnPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnPosts" ADD CONSTRAINT "TagsOnPosts_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
