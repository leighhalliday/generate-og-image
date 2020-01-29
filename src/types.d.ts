interface ParsedReqs {
  author: string;
  title: string;
  website: string;
  image: string;
}

declare module "puppeteer-core";
declare module "puppeteer";

type Browser = any;
type ConnectOptions = any;
type FetcherOptions = any;
type BrowserFetcher = any;
type ChromeArgOptions = any;
type LaunchOptions = any;
