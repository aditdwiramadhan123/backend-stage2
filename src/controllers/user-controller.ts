import { Request, Response } from "express";
import UserService from "../services/user-service";
import { PrismaClient, Prisma } from "@prisma/client";
import {
  CreateAccountDTO,
  UpdateAccountDTO,
  LoginAccountDTO,
} from "../dto/dto-user";
import userService from "../services/user-service";
const prisma = new PrismaClient();

async function findAll(req: Request, res: Response) {
  try {
    const users = await UserService.findAllUsers();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to found users" });
  }
}

async function findOne(req: Request, res: Response) {
  const username = res.locals.user.username;
  try {
    console.log("username", username);
    const user = await UserService.findUserByName(username);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to find user" });
  }
}

// register

async function create(req: Request, res: Response) {
  try {
    const data: CreateAccountDTO = req.body;
    const allUser = await userService.findAllUsers();

    const isUsernameTaken = allUser.some((user) => {
      return user.username == data.username;
    });

    if (isUsernameTaken) {
      return res.status(409).json({
        error: "username already in use",
        message:
          "The username you have entered is already associated with another account.",
      });
    }

    const isEmailUserTaken = allUser.some((user) => {
      return user.email === data.email;
    });

    if (isEmailUserTaken) {
      return res.status(409).json({
        error: "Email already in use",
        message:
          "The email address you have entered is already associated with another account.",
      });
    }
    const newUser = await UserService.createUser(data);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function update(req: Request, res: Response) {
  try {
    const username = res.locals.user.username;
    const data: UpdateAccountDTO = {
      ...req.body,
      profilePictureUrl: req.file ? req.file.path : null,
    };
    console.log("ini req", req.file);

    console.log(data);

    // Panggil fungsi updateUser dari service
    const updatedUser = await UserService.updateUser(username, data);

    // Cek apakah updateUser berhasil
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Jika berhasil, kirim respons
    res.status(201).json(updatedUser);
  } catch (error) {
    // Tangani kesalahan
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
}

async function deleted(req: Request, res: Response) {
  try {
    const username = res.locals.user.username;
    console.log(username);
    await userService.deleteUser(username);
    res.status(201).json(`succsess to delete user ${username}`);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete" });
  }
}

async function login(req: Request, res: Response) {
  try {
    const dataUser: LoginAccountDTO = req.body;
    const Userlogin = await userService.loginUser(dataUser);
    res.status(201).json(Userlogin);
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
}

async function check(req: Request, res: Response) {
  try {
    res.json(res.locals.user);
    const token = req.headers.authorization;
    console.log(token);
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
}

export default { findAll, findOne, create, deleted, login, update, check };
