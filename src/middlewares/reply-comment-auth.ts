import { NextFunction, Request, Response } from "express";
import replyCommentService from "../services/reply-comment-service";

export default async function replyCommentAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { replyCommentId, commentId } = req.params;
  const replyCommentIdNumber = Number(replyCommentId);
  const commentIdNumber = Number(commentId);

  if (!res.locals.user) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  const userId = res.locals.user.id; // Ambil userId dari res.locals
  console.log("User ID:", userId); // Tambahkan log untuk debugging

  const repliesComment = await replyCommentService.findAllReplyComments(commentIdNumber);

  const isUserReplyComment = repliesComment.some(
    (comment) => comment.authorId === userId && comment.id === replyCommentIdNumber
  );

  if (!isUserReplyComment) {
    return res.status(403).json({ error: "User not authorized to modify this reply comment" });
  }

  next();
}
