import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

async function findAllFollowingUser(userId: number) {
  try {
    const following = await prisma.follow.findMany({
      where: { followerId: userId },
    });
    return following;
  } catch (error) {
    console.error("Error fetching all following:", error);
    throw error;
  }
}

async function findAllFollowerUser(userId: number) {
  try {
    const follower = await prisma.follow.findMany({
      where: { followingId: userId },
    });
    return follower;
  } catch (error) {
    console.error("Error fetching all follower:", error);
    throw error;
  }
}

async function findFollowById(followId: number) {
  try {
    const follow = await prisma.follow.findUnique({
      where: { id: followId },
    });
    return follow;
  } catch (error) {
    console.error("Error fetching follow by ID:", error);
    throw error;
  }
}

async function createFollow(followerId: number, followingId: number) {
  try {
    const followData = { followerId, followingId };
    const newFollow = await prisma.follow.create({
      data: followData,
    });
    return newFollow;
  } catch (error) {
    console.error("Error creating follow:", error);
    throw error;
  }
}

async function unFollow(followerId: number, followingId: number) {
  try {
    const deletedFollow = await prisma.follow.deleteMany({
      where: { followerId: followerId, followingId: followingId },
    });
    return { deletedFollow };
  } catch (error) {
    console.error("Error deleting follow:", error);
    throw error;
  }
}

export default {findAllFollowerUser,findAllFollowingUser,createFollow,unFollow}
