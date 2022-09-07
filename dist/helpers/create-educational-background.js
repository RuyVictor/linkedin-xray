"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EducationalBackground = void 0;
const jsdom_1 = __importDefault(require("jsdom"));
class EducationalBackground {
    constructor(html) {
        this.educationalBackground = [];
        this.document = new jsdom_1.default.JSDOM(html).window.document;
    }
    create() {
        var _a, _b, _c, _d, _e;
        const nodesArray = Array.from(this.document.querySelectorAll(".education__list>li"));
        for (const item of nodesArray) {
            const school = item.querySelector(".profile-section-card__title");
            const degree = item.querySelector(".profile-section-card__subtitle>span:nth-child(1)");
            const segment = item.querySelector(".profile-section-card__subtitle>span:nth-child(2)");
            const startDate = item.querySelector(".education__item--duration .date-range time:nth-child(1)");
            const endDate = item.querySelector(".education__item--duration .date-range time:nth-child(2)");
            const description = item.querySelector(".show-more-less-text__text--more") ||
                item.querySelector(".education__item--details");
            this.educationalBackground.push({
                school: school.textContent.trim(),
                educationInfo: {
                    degree: (_a = degree === null || degree === void 0 ? void 0 : degree.textContent) === null || _a === void 0 ? void 0 : _a.trim(),
                    segment: (_b = segment === null || segment === void 0 ? void 0 : segment.textContent) === null || _b === void 0 ? void 0 : _b.trim(),
                },
                dateRange: {
                    startDate: (_c = startDate === null || startDate === void 0 ? void 0 : startDate.textContent) === null || _c === void 0 ? void 0 : _c.trim(),
                    endDate: ((_d = endDate === null || endDate === void 0 ? void 0 : endDate.textContent) === null || _d === void 0 ? void 0 : _d.trim()) || "the moment",
                },
                description: (_e = description === null || description === void 0 ? void 0 : description.textContent) === null || _e === void 0 ? void 0 : _e.trim(),
            });
        }
        return this.educationalBackground;
    }
}
exports.EducationalBackground = EducationalBackground;
