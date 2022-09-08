"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.About = void 0;
const jsdom_1 = __importDefault(require("jsdom"));
class About {
    constructor(html) {
        this.document = new jsdom_1.default.JSDOM(html).window.document;
    }
    create() {
        var _a, _b, _c, _d, _e;
        const name = this.document.querySelector(".top-card-layout__title");
        const title = this.document.querySelector(".top-card-layout__headline");
        const description = this.document.querySelector(".core-section-container__content");
        const location = this.document.querySelector(".top-card__subline-item:nth-child(1)");
        const [city, state, country] = (_b = (_a = location === null || location === void 0 ? void 0 : location.textContent) === null || _a === void 0 ? void 0 : _a.trim().split(", ")) !== null && _b !== void 0 ? _b : [];
        this.about = {
            name: (_c = name.textContent) === null || _c === void 0 ? void 0 : _c.trim(),
            title: (_d = title.textContent) === null || _d === void 0 ? void 0 : _d.trim(),
            location: {
                city,
                state,
                country,
            },
            description: (_e = description === null || description === void 0 ? void 0 : description.textContent) === null || _e === void 0 ? void 0 : _e.trim(),
        };
        return this.about;
    }
}
exports.About = About;
