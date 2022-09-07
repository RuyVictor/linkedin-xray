import { IAbout } from "./about.interface";
import { IExperience } from "./experience.interface";
import { IEducationalBackground } from "./educational-background.interface";
import { ILanguage } from "./language.interface";
export interface IAllInformations {
    about: IAbout;
    experiences: IExperience[];
    educationalBackground: IEducationalBackground[];
    languages: ILanguage[];
}
