import { IncomingMessage, ServerResponse } from "http";
import { parseReqs } from "./parser";
import { getHtml } from "./template";
import { writeTempFile } from "./file";
import { getScreenshot } from "./chromium";

const isDev = process.env.NOW_REGION === "dev1";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  try {
    const parsedReqs = parseReqs(req);
    const html = getHtml(parsedReqs);

    const { title, author } = parsedReqs;
    const fileName = [title, author].join("-");
    const filePath = await writeTempFile(fileName, html);
    const fileUrl = `file://${filePath}`;

    const file = await getScreenshot(fileUrl, isDev);

    res.statusCode = 200;
    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader(
      "Cache-Control",
      "public,immutable,no-transform,s-max-age=21600,max-age=21600"
    );
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, an error occurred.</p>");
    console.error(e);
  }
}
