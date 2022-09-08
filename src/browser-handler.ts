import puppeteer, { Browser } from "puppeteer";

export class BrowserHandler {
  static async handle(): Promise<Browser> {
    try {
      const instance = await puppeteer.launch({
        headless: true,
        ignoreDefaultArgs: ["--enable-automation"],
        product: "firefox",
        args: ["--no-sandbox"],
      });
      return instance;
    } catch (error) {
      return this.handle();
    }
  }
}
