import joi from "joi";
import { CreateThreadDTO,UpdateThreadDTO } from "../dto/dto-thread";

export const createThreadSchema = joi.object <CreateThreadDTO> ({
    caption: joi.string().required(),
    imageUrl: joi.string().uri().optional(),
    authorId: joi.number().integer().required()
})

export const updateThreadSchema = joi.object<UpdateThreadDTO>({
    caption: joi.string().optional(),
    imageUrl: joi.string().uri().optional()
})