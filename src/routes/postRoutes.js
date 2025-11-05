import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  upvotePost,
} from "../controllers/postController.js";
import { addReply } from "../controllers/replyController.js";

const router = express.Router();

router.post("/posts", createPost);
router.get("/posts", getPosts);
router.get("/posts/:id", getPostById);
router.post("/posts/:id/reply", addReply);
router.post("/posts/:id/upvote", upvotePost);

export default router;
