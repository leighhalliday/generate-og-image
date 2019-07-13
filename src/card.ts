import { IncomingMessage, ServerResponse } from "http";
import { parseReqs } from "./parser";
import { getHtml } from "./template";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  try {
    const parsedReqs = parseReqs(req);
    const html = getHtml(parsedReqs);

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
