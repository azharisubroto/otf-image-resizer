import express from "express";
import processImg from "./lib/resize.js";
import compression from "compression";

const app = express();
app.use(compression());

app.get("/img", async (req, res) => {

  const params = req.query

  const queryParam = {
    saveFile: false,
    img: params.img,
    w: params.w,
    h: params.h,
    q: params.q,
  }
  
  try {
    const newBuffer = await processImg(queryParam);
    res.setHeader("Content-Type", "image/webp");
    res.setHeader("Cache-Control", "public, max-age=31557600");
    res.end(newBuffer);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
