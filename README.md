# OTF Image Resizer

A JavaScript module for processing images by resizing them and converting them to WebP format.

Key Features:

+ resize on the fly
+ vercel-ready deployment
+ the image files request won't be saved into disk. 

## Usage

Upload the app to your server. And the host is located at https://cdn.yourdomain.app.
let's say you have an image with url: https://myblog.me/img/panda.png, note that you have to make sure you don't include the http protocol.


```javascript
// Example hot to use the URL
const appHost = `https://cdn.yourdomain.app`;
const imageUrl = `myblog.me/img/panda.png`;
const w = 100; // width
const h = 100; // height
const q = 90; // quality
const processedImage = `${appHost}/img/?w=${w}&h=${h}&q=${q}&img=${imageUrl}`;

console.log(processedImage);
```


Result:
```
https://cdn.yourdomain.app/img/?w=100&h=100&q=90&img=myblog.me/img/panda.png
```

## Development

```
yarn install

yarn dev
```