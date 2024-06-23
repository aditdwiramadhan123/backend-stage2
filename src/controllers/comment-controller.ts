import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import CommentService from "../services/comment-service";
import { CreateCommentDTO, UpdateCommentDTO } from "../dto/dto-comment";
import calculateDuration from "../services/time-service";

const prisma = new PrismaClient();

async function findAll(req: Request, res: Response) {
  try {
    const { threadId } = req.params;
    const threadIdNumber = Number(threadId);
    const commentsService = await CommentService.findAllCommentsByUserId(threadIdNumber);
    const username = res.locals.user.username
    const commentsController = commentsService?.map((comment) => {
      return {
        commentData: {
          name: comment.author.name,
          profilePictureUrl: comment.author.profilePictureUrl,
          username: comment.author.username,
          id: comment.id,
          caption: comment.content,
          duration: calculateDuration(comment.createdAt),
          imageUrl: comment.imageUrl,
          likes: comment._count.likes,
          isLike: comment.likes.some((userLike) => {
            return username === userLike.user.username;
          }),
        },
        userLikes: comment.likes
      };
    });
    res.status(200).json(commentsController);
  } catch (error) {
    res.status(500).json({ error: "Failed to find comments" });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const { commentId } = req.params;
    const commentIdNumber = Number(commentId);
    const comment = await CommentService.findCommentById(commentIdNumber);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Failed to find comment" });
  }
}

async function create(req: Request, res: Response) {
  try {
    const userId = res.locals.user.id;
    const threadId= Number(req.params.threadId);
    const commentData: CreateCommentDTO = {
      ...req.body,
      imageUrl: req.file ? req.file.path : null,
      authorId: userId,
      threadId
    };
    console.log(commentData)
  


    if (!commentData.content || !userId || !threadId) {
      return res
        .status(400)
        .json({ error: "Content, authorId, and threadId are required" });
    }
    const newComment = await CommentService.createComment(commentData);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create comment" });
  }
}

async function update(req: Request, res: Response) {
  try {
    const commentData: CreateCommentDTO = {
      ...req.body,
      imageUrl: req.file ? req.file.path : null,
    };
    const { commentId } = req.params;
    const commentIdNumber: number = Number(commentId);
  

    if (!commentData.content) {
      return res.status(400).json({ error: "Content is required" });
    }
    const updatedComment = await CommentService.updateComment(
      commentIdNumber,
      commentData
    );
    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to update comment" });
  }
}

async function deleted(req: Request, res: Response) {
  try {
    const { commentId } = req.params;
    const commentIdNumber = Number(commentId);
    const deletedComment = await CommentService.deleteComment(commentIdNumber);
    res.status(200).json(`Success to delete comment ${commentIdNumber}`);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
}

export default { findAll, findOne, create, update, deleted };
