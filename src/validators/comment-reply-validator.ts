import joi from "joi";
import {
  CreateCommentReplyDTO,
  UpdateCommentReplyDTO,
} from "../dto/dto-comment-reply";

export const createCommentReplySchema = joi.object<CreateCommentReplyDTO>({
  content: joi.string().required(),
  imageUrl: joi.string().uri().optional(),
  authorId: joi.number().integer().required(),
  commentId: joi.number().integer().required(),
});

// Validator untuk UpdateCommentReplyDTO
export const updateCommentReplySchema = joi.object<UpdateCommentReplyDTO>({
  content: joi.string().optional(),
  imageUrl: joi.string().uri().optional(),
});
