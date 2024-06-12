import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

interface FollowerType {
  follower: {
    id: number;
    name: string;
    username: string;
    profilePictureUrl: string | null;
    following: {
      followerId: number;
    }[];
  };
}

interface FollowingType {
  following: {
    id: number;
    name: string;
    username: string;
    profilePictureUrl: string | null;
    following: {
      followerId: number;
    }[];
  };
}

async function findAllFollowingUser(userId: number) {
  try {
    const following = await prisma.follow.findMany({
      where: { followerId: userId }, select:{
        following:{
          select:{
            id: true,
            name:true,
            username:true,
            profilePictureUrl:true,
            // follower
            following: {
              select:{
                followerId:true
              }
            }
          }
        },
      }
    }) as FollowingType[];
    return following;
  } catch (error) {
    console.error("Error fetching all following:", error);
    throw error;
  }
}

async function findAllFollowerUser(userId: number) {
  try {
    const follower = await prisma.follow.findMany({
      where: { followingId: userId }, select:{
        follower:{
          select:{
            id: true,
            name:true,
            username:true,
            profilePictureUrl:true,
            // follower
            following: {
              select:{
                followerId:true
              }
            }
          }
        },
      }
    }) as FollowerType[];
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
    throw new Error("Failed to create follow");
  }
}

async function unFollow(followerId: number, followingId: number) {
  try {
    const deletedFollow = await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
    return deletedFollow;
  } catch (error) {
    console.error("Error unfollowing user:", error);
    throw new Error("Failed to unfollow");
  }
}

async function isFollowing(followerId: number, followingId: number) {
  try {
    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
    return !!follow;
  } catch (error) {
    console.error("Error checking follow status:", error);
    throw new Error("Failed to check follow status");
  }
}




export default {
  findAllFollowerUser,
  findAllFollowingUser,
  createFollow,
  unFollow,
  isFollowing,
};
