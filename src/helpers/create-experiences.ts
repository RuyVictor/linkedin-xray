import jsdom from "jsdom";
import { IExperience } from "interfaces/experience.interface";

export class Experiences {
  private experiences: IExperience[] = [];
  private document: Document;

  constructor(html: string) {
    this.document = new jsdom.JSDOM(html).window.document;
  }

  create(): IExperience[] {
    const nodesArray = Array.from(
      this.document.querySelectorAll(".experience__list>li")
    );

    for (const item of nodesArray) {
      const isGroupOfExperiences = !!item.querySelector(
        ".experience-group-header"
      );

      if (!isGroupOfExperiences) {
        const company = item.querySelector(".profile-section-card__subtitle")!;

        const location = item.querySelector(".experience-item__location")!;

        const startDate = item.querySelector(
          ".experience-item__duration .date-range time:nth-child(1)"
        )!;

        const endDate = item.querySelector(
          ".experience-item__duration .date-range time:nth-child(2)"
        );

        const duration = item.querySelector(
          ".experience-item__duration .date-range .date-range__duration"
        )!;

        const position = item.querySelector(".profile-section-card__title")!;

        const description = item.querySelector(
          ".show-more-less-text__text--less"
        )!;

        this.experiences.push({
          company: company.textContent!.trim(),
          timeline: [
            {
              location: location?.textContent?.trim(),
              position: position.textContent!.trim(),
              dateRange: {
                startDate: startDate.textContent!.trim(),
                endDate: endDate?.textContent?.trim() || "the moment",
                duration: duration.textContent!.trim(),
              },
              description: description?.textContent?.trim(),
            },
          ],
        });
      } else {
        const company = item.querySelector(
          ".experience-group-header__company"
        )!;

        const nodeLocations = Array.from(
          item.querySelectorAll(".experience-group-position__location")
        );

        const nodeStartDates = Array.from(
          item.querySelectorAll(
            ".experience-group-position__duration .date-range time:nth-child(1)"
          )
        );

        const nodeEndDates = Array.from(
          item.querySelectorAll(
            ".experience-group-position__duration .date-range time:nth-child(2)"
          )
        );

        const nodeDurations = Array.from(
          item.querySelectorAll(
            ".experience-group-position__duration .date-range .date-range__duration"
          )
        );

        const nodePositions = Array.from(
          item.querySelectorAll(".profile-section-card__title")
        );

        const nodeDescriptions = Array.from(
          item.querySelectorAll(".show-more-less-text__text--less")
        );

        const locations = nodeLocations.map((item) =>
          item?.textContent?.trim()
        );

        const startDates = nodeStartDates.map((item) =>
          item.textContent?.trim()
        );
        const endDates = nodeEndDates.map(
          (item) => item?.textContent?.trim() || "the moment"
        );
        const durations = nodeDurations.map((item) => item.textContent?.trim());
        const positions = nodePositions.map((item) => item.textContent?.trim());
        const descriptions = nodeDescriptions.map((item) =>
          item?.textContent?.trim()
        );

        const timeline = nodePositions.map((item, index) => ({
          position: positions[index]!,
          location: locations[index],
          dateRange: {
            startDate: startDates[index]!,
            endDate: endDates[index]!,
            duration: durations[index]!,
          },
          description: descriptions[index],
        }));

        this.experiences.push({
          company: company.textContent!.trim(),
          timeline,
        });
      }
    }
    return this.experiences;
  }
}
