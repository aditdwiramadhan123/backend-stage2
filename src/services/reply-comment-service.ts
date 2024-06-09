import { PrismaClient } from "@prisma/client";
import { CreateCommentReplyDTO, UpdateCommentReplyDTO } from "../dto/dto-comment-reply";
import uploadCloudinary from "../cloudinary-config";

const prisma = new PrismaClient();

async function findAllReplyComments(commentId: number) {
  try {
    const replyComments = await prisma.replyComment.findMany({
      where: { commentId },
    });
    return replyComments;
  } catch (error) {
    console.error("Error fetching all reply comments:", error);
    throw error;
  }
}

async function findReplyCommentById(replyCommentId: number) {
  try {
    const replyComment = await prisma.replyComment.findUnique({
      where: { id: replyCommentId },
    });
    return replyComment;
  } catch (error) {
    console.error("Error fetching reply comment by ID:", error);
    throw error;
  }
}

async function createReplyComment(replyCommentData: CreateCommentReplyDTO) {
  try {
    let uploadImage: { secure_url: string | null } = { secure_url: null };

    if (replyCommentData.imageUrl) {
      try {
        uploadImage = await uploadCloudinary(replyCommentData.imageUrl);
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }

    const newReplyComment = await prisma.replyComment.create({
      data: {
        ...replyCommentData,
        imageUrl: uploadImage.secure_url,
      },
    });
    return newReplyComment;
  } catch (error) {
    console.error("Error creating reply comment:", error);
    throw error;
  }
}

async function updateReplyComment(replyCommentId: number, updateData: UpdateCommentReplyDTO) {
  try {
    let uploadImage: { secure_url: string | null } = { secure_url: null };

    if (updateData.imageUrl) {
      try {
        uploadImage = await uploadCloudinary(updateData.imageUrl);
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }

    const existingReplyComment = await prisma.replyComment.findUnique({
      where: { id: replyCommentId },
    });

    if (!existingReplyComment) {
      return null;
    }

    const updatedReplyComment = await prisma.replyComment.update({
      where: { id: replyCommentId },
      data: { ...updateData, imageUrl: uploadImage.secure_url },
    });

    return updatedReplyComment;
  } catch (error) {
    console.error("Error updating reply comment:", error);
    throw error;
  }
}

async function deleteReplyComment(replyCommentId: number) {
  try {
    const deletedReplyComment = await prisma.replyComment.delete({
      where: { id: replyCommentId },
    });
    return deletedReplyComment;
  } catch (error) {
    console.error("Error deleting reply comment:", error);
    throw error;
  }
}

export default {
  findAllReplyComments,
  findReplyCommentById,
  createReplyComment,
  updateReplyComment,
  deleteReplyComment,
};
