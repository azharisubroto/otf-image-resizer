import { Router } from "express"
import processImg from "../resize.js"
const router = Router();

/**
 * GET image
 *
 * @return image
 */
router.get("/", async (req, res) => {
  console.log(req.params);
  const newBuffer = await processImg(
    false,
    "https://example.com/image/1650350760.8826.jpeg"
  );
  try {
    res.setHeader("Content-Type", "image/webp");
    res.end(newBuffer)
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

export default router
