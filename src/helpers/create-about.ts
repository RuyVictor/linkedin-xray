import jsdom from "jsdom";
import { IAbout } from "interfaces/about.interface";

export class About {
  private about!: IAbout;
  private document: Document;

  constructor(html: string) {
    this.document = new jsdom.JSDOM(html).window.document;
  }

  create(): IAbout {
    const name = this.document.querySelector(".top-card-layout__title")!;

    const title = this.document.querySelector(".top-card-layout__headline")!;

    const description = this.document.querySelector(
      ".core-section-container__content"
    )!;

    const location = this.document.querySelector(
      ".top-card__subline-item:nth-child(1)"
    )!;

    const [city, state, country] = location?.textContent?.trim().split(", ")!;

    this.about = {
      name: name.textContent?.trim()!,
      title: title.textContent?.trim()!,
      location: {
        city,
        state,
        country,
      },
      description: description?.textContent?.trim(),
    };

    return this.about;
  }
}
