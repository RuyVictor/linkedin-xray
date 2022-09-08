"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedinXray = void 0;
const create_about_1 = require("./helpers/create-about");
const create_experiences_1 = require("./helpers/create-experiences");
const create_educational_background_1 = require("./helpers/create-educational-background");
const create_languages_1 = require("./helpers/create-languages");
const profile_url_validation_1 = require("./validations/profile-url.validation");
const browser_handler_1 = require("./browser-handler");
class LinkedinXray {
    prepareUrl(profileUrl) {
        const validatedUrl = (0, profile_url_validation_1.validateProfileUrl)(profileUrl);
        const protocol = "https://";
        const formatedUrl = protocol.concat(new URL(validatedUrl).host.concat(new URL(validatedUrl).pathname));
        return formatedUrl;
    }
    getInfo({ profileUrl }) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.prepareUrl(profileUrl);
            // vulnerability discovered by 300guy
            // it is possible to view the page only once, from a google search
            const googleUrl = `https://www.google.com/url?q=${url}`;
            const browser = yield browser_handler_1.BrowserHandler.handle();
            const [page] = yield browser.pages();
            page.on("response", (r) => {
                if (r.request().resourceType() === "document")
                    if (r.status() == 404) {
                        throw new Error("Could not find this user");
                    }
            });
            yield page.goto(googleUrl, { waitUntil: "domcontentloaded" });
            yield page.waitForSelector("div > a");
            yield page.click("div > a");
            yield page.waitForNavigation({ waitUntil: "domcontentloaded" });
            const html = yield page.content();
            if (html.includes("authwall")) {
                return yield this.getInfo({ profileUrl: url }); //bypass authwall recursively
            }
            const about = new create_about_1.About(html).create();
            const experiences = new create_experiences_1.Experiences(html).create();
            const educationalBackground = new create_educational_background_1.EducationalBackground(html).create();
            const languages = new create_languages_1.Languages(html).create();
            this.profileInfo = {
                about,
                experiences,
                educationalBackground,
                languages,
            };
            yield browser.close();
            return this.profileInfo;
        });
    }
}
exports.LinkedinXray = LinkedinXray;
