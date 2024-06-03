import { Request, Response } from "express";
import FollowService from "../services/follow-service";

async function findAllFollowing(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const userIdNumber = Number(userId);
    const following = await FollowService.findAllFollowingUser(userIdNumber);
    res.status(200).json(following);
  } catch (error) {
    res.status(500).json({ error: "Failed to find following users" });
  }
}

async function findAllFollowers(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const userIdNumber = Number(userId);
    const followers = await FollowService.findAllFollowerUser(userIdNumber);
    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ error: "Failed to find followers" });
  }
}

async function createFollow(req: Request, res: Response) {
  try {
    const { userId, followingId } = req.params;
    const userIdNumber = Number(userId);
    const followingIdNumber = Number(followingId);
    const newFollow = await FollowService.createFollow(
      userIdNumber,
      followingIdNumber
    );
    res.status(201).json(newFollow);
  } catch (error) {
    res.status(500).json({ error: "Failed to create follow" });
  }
}

async function unFollow(req: Request, res: Response) {
  try {
    const { userId, followingId } = req.params;
    const userIdNumber = Number(userId);
    const followingIdNumber = Number(followingId);
    const deletedFollow = await FollowService.unFollow(userIdNumber,followingIdNumber);
    res.status(200).json(deletedFollow);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete follow" });
  }
}

export default { findAllFollowing, findAllFollowers, createFollow, unFollow };
