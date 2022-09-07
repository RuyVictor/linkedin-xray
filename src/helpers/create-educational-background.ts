import jsdom from "jsdom";
import { IEducationalBackground } from "interfaces/educational-background.interface";

export class EducationalBackground {
  private educationalBackground: IEducationalBackground[] = [];
  private document: Document;

  constructor(html: string) {
    this.document = new jsdom.JSDOM(html).window.document;
  }

  create(): IEducationalBackground[] {
    const nodesArray = Array.from(
      this.document.querySelectorAll(".education__list>li")
    );

    for (const item of nodesArray) {
      const school = item.querySelector(".profile-section-card__title")!;
      const degree = item.querySelector(
        ".profile-section-card__subtitle>span:nth-child(1)"
      )!;
      const segment = item.querySelector(
        ".profile-section-card__subtitle>span:nth-child(2)"
      )!;
      const startDate = item.querySelector(
        ".education__item--duration .date-range time:nth-child(1)"
      )!;
      const endDate = item.querySelector(
        ".education__item--duration .date-range time:nth-child(2)"
      )!;
      const description =
        item.querySelector(".show-more-less-text__text--more") ||
        item.querySelector(".education__item--details");

      this.educationalBackground.push({
        school: school.textContent!.trim(),
        educationInfo: {
          degree: degree?.textContent?.trim(),
          segment: segment?.textContent?.trim(),
        },
        dateRange: {
          startDate: startDate?.textContent?.trim(),
          endDate: endDate?.textContent?.trim() || "the moment",
        },
        description: description?.textContent?.trim(),
      });
    }

    return this.educationalBackground;
  }
}
