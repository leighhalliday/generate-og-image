import { IncomingMessage } from "http";
import { parse } from "url";

export function parseReqs(req: IncomingMessage) {
  const { query = {} } = parse(req.url || "", true);
  const { author, title, website, image } = query;

  if (Array.isArray(author)) {
    throw new Error("Author must be string");
  }
  if (Array.isArray(title)) {
    throw new Error("Title must be string");
  }
  if (Array.isArray(website)) {
    throw new Error("Website must be string");
  }
  if (Array.isArray(image)) {
    throw new Error("Image must be string");
  }

  const parsedReqs: ParsedReqs = {
    author,
    title,
    website,
    image
  };

  console.log(JSON.stringify(parsedReqs));

  return parsedReqs;
}
