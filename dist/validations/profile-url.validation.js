"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProfileUrl = void 0;
function validateProfileUrl(profileUrl) {
    try {
        const regex = new RegExp("/^((https?)://)?([w|W]{3}.)+[a-zA-Z0-9-.]{3,}.[a-zA-Z]{2,}(.[a-zA-Z]{2,})?$/");
        regex.test(profileUrl);
        return profileUrl;
    }
    catch (e) {
        throw new Error("You provided an invalid url!");
    }
}
exports.validateProfileUrl = validateProfileUrl;
