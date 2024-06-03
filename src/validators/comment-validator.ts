import joi from "joi";
import { CreateCommentDTO, UpdateCommentDTO } from "../dto/dto-comment";

export const createCommentSchema = joi.object<CreateCommentDTO>({
  content: joi.string().required(),
  imageUrl: joi.string().uri().optional(),
  authorId: joi.number().integer().required(),
  threadId: joi.number().integer().required(),
});

export const updateCommentSchema = joi.object<UpdateCommentDTO> ({
    content: joi.string().optional(),
    imageUrl: joi.string().uri().optional()
})
