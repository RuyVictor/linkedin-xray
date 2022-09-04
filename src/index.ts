import { Experiences } from "./helpers/create-experiences";
import puppeteer from "puppeteer";
import randomUseragent from "random-useragent";
import { IAllInformations } from "interfaces/all-informations.interface";

// yandex russia proxy to bypass Linkedin Authwall
// vulnerability discovered by 300guy
const url =
  "https://translated.turbopages.org/proxy_u/en-ru.en.f3d66897-6313eefb-0fa2b576-74722d776562/https/br.linkedin.com/in/rodrigo-goncalves-santana";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    ignoreDefaultArgs: ["--enable-automation"],
    product: "chrome",
  });
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();
  const userAgent = randomUseragent.getRandom();
  await page.setUserAgent(userAgent);
  await page.goto(url);
  const html = await page.content();
  await browser.close();
  const experiences = new Experiences(html).create();
  const allInfos: IAllInformations = {
    experiences,
  };
  console.log(JSON.stringify(allInfos, null, 2));
})();
