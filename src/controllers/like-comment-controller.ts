// controllers/like-comment-controller.ts
import { Request, Response } from "express";
import LikeCommentService from "../services/like-comment-service";
import likeCommentService from "../services/like-comment-service";

async function likeComment(req: Request, res: Response) {
  try {
    const { commentId } = req.params;
    const userIdNumber = res.locals.user.id;
    const commentIdNumber = Number(commentId);

    const newLike = await LikeCommentService.likeComment(
      commentIdNumber,
      userIdNumber
    );
    res.status(201).json(newLike);
  } catch (error) {
    console.error("Error liking comment:", error);
    res.status(500).json({ error: "Failed to like comment" });
  }
}

async function unlikeComment(req: Request, res: Response) {
  try {
    const { likeCommentId } = req.params;
    const likeCommentIdNumber = Number(likeCommentId);
    await likeCommentService.unlikeComment(likeCommentIdNumber);
    res.status(200).json(`succses delete id like comment = ${likeCommentId}`);
  } catch (error) {
    res.status(500).json({ error: "Failed to unlike comment" });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const { likeCommentId } = req.params;
    const likeCommentIdNumber = Number(likeCommentId);

    const likes = await LikeCommentService.findCommentLikeById(
      likeCommentIdNumber
    );
    res.status(200).json(likes);
  } catch (error) {
    console.error("Error finding likes:", error);
    res.status(500).json({ error: "Failed to find likes" });
  }
}

async function findLikesAll(req: Request, res: Response) {
  try {
    const { commentId } = req.params;
    const commentIdNumber = Number(commentId);

    const likes = await LikeCommentService.findAllCommentLikes(commentIdNumber);
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ error: "Failed to get likes for comment" });
  }
}

export default { likeComment, unlikeComment, findOne, findLikesAll };
