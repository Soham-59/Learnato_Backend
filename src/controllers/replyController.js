import Reply from "../models/Reply.js";

export const addReply = async (req, res) => {
  try {
    const reply = await Reply.create({
      postId: req.params.id,
      content: req.body.content,
      author: req.body.author || "User",
    });
    res.status(201).json(reply);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
