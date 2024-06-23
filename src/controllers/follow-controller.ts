import { Request, Response } from "express";
import FollowService from "../services/follow-service";
import userService from "../services/user-service";

async function findAllFollowing(req: Request, res: Response) {
  try {
    const userLoginId = res.locals.user.id;
    const { userId } = req.params;
    const userIdNumber = Number(userId);
    const followingService = await FollowService.findAllFollowingUser(
      userIdNumber
    );
    const following = followingService.map((following) => {
      return {
        id: following.following.id,
        name: following.following.name,
        username: following.following.username,
        profilePictureUrl: following.following.profilePictureUrl,
        isFollow: following.following.following.some((following) => {
          return userLoginId === following.followerId;
        }),
      };
    });

    res.status(200).json(following);
  } catch (error) {
    res.status(500).json({ error: "Failed to find following users" });
  }
}

async function findAllFollowers(req: Request, res: Response) {
  try {
    const userLoginId = res.locals.user.id;
    const { userId } = req.params;
    const userIdNumber = Number(userId);
    const followersService = await FollowService.findAllFollowerUser(userIdNumber);
    const followers = followersService.map((follower) => {
      return {
        id: follower.follower.id,
        name: follower.follower.name,
        username: follower.follower.username,
        profilePictureUrl: follower.follower.profilePictureUrl,
        isFollow: follower.follower.following.some((following) => {
          return userLoginId === following.followerId;
        }),
      };
    });
    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ error: "Failed to find followers" });
  }
}

async function suggestFriends(req: Request, res: Response) {
  try {
    const userLoginId = res.locals.user.id;
    const usersService = await userService.findAllUsers();
    const users = usersService.map((user) => {
      return {
        id: user.id,
        name: user.name,
        username: user.username,
        profilePictureUrl: user.profilePictureUrl,
        isFollow: user.following.some((following) => {
          return userLoginId === following.followerId;
        }),
      };
    });
    const suggestFriends = users.filter((user)=>{
      return (user.isFollow==false) && (user.id!=userLoginId)
    })
    res.status(200).json(suggestFriends);
  } catch (error) {
    res.status(500).json({ error: "Failed to find followers" });
  }
}

async function following(req: Request, res: Response) {
  try {
    const userId = res.locals.user.id;
    const { followingId } = req.params;
    const followingIdNumber = Number(followingId);

    // Validasi ID yang diberikan
    if (isNaN(followingIdNumber)) {
      return res.status(400).json({ error: "Invalid following ID" });
    }

    // Cek apakah sudah mengikuti atau belum
    const isFollowing = await FollowService.isFollowing(
      userId,
      followingIdNumber
    );

    let response;
    if (isFollowing) {
      response = await FollowService.unFollow(userId, followingIdNumber);
      res.status(200).json(response);
    } else {
      response = await FollowService.createFollow(userId, followingIdNumber);
      res.status(201).json(response);
    }
  } catch (error) {
    console.error("Error handling follow/unfollow:", error);
    res.status(500).json({ error: "Failed to handle follow/unfollow request" });
  }
}

async function unFollow(req: Request, res: Response) {
  try {
    const { userId, followingId } = req.params;
    const userIdNumber = Number(userId);
    const followingIdNumber = Number(followingId);
    const deletedFollow = await FollowService.unFollow(
      userIdNumber,
      followingIdNumber
    );
    res.status(200).json(deletedFollow);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete follow" });
  }
}

export default { findAllFollowing, findAllFollowers, following, unFollow,suggestFriends };
