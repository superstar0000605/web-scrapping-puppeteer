"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.headless = exports.normal = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
/**
 * Creates a new browser instance.
 */
function normal() {
    return puppeteer_1.default.launch({
        headless: false,
        defaultViewport: {
            width: 1280,
            height: 720,
        },
        args: ['--start-maximized', '--disable-infobars'],
    });
}
exports.normal = normal;
/**
 * Creates a new browser instance without a UI.
 */
async function headless() {
    return puppeteer_1.default.launch({
        headless: 'new',
        defaultViewport: {
            width: 1280,
            height: 720,
        },
        args: ['--start-maximized', '--disable-infobars'],
    });
}
exports.headless = headless;
