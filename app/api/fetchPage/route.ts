import { NextResponse, NextRequest } from "next/server";
import puppeteer from "puppeteer";
import { storage } from "@/lib/firebase/config";
import { ref, uploadBytes } from "firebase/storage";

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body from the request
    const { url } = await req.json();

    // Validate the URL
    if (!url || !/^https?:\/\/.+$/.test(url)) {
      return NextResponse.json(
        { error: "Invalid URL. Please provide a valid domain URL." },
        { status: 400 }
      );
    }

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true, // Headless mode
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Required for some environments
    });

    // Open a new page
    const page = await browser.newPage();

    // Navigate to the given URL
    await page.goto(url, { waitUntil: "networkidle2" });

    // Take a screenshot
    const screenshotBuffer = await page.screenshot({ fullPage: true });

    // Close the browser
    await browser.close();

    console.log('storage', storage)

    const storageRef = ref(storage,  'screenshots/file.png');


    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, screenshotBuffer).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });

    // Return the screenshot as a response
    return NextResponse.json({
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": 'inline; filename="screenshot.png"',
      },
    });
  } catch (error) {
    console.error("Error taking screenshot:", error);
    return NextResponse.json(
      { error: "Failed to take screenshot. Please try again later." },
      { status: 500 }
    );
  }
}
