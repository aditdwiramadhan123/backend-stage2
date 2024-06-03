import { Request, Response } from "express";
import UserService from "../services/user-service";
import { PrismaClient, Prisma } from "@prisma/client";
import { CreateAccountDTO,UpdateAccountDTO, LoginAccountDTO } from "../dto/dto-user";
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
  try {
    const {username} = req.params
    const user = await UserService.findUserByName(username);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to find user" });
  }
}

async function create(req: Request, res: Response) {
  try {
    const data: CreateAccountDTO = req.body;
    const newUser = await UserService.createUser(data);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create new user" });
  }
}

async function update(req: Request, res: Response) {
  try {
    const data:UpdateAccountDTO = req.body;
    const {username} = req.params;
    const updateUser = await userService.updateUser(
      username,
      data
    );
    res.status(201).json(updateUser);
    if (!updateUser) {
      return res.status(404).json({ error: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update thread" });
  }
}

async function deleted(req: Request, res: Response) {
  try {
    const {username} = req.params;
    const deleteAccount = await userService.deleteUser(username);
    res.status(201).json(`succsess to delete user ${username}`);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete" });
  }
}

async function login(req: Request, res: Response) {
  try {
    const dataUser:LoginAccountDTO = req.body ;
    const Userlogin = await userService.loginUser(dataUser);
    res.status(201).json(Userlogin);
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
}

export default {findAll, findOne, create, update, deleted,login };
