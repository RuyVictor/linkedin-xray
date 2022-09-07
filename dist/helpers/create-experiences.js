"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Experiences = void 0;
const jsdom_1 = __importDefault(require("jsdom"));
class Experiences {
    constructor(html) {
        this.experiences = [];
        this.document = new jsdom_1.default.JSDOM(html).window.document;
    }
    create() {
        var _a, _b, _c;
        const nodesArray = Array.from(this.document.querySelectorAll(".experience__list>li"));
        for (const item of nodesArray) {
            const isGroupOfExperiences = !!item.querySelector(".experience-group-header");
            if (!isGroupOfExperiences) {
                const company = item.querySelector(".profile-section-card__subtitle");
                const location = item.querySelector(".experience-item__location");
                const startDate = item.querySelector(".experience-item__duration .date-range time:nth-child(1)");
                const endDate = item.querySelector(".experience-item__duration .date-range time:nth-child(2)");
                const duration = item.querySelector(".experience-item__duration .date-range .date-range__duration");
                const position = item.querySelector(".profile-section-card__title");
                const description = item.querySelector(".show-more-less-text__text--less");
                this.experiences.push({
                    company: company.textContent.trim(),
                    timeline: [
                        {
                            location: (_a = location === null || location === void 0 ? void 0 : location.textContent) === null || _a === void 0 ? void 0 : _a.trim(),
                            position: position.textContent.trim(),
                            dateRange: {
                                startDate: startDate.textContent.trim(),
                                endDate: ((_b = endDate === null || endDate === void 0 ? void 0 : endDate.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || "the moment",
                                duration: duration.textContent.trim(),
                            },
                            description: (_c = description === null || description === void 0 ? void 0 : description.textContent) === null || _c === void 0 ? void 0 : _c.trim(),
                        },
                    ],
                });
            }
            else {
                const company = item.querySelector(".experience-group-header__company");
                const nodeLocations = Array.from(item.querySelectorAll(".experience-group-position__location"));
                const nodeStartDates = Array.from(item.querySelectorAll(".experience-group-position__duration .date-range time:nth-child(1)"));
                const nodeEndDates = Array.from(item.querySelectorAll(".experience-group-position__duration .date-range time:nth-child(2)"));
                const nodeDurations = Array.from(item.querySelectorAll(".experience-group-position__duration .date-range .date-range__duration"));
                const nodePositions = Array.from(item.querySelectorAll(".profile-section-card__title"));
                const nodeDescriptions = Array.from(item.querySelectorAll(".show-more-less-text__text--less"));
                const locations = nodeLocations.map((item) => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.textContent) === null || _a === void 0 ? void 0 : _a.trim(); });
                const startDates = nodeStartDates.map((item) => { var _a; return (_a = item.textContent) === null || _a === void 0 ? void 0 : _a.trim(); });
                const endDates = nodeEndDates.map((item) => { var _a; return ((_a = item === null || item === void 0 ? void 0 : item.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "the moment"; });
                const durations = nodeDurations.map((item) => { var _a; return (_a = item.textContent) === null || _a === void 0 ? void 0 : _a.trim(); });
                const positions = nodePositions.map((item) => { var _a; return (_a = item.textContent) === null || _a === void 0 ? void 0 : _a.trim(); });
                const descriptions = nodeDescriptions.map((item) => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.textContent) === null || _a === void 0 ? void 0 : _a.trim(); });
                const timeline = nodePositions.map((item, index) => ({
                    position: positions[index],
                    location: locations[index],
                    dateRange: {
                        startDate: startDates[index],
                        endDate: endDates[index],
                        duration: durations[index],
                    },
                    description: descriptions[index],
                }));
                this.experiences.push({
                    company: company.textContent.trim(),
                    timeline,
                });
            }
        }
        return this.experiences;
    }
}
exports.Experiences = Experiences;
