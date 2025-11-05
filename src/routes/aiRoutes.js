// import express from "express";
// import fetch from "node-fetch";

// const router = express.Router();

// // 🔐 Load Hugging Face API Key from environment
// const HF_API_KEY = process.env.HF_API_KEY;

// // 🧠 POST /api/ai/summarize
// router.post("/summarize", async (req, res) => {
//   try {
//     const { text } = req.body;

//     // Validate input
//     if (!text || text.trim().length < 20) {
//       return res.status(400).json({
//         summary: "Text too short to summarize. Please provide more content.",
//       });
//     }

//     // Combine and limit to 1000 words max for better summarization
//     const limitedText = text.split(" ").slice(0, 1000).join(" ");

//     // Call Hugging Face API (Facebook Bart-Large-CNN or DistilBART)
//     const response = await fetch(
//       "https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6",
//       {
//         headers: {
//           Authorization: `Bearer ${HF_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         method: "POST",
//         body: JSON.stringify({ inputs: limitedText }),
//       }
//     );

//     const data = await response.json();

//     // Handle empty or invalid responses
//     let summary = "No summary found.";
//     if (Array.isArray(data) && data.length > 0 && data[0].summary_text) {
//       summary = data[0].summary_text.trim();
//     } else if (data.error) {
//       summary = `Model error: ${data.error}`;
//     }

//     // If still no summary, retry once with different model
//     if (summary === "No summary found.") {
//       const retryRes = await fetch(
//         "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
//         {
//           headers: {
//             Authorization: `Bearer ${HF_API_KEY}`,
//             "Content-Type": "application/json",
//           },
//           method: "POST",
//           body: JSON.stringify({ inputs: limitedText }),
//         }
//       );
//       const retryData = await retryRes.json();
//       if (
//         Array.isArray(retryData) &&
//         retryData.length > 0 &&
//         retryData[0].summary_text
//       ) {
//         summary = retryData[0].summary_text.trim();
//       }
//     }

//     return res.json({ summary });
//   } catch (err) {
//     console.error("❌ AI Summarization Error:", err);
//     res
//       .status(500)
//       .json({ summary: "Server error while summarizing text." });
//   }
// });

// export default router;

import express from "express";
import fetch from "node-fetch";

const router = express.Router();
const HF_API_KEY = process.env.HF_API_KEY;

// 🧠 POST /api/ai/summarize
router.post("/summarize", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim().length < 20) {
      return res.status(400).json({
        summary: "Text too short to summarize. Please provide more content.",
      });
    }

    const limitedText = text.split(" ").slice(0, 1000).join(" ");

    // ✅ NEW ENDPOINT
    const HF_URL =
      "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn";

    const response = await fetch(HF_URL, {
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: limitedText }),
    });

    const data = await response.json();

    let summary = "No summary found.";
    if (Array.isArray(data) && data[0]?.summary_text) {
      summary = data[0].summary_text.trim();
    } else if (data.error) {
      summary = `Model error: ${data.error}`;
    }

    res.json({ summary });
  } catch (err) {
    console.error("❌ AI Summarization Error:", err);
    res.status(500).json({
      summary: "Server error while summarizing text.",
    });
  }
});

export default router;
