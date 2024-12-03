import { NextRequest } from "next/server";

const sharp = require("sharp");

// Helper to convert RGB to a key
const rgbToKey = (r, g, b) => `${r},${g},${b}`;

// Helper to convert a key back to RGB
const keyToRgb = (key) => key.split(",").map(Number);

export async function GET(req: NextRequest) {
//   const { url } = await req.json();

  sharp(
    "https://firebasestorage.googleapis.com/v0/b/bettergames-5408f.firebasestorage.app/o/screenshots%2Ffile.png?alt=media&token=d0157230-b99f-4f30-ad48-7b11de684697"
  )
    .raw()
    .toBuffer({ resolveWithObject: true })
    .then(({ data, info }) => {
      const colorMap = new Map();
      const pixelCount = info.width * info.height;

      // Iterate over each pixel (3 values per pixel: R, G, B)
      for (let i = 0; i < data.length; i += 3) {
        // Reduce precision for grouping similar colors (optional, e.g., group by steps of 10)
        const r = Math.floor(data[i] / 10) * 10;
        const g = Math.floor(data[i + 1] / 10) * 10;
        const b = Math.floor(data[i + 2] / 10) * 10;

        // Create a key for the RGB values
        const key = rgbToKey(r, g, b);

        // Increment the count for this color
        colorMap.set(key, (colorMap.get(key) || 0) + 1);
      }

      // Sort colors by frequency
      const sortedColors = [...colorMap.entries()]
        .sort((a, b) => b[1] - a[1]) // Sort by frequency descending
        .slice(0, 3) // Take the top 3 colors
        .map(([key, count]) => ({
          color: keyToRgb(key),
          count,
          percentage: ((count / pixelCount) * 100).toFixed(2),
        }));

      console.log("Top 3 Colors:", sortedColors);
    })
    .catch((err) => {
      console.error("Error processing image:", err);
    });
}
//
