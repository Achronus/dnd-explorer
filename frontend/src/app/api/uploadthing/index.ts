import { UTApi } from "uploadthing/server";

const urlTemplate = `https://utfs.io/a/${process.env.UPLOADTHING_APP_ID}`;

const utapi = new UTApi({
  apiKey: process.env.UPLOADTHING_SECRET,
});

export const FetchImg = async (filename: string) => {
  const allUrls = await utapi.listFiles();
  let fileUrl = "";

  allUrls.files.map((file) => {
    if (file.name.split(".")[0] === filename) {
      fileUrl = `${urlTemplate}/${file.key}`;
    }
  });

  return fileUrl;
};

export const FetchImgs = async (filenames: string[]) => {
  const allUrls = await utapi.listFiles();
  let fileUrls: string[] = [];

  allUrls.files.map((file) => {
    filenames.map((filename) => {
      if (file.name.split(".")[0] === filename) {
        fileUrls.push(`${urlTemplate}/${file.key}`);
      }
    });
  });

  return fileUrls;
};
