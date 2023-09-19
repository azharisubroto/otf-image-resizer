import sharp from "sharp";
import axios from "axios";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

function removeExtension(filename) {
  return filename.substring(0, filename.lastIndexOf(".")) || filename;
}

/**
 * Processes an image by resizing it and converting it to WebP format.
 *
 * @param {{
 *   saveFile?: boolean,
 *   img: string,
 *   w?: number,
 *   h?: number,
 *   q?: number
 * }} options
 * @returns A Buffer containing the processed image data.
 */
const processImg = async ({
  saveFile = false,
  img,
  w,
  h,
  q = 80
}) => {
  
  const _width = w ? parseInt(w) : null
  const _height = h ? parseInt(h) : null

  // Configure image options
  const imgOptions = {
    quality: parseInt(q)
  };

  // Get image blob data
  const input = (
    await axios({ url: "https://" + img, responseType: "arraybuffer" })
  ).data;
  
  // If save file mode is true
  if (saveFile) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const imgPath = img.replace("https://", "");
    const imgPathArr = imgPath.split("/");
    const fileName = imgPathArr[imgPathArr.length - 1];
    imgPathArr.pop();

    const realPath = "/img/" + imgPathArr.join("/");

    // Save image
    fs.mkdir(path.join(__dirname, realPath), { recursive: true }, (err) => {
      if (err) {
        return console.error(err);
      }

      sharp(input)
        .resize(_width, _height)
        .webp(imgOptions)
        .toFile(`${__dirname}/${realPath}/${removeExtension(fileName)}.webp`);
    });
  }

  const imgData = await sharp(input)
    // .toFormat("webp")
    .resize(_width, _height)
    .webp(imgOptions)
    .toBuffer();

  return imgData;
};

export default processImg;