import { ILanguage } from "interfaces/language.interface";
export declare class Languages {
    private languages;
    private document;
    constructor(html: string);
    create(): ILanguage[];
}
