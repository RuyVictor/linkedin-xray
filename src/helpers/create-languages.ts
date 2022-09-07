import jsdom from "jsdom";
import { ILanguage } from "interfaces/language.interface";

export class Languages {
  private languages: ILanguage[] = [];
  private document: Document;

  constructor(html: string) {
    this.document = new jsdom.JSDOM(html).window.document;
  }

  create(): ILanguage[] {
    const nodesArray = Array.from(
      this.document.querySelectorAll(".languages__list>li")
    );

    for (const item of nodesArray) {
      const language = item.querySelector(".profile-section-card__title")!;
      const fluencyLevel = item.querySelector(
        ".profile-section-card__subtitle"
      )!;

      this.languages.push({
        language: language.textContent!.trim(),
        fluencyLevel: fluencyLevel.textContent!.trim(),
      });
    }

    return this.languages;
  }
}
