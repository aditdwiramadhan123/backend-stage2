import { NextFunction, Request, Response } from "express";
import commentService from "../services/comment-service";

export default async function commentAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { commentId, threadId } = req.params;
  const commentIdNumber = Number(commentId);
  const threadIdNumber = Number(threadId);

  if (!res.locals.user) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  const userId = res.locals.user.id; // Ambil userId dari res.locals
  console.log("User ID:", userId); // Tambahkan log untuk debugging

  const commentsInThread = await commentService.findAllComments();

  const isUserComment = commentsInThread.some(
    (comment) => comment.authorId === userId && comment.id === commentIdNumber
  );

  if (!isUserComment) {
    return res.status(403).json({ error: "User not authorized to access this comment" });
  }

  next();
}
