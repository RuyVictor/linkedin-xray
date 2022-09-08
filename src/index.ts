import puppeteer from "puppeteer";
import { About } from "./helpers/create-about";
import { Experiences } from "./helpers/create-experiences";
import { EducationalBackground } from "./helpers/create-educational-background";
import { Languages } from "./helpers/create-languages";
import { IAllInformations } from "interfaces/all-informations.interface";
import { IGetInfoDTO } from "./dtos/get-info.dto";
import { validateProfileUrl } from "./validations/profile-url.validation";
import { BrowserHandler } from "./browser-handler";

export class LinkedinXray {
  private profileInfo!: IAllInformations;

  private prepareUrl(profileUrl: string): string {
    const validatedUrl = validateProfileUrl(profileUrl);
    const protocol = "https://";
    const formatedUrl = protocol.concat(
      new URL(validatedUrl).host.concat(new URL(validatedUrl).pathname)
    );
    return formatedUrl;
  }

  async getInfo({ profileUrl }: IGetInfoDTO): Promise<IAllInformations> {
    const url = this.prepareUrl(profileUrl);
    // vulnerability discovered by 300guy
    // it is possible to view the page only once, from a google search
    const googleUrl = `https://www.google.com/url?q=${url}`;
    const browser = await BrowserHandler.handle();
    const [page] = await browser.pages();
    page.on("response", (r) => {
      if (r.request().resourceType() === "document")
        if (r.status() == 404) {
          throw new Error("Could not find this user");
        }
    });
    await page.goto(googleUrl, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("div > a");
    await page.click("div > a");
    await page.waitForNavigation({ waitUntil: "domcontentloaded" });
    const html = await page.content();
    if (html.includes("authwall")) {
      return await this.getInfo({ profileUrl: url }); //bypass authwall recursively
    }
    const about = new About(html).create();
    const experiences = new Experiences(html).create();
    const educationalBackground = new EducationalBackground(html).create();
    const languages = new Languages(html).create();
    this.profileInfo = {
      about,
      experiences,
      educationalBackground,
      languages,
    };
    await browser.close();

    return this.profileInfo;
  }
}
