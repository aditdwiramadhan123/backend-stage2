// DONE

import { PrismaClient, Prisma } from "@prisma/client";
import {
  CreateAccountDTO,
  UpdateAccountDTO,
  LoginAccountDTO,
} from "../dto/dto-user";
import {
  createAccountSchema,
  UpdateAccountSchema,
  LoginAccountSchema,
} from "../validators/user-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

async function findAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
}

async function findUserByName(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
}

async function createUser(userData: CreateAccountDTO) {
  try {
    const validate = createAccountSchema.validate(userData);
    if (validate.error) {
      throw new String(validate.error.message);
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    userData.password = hashedPassword;
    const newUser = await prisma.user.create({
      data: userData,
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

async function updateUser(username: string, updateData: UpdateAccountDTO) {
  try {
    const validate = UpdateAccountSchema.validate(updateData);
    if (validate.error) {
      throw new String(validate.error.message);
    }
    const existingUser = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!existingUser) {
      return null;
    }

    const updatedUser = await prisma.user.update({
      where: { username: username },
      data: updateData,
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

async function deleteUser(username: string) {
  try {
    const deletedUser = await prisma.user.delete({
      where: { username: username },
    });
    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

async function loginUser(userData: LoginAccountDTO) {
  const validate = LoginAccountSchema.validate(userData);

  if (validate.error) {
    throw new String(validate.error.message);
  }

  const userDB = await prisma.user.findUnique({
    where: {
      email: userData.email
    },
  });

 

  if (!userDB) throw new Error("user not found");

  const isValidPassowrd = await bcrypt.compare(
    userData.password,
    userDB.password
  );

  console.log(userDB,isValidPassowrd)
  if (!isValidPassowrd) throw new Error("password not valid");
  delete userDB.password;

  const jwtSecret = process.env.JWT_SECRET;
  const token = jwt.sign(userDB, jwtSecret);
  return {token,userDB};
}

export default {
  findAllUsers,
  findUserByName,
  createUser,
  updateUser,
  deleteUser,
  loginUser
};
