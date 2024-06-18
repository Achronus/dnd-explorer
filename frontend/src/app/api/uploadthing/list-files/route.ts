import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi({
  apiKey: process.env.UT_SECRET,
});

export async function GET(request: Request) {
  try {
    const imgData = await utapi.listFiles();

    let filenames: string[] = [];
    let imgUrls: string[] = [];

    request.url.split("?").forEach((item) => {
      if (item.startsWith("filenames")) {
        filenames = item.split("=")[1].split(",");
      }
    });

    imgData.files.map((file) => {
      filenames.map((name) => {
        if (file.name.split(".")[0] === name) {
          imgUrls.push(file.key);
        }
      });
    });

    return NextResponse.json(imgUrls);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
