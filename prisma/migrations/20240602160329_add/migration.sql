/*
  Warnings:

  - A unique constraint covering the columns `[userId,commentId]` on the table `CommentLike` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[followerId,followingId]` on the table `Follow` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,replyCommentId]` on the table `ReplyCommentLike` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,threadId]` on the table `ThreadLike` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CommentLike_userId_commentId_key" ON "CommentLike"("userId", "commentId");

-- CreateIndex
CREATE UNIQUE INDEX "Follow_followerId_followingId_key" ON "Follow"("followerId", "followingId");

-- CreateIndex
CREATE UNIQUE INDEX "ReplyCommentLike_userId_replyCommentId_key" ON "ReplyCommentLike"("userId", "replyCommentId");

-- CreateIndex
CREATE UNIQUE INDEX "ThreadLike_userId_threadId_key" ON "ThreadLike"("userId", "threadId");
