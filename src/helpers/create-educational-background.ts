import jsdom from "jsdom";
import { IIEducationalBackground } from "interfaces/educational-background.interface";

export class EducationalBackground {
  educationalBackground: IEducationalBackground[] = [];
  document: Document;

  constructor(html: string) {
    this.document = new jsdom.JSDOM(html).window.document;
  }

  create(): IEducationalBackground[] {
    return this.educationalBackground;
  }
}
