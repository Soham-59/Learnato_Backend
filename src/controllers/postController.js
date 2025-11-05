import Post from "../models/Post.js";
import Reply from "../models/Reply.js";

// ✅ Create new post
export const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get single post with replies
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const replies = await Reply.find({ postId: req.params.id });
    res.json({ post, replies });
  } catch (err) {
    res.status(404).json({ message: "Post not found" });
  }
};

// ✅ Upvote a post
export const upvotePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { votes: 1 } },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
