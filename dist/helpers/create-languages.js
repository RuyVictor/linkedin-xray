"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Languages = void 0;
const jsdom_1 = __importDefault(require("jsdom"));
class Languages {
    constructor(html) {
        this.languages = [];
        this.document = new jsdom_1.default.JSDOM(html).window.document;
    }
    create() {
        const nodesArray = Array.from(this.document.querySelectorAll(".languages__list>li"));
        for (const item of nodesArray) {
            const language = item.querySelector(".profile-section-card__title");
            const fluencyLevel = item.querySelector(".profile-section-card__subtitle");
            this.languages.push({
                language: language.textContent.trim(),
                fluencyLevel: fluencyLevel.textContent.trim(),
            });
        }
        return this.languages;
    }
}
exports.Languages = Languages;
