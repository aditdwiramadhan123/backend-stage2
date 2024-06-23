import { PrismaClient, User, VerificationType } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

async function createVerification(token: string, type: VerificationType) {
  try {
    return await prisma.verification.create({
      data: {
        token,
        type,
      },
    });
  } catch (error) {
    throw new Error(error.message || "Failed to retrieve users");
  }
}

async function verify(token: string) {
  try {
    // pakek cara, kita bikin table baru untuk khusus nyimpan tokennya, lalu cocokkan
    const verification = await prisma.verification.findUnique({
      where: { token },
    });

    console.log("token from service", token)

    const user = jwt.verify(verification.token, process.env.JWT_SECRET) as User;

    if (verification.type === "FORGOT_PASSWORD") {
      //TODO: create forgot password
      return;
    }

    return await prisma.user.update({
      data: {
        isVerified: true,
      },
      where: {
        id: Number(user.id),
      },
    });
  } catch (error) {
    throw new Error(error.message || "Failed to verify email");
  }
}

export default {
  verify,
  createVerification,
};
