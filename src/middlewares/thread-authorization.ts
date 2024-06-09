import { NextFunction, Request, Response } from "express";
import threadService from "../services/thread-service";

export default async function threadAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { postId } = req.params;
  const threadId = Number(postId);

  console.log(res.locals.user); // Tambahkan log untuk debugging

  if (!res.locals.user || !res.locals.user.id) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  const userId = res.locals.user.id;
  console.log("User ID:", userId); // Tambahkan log untuk debugging

  const threads = await threadService.findAllThreads();

  const isUserThread = threads.some(
    (thread) => thread.authorId === userId && thread.id === threadId
  );

  if (!isUserThread) {
    return res.status(403).json({ error: "User not authorized" });
  }

  next();
}
