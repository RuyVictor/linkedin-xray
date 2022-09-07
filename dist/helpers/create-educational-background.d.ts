import { IEducationalBackground } from "interfaces/educational-background.interface";
export declare class EducationalBackground {
    private educationalBackground;
    private document;
    constructor(html: string);
    create(): IEducationalBackground[];
}
