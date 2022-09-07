import { IAbout } from "interfaces/about.interface";
export declare class About {
    private about;
    private document;
    constructor(html: string);
    create(): IAbout;
}
