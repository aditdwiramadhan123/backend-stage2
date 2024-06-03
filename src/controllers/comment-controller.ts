import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import CommentService from "../services/comment-service";
import { CreateCommentDTO, UpdateCommentDTO } from "../dto/dto-comment";

const prisma = new PrismaClient();

async function findAll(req: Request, res: Response) {
  try {
    const { threadId } = req.params;
    const threadIdNumber = Number(threadId);
    const comments = await CommentService.findAllComments(threadIdNumber);
    res.status(200).json(comments);
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
    const data: CreateCommentDTO = req.body;
    if (!data.content || !data.authorId || !data.threadId) {
      return res
        .status(400)
        .json({ error: "Content, authorId, and threadId are required" });
    }
    const newComment = await CommentService.createComment(data);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create comment" });
  }
}

async function update(req: Request, res: Response) {
  try {
    const data: UpdateCommentDTO = req.body;
    const { commentId } = req.params;
    const commentIdNumber: number = Number(commentId);

    if (!data.content) {
      return res.status(400).json({ error: "Content is required" });
    }
    const updatedComment = await CommentService.updateComment(commentIdNumber, data);
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