import { PrismaClient, Prisma } from "@prisma/client";
import { CreateCommentDTO, UpdateCommentDTO } from "../dto/dto-comment";
import uploadCloudinary from "../cloudinary-config";
import { MyCommentsType } from "../types/comment-types";
import { ReplyComment } from "../dto/dto-based-on-schema";

const prisma = new PrismaClient();

async function findAllComments() {
  try {
    const comments = (await prisma.comment.findMany({
      include: {
        author: {
          select: {
            name: true,
            username: true,
            profilePictureUrl: true,
          },
        },
        likes: {
          select: {
            user: {
              select: {
                name: true,
                username: true,
                profilePictureUrl: true,
              },
            },
          },
        },
        _count: { select: { likes: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
    })) as MyCommentsType[];
    return comments;
  } catch (error) {
    console.error("Error fetching all comments:", error);
    throw error;
  }
}

async function findAllCommentsByUserId(threadId: number) {
  try {
    const comments = (await prisma.comment.findMany({
      where: { threadId },
      include: {
        author: {
          select: {
            name: true,
            username: true,
            profilePictureUrl: true,
          },
        },
        likes: {
          select: {
            user: {
              select: {
                name: true,
                username: true,
                profilePictureUrl: true,
              },
            },
          },
        },
        _count: { select: { likes: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
    })) as MyCommentsType[];
    return comments;
  } catch (error) {
    console.error("Error fetching all comments:", error);
    throw error;
  }
}

async function findCommentById(commentId: number) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    return comment;
  } catch (error) {
    console.error("Error fetching comment by ID:", error);
    throw error;
  }
}

async function createComment(commentData: CreateCommentDTO) {
  try {
    let uploadImage: { secure_url: string | null } = { secure_url: null };

    if (commentData.imageUrl) {
      try {
        uploadImage = await uploadCloudinary(commentData.imageUrl);
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }

    const newComment = await prisma.comment.create({
      data: {
        ...commentData,
        imageUrl: uploadImage.secure_url,
      },
    });
    return newComment;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
}

async function updateComment(commentId: number, updateData: UpdateCommentDTO) {
  try {
    let uploadImage: { secure_url: string | null } = { secure_url: null };

    if (updateData.imageUrl) {
      try {
        uploadImage = await uploadCloudinary(updateData.imageUrl);
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }

    const existingComment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!existingComment) {
      return null;
    }

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { ...updateData, imageUrl: uploadImage.secure_url },
    });

    return updatedComment;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
}

export const deleteComment = async (commentId: number) => {
  try {
    // Verifikasi apakah komentar tersebut ada
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { id: true },
    });


    // Hapus likes pada komentar
    await prisma.commentLike.deleteMany({
      where: { commentId },
    });

    // Cari semua balasan komentar terkait komentar
    const replyComments = await prisma.replyComment.findMany({
      where: { commentId },
      select: { id: true },
    }) as ReplyComment[];

    if (replyComments.length > 0) {
      const replyCommentIds = replyComments.map((reply) => reply.id);

      // Hapus likes pada balasan komentar
      await prisma.replyCommentLike.deleteMany({
        where: { replyCommentId: { in: replyCommentIds } },
      });

      // Hapus balasan komentar
      await prisma.replyComment.deleteMany({
        where: { id: { in: replyCommentIds } },
      });
    }

    // Hapus komentar
    await prisma.comment.delete({
      where: { id: commentId },
    });

    return { message: "Comment deleted successfully" };
  } catch (error) {
    throw new Error(`Error deleting comment: ${error.message}`);
  }
};

export default {
  findAllComments,
  findAllCommentsByUserId,
  findCommentById,
  createComment,
  updateComment,
  deleteComment,
};
