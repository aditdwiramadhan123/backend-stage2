import joi from "joi";
import { CreateAccountDTO, UpdateAccountDTO,LoginAccountDTO } from "../dto/dto-user";

export const createAccountSchema = joi.object<CreateAccountDTO>({
  name: joi.string().required(),
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  quote: joi.string().optional(),
  profilePictureUrl: joi.string().uri().optional(),
  coverPictureUrl: joi.string().uri().optional(),
});

export const UpdateAccountSchema = joi.object<UpdateAccountDTO>({
  name: joi.string().optional(),
  username: joi.string().optional(),
  email: joi.string().email().optional(),
  password: joi.string().min(6).optional(),
  quote: joi.string().optional(),
  profilePictureUrl: joi.string().uri().optional(),
  coverPictureUrl: joi.string().uri().optional(),
});

export const LoginAccountSchema = joi.object <LoginAccountDTO> ({
  email: joi.string().email().required(),
  password : joi.string().min(6).required()
})
