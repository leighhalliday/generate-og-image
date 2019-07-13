import { IncomingMessage, ServerResponse } from "http";
import { parseReqs } from "./parser";
import { getHtml } from "./template";
import { writeTempFile } from "./file";

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

    console.log(fileUrl);

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(html);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, an error occurred.</p>");
    console.error(e);
  }
}
