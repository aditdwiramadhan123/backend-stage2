import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import ReplyCommentService from "../services/reply-comment-service";
import { CreateCommentReplyDTO, UpdateCommentReplyDTO } from "../dto/dto-comment-reply";

const prisma = new PrismaClient();

async function findAll(req: Request, res: Response) {
  try {
    const { commentId } = req.params;
    const commentIdNumber = Number(commentId);
    const replyComments = await ReplyCommentService.findAllReplyComments(commentIdNumber);
    res.status(200).json(replyComments);
  } catch (error) {
    res.status(500).json({ error: "Failed to find reply comments" });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const { replyCommentId } = req.params;
    const replyCommentIdNumber = Number(replyCommentId);
    const replyComment = await ReplyCommentService.findReplyCommentById(replyCommentIdNumber);
    if (!replyComment) {
      return res.status(404).json({ error: "Reply comment not found" });
    }
    res.status(200).json(replyComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to find reply comment" });
  }
}

async function create(req: Request, res: Response) {
  try {
    const userId = res.locals.user.id;
    const commentId = Number(req.params.commentId);
    const replyCommentData: CreateCommentReplyDTO = {
      ...req.body,
      imageUrl: req.file ? req.file.path : null,
      authorId: userId,
      commentId
    };

    if (!replyCommentData.content || !userId || !commentId) {
      return res
        .status(400)
        .json({ error: "Content, authorId, and commentId are required" });
    }
    const newReplyComment = await ReplyCommentService.createReplyComment(replyCommentData);
    res.status(201).json(newReplyComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create reply comment" });
  }
}

async function update(req: Request, res: Response) {
  try {
    const replyCommentData: UpdateCommentReplyDTO = {
      ...req.body,
      imageUrl: req.file ? req.file.path : null,
    };
    console.log(replyCommentData)
    const { replyCommentId } = req.params;
    const replyCommentIdNumber: number = Number(replyCommentId);

    if (!replyCommentData.content) {
      return res.status(400).json({ error: "Content is required" });
    }
    const updatedReplyComment = await ReplyCommentService.updateReplyComment(
      replyCommentIdNumber,
      replyCommentData
    );
    if (!updatedReplyComment) {
      return res.status(404).json({ error: "Reply comment not found" });
    }
    res.status(200).json(updatedReplyComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to update reply comment" });
  }
}

async function deleted(req: Request, res: Response) {
  try {
    const { replyCommentId } = req.params;
    const replyCommentIdNumber = Number(replyCommentId);
    const deletedReplyComment = await ReplyCommentService.deleteReplyComment(replyCommentIdNumber);
    res.status(200).json(`Success to delete reply comment ${replyCommentIdNumber}`);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete reply comment" });
  }
}

export default { findAll, findOne, create, update, deleted };
