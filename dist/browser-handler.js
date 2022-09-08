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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserHandler = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
class BrowserHandler {
    static handle() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const instance = yield puppeteer_1.default.launch({
                    headless: true,
                    ignoreDefaultArgs: ["--enable-automation"],
                    product: "firefox",
                    args: ["--no-sandbox"],
                });
                return instance;
            }
            catch (error) {
                return this.handle();
            }
        });
    }
}
exports.BrowserHandler = BrowserHandler;
