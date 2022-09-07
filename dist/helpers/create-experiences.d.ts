import { IExperience } from "interfaces/experience.interface";
export declare class Experiences {
    private experiences;
    private document;
    constructor(html: string);
    create(): IExperience[];
}
