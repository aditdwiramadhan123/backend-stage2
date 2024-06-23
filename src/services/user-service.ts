import { PrismaClient, User, VerificationType } from "@prisma/client";
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
import uploadCloudinary from "../cloudinary-config";
import { number } from "joi";
import { MyTypeUser } from "../dto/dto-user";
import { transporter } from "../libs/nodemailer";

const prisma = new PrismaClient();

async function findAllUsers() {
  try {
    const users = (await prisma.user.findMany({
      include: {
        followers: { select: { followingId: true } },
        following: { select: { followerId: true } },
      },
    })) as MyTypeUser[];
    return users;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
}

async function findAllUsersByName(username: string) {
  try {
    const users = await prisma.user.findMany({
      where: {
        username: username,
      },
    });
    return users;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
}

async function findUserByName(username: string) {
  try {
    const user = (await prisma.user.findUnique({
      where: { username },
      include: {
        followers: { select: { followingId: true } },
        following: { select: { followerId: true } },
        _count: { select: { followers: true, following: true } },
      },
    })) as MyTypeUser;
    return user;
  } catch (error) {
    console.error("Error fetching user by username:", error);
    throw error;
  }
}

async function createUser(userData: CreateAccountDTO) {
  try {
    const validate = createAccountSchema.validate(userData);
    if (validate.error) {
      throw new Error(validate.error.message);
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    userData.password = hashedPassword;
    const newUser = await prisma.user.create({
      data: userData,
    });
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign(newUser, jwtSecret);
    return { token, newUser };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
  
}

async function updateUser(username: string, updateData: UpdateAccountDTO) {
  try {
    let profilePictureUrl: { secure_url: string | null } = { secure_url: null };

    if (updateData.profilePictureUrl) {
      try {
        profilePictureUrl = await uploadCloudinary(
          updateData.profilePictureUrl
        );
      } catch (error) {
        console.error("Error uploading profile picture to Cloudinary:", error);
      }
    }

    const updatedUser = (await prisma.user.update({
      where: { username },
      data: {
        ...updateData,
        profilePictureUrl: profilePictureUrl.secure_url,
      },
      include: {
        followers: { select: { followingId: true } },
        following: { select: { followerId: true } },
        _count: { select: { followers: true, following: true } },
      },
    })) as MyTypeUser;

    if (!updatedUser) throw new Error("User not found");

    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign(updatedUser, jwtSecret);

    return { token, updatedUser };
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

async function deleteUser(username: string) {
  try {
    const deletedUser = await prisma.user.delete({
      where: { username },
    });
    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

async function loginUser(userData: LoginAccountDTO) {
  try {
    const validate = LoginAccountSchema.validate(userData);
    if (validate.error) {
      throw new Error(validate.error.message);
    }

    const userDB = (await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
      include: {
        followers: { select: { followingId: true } },
        following: { select: { followerId: true } },
        _count: { select: { followers: true, following: true } },
      },
    })) as MyTypeUser;

    if (!userDB) throw new Error("User not found");
    if (!userDB.isVerified) throw new Error("email not verified");


    const isValidPassword = await bcrypt.compare(
      userData.password,
      userDB.password
    );

    if (!isValidPassword) throw new Error("Password not valid");
    delete userDB.password;

    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign(userDB, jwtSecret);

    return { token, userDB };
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
}


export default {
  findAllUsers,
  findUserByName,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  findAllUsersByName,
};
