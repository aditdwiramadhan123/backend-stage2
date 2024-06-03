// controllers/like-comment-controller.ts
import { Request, Response } from "express";
import LikeReplyCommentService from "../services/like-reply-comment-service";

async function likeReplyComment(req: Request, res: Response) {
  try {
    const { userId, replyCommentId } = req.params;
    const userIdNumber = Number(userId);
    const replyCommentIdNumber = Number(replyCommentId);

    const repliesComment =
      await LikeReplyCommentService.findAllCommentReplyLikes(
        replyCommentIdNumber
      );

    repliesComment.forEach((replyComment) => {
      if (replyComment.userId == userIdNumber) {
        throw new Error("user has already liked this reply");
      }
    });

    const newLike = await LikeReplyCommentService.likeCommentReply(
      userIdNumber,
      replyCommentIdNumber
    );
    res.status(201).json(newLike);
  } catch (error) {
    console.error("Error liking reply comment:", error);
    res.status(500).json({ error: error.message });
  }
}

async function unlikeReplyComment(req: Request, res: Response) {
  try {
    const { likeReplyCommentId } = req.params;
    const likeReplyCommentIdNumber = Number(likeReplyCommentId);
    await LikeReplyCommentService.unlikeCommentReply(likeReplyCommentIdNumber);
    res
      .status(200)
      .json(
        `succses delete id like reply comment = ${likeReplyCommentIdNumber}`
      );
  } catch (error) {
    res.status(500).json({ error: "Failed to unlike reply comment" });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const { likeReplyCommentId } = req.params;
    const likeReplyCommentIdNumber = Number(likeReplyCommentId);

    const likes = await LikeReplyCommentService.findCommentReplyLikeById(
      likeReplyCommentIdNumber
    );
    res.status(200).json(likes);
  } catch (error) {
    console.error("Error finding likes:", error);
    res.status(500).json({ error: "Failed to find likes" });
  }
}

async function findLikesAll(req: Request, res: Response) {
  try {
    const { replyCommentId } = req.params;
    const replyCommentIdNumber = Number(replyCommentId);

    const likes = await LikeReplyCommentService.findAllCommentReplyLikes(
      replyCommentIdNumber
    );
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ error: "Failed to get likes for comment" });
  }
}

export default { likeReplyComment, unlikeReplyComment, findOne, findLikesAll };
