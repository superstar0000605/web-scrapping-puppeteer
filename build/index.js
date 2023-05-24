"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const fs = __importStar(require("fs/promises"));
const browser = __importStar(require("./lib/browser.js"));
const wait_js_1 = __importDefault(require("./lib/wait.js"));
const baseUrl = 'https://www.airbnb.ca';
const noHeadLess = process.argv.includes('--no-headless');
const delay = process.argv.includes('--delay') ? parseInt(process.argv[process.argv.indexOf('--delay') + 1]) : 1;
async function navigate(page, url) {
    await page.goto(`${baseUrl}${url}`, {
        waitUntil: 'networkidle2',
    });
    await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
    });
    return page.evaluate(() => {
        const csv_output = [];
        const itemListElements = document.querySelectorAll('div[itemprop="itemListElement"]');
        for (const element of itemListElements) {
            const card_info = [];
            const titles = element.querySelectorAll('div[data-testid="listing-card-title"]');
            const subtitles = element.querySelectorAll('div[data-testid="listing-card-subtitle"]');
            for (const title of titles) {
                if (title.textContent) {
                    card_info.push(title.textContent);
                }
            }
            for (const subtitle of subtitles) {
                const spans = subtitle.querySelectorAll('span');
                for (const span of spans) {
                    if (span.textContent) {
                        card_info.push(span.textContent);
                    }
                }
            }
            csv_output.push(card_info);
        }
        const nextButton = document.querySelectorAll('a[aria-label="Next"]');
        return {
            csv_output,
            nextUrl: nextButton.length > 0 ? nextButton[0].getAttribute('href') : null,
        };
    });
}
async function run() {
    console.log(`Running with ${delay} second delay and ${noHeadLess ? 'no ' : ''}headless mode.`);
    const b = await (!noHeadLess ? browser.headless() : browser.normal());
    const csvFile = await fs.open('output.csv', 'w');
    let i = 1;
    let url = `/s/Coeur-d'Alene--Idaho--United-States/homes?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&flexible_trip_lengths%5B%5D=one_week&monthly_start_date=2023-06-01&monthly_length=3&price_filter_input_type=0&price_filter_num_nights=5&channel=EXPLORE&query=Coeur%20d%27Alene%2C%20ID&place_id=ChIJj3xVuvi0YVMRkFK_BVuZ5V8&date_picker_type=calendar&source=structured_search_input_header&search_type=autocomplete_click&locale=en&_set_bev_on_new_domain=1684253805_ZGNjZjFhOGE4ZGRk`;
    try {
        while (url) {
            console.log(`Page ${i++}`);
            const page = await b.newPage();
            const res = await navigate(page, url);
            // @ts-ignore
            url = res.nextUrl;
            //console.log(url);
            await (0, wait_js_1.default)(delay);
            csvFile.write(res.csv_output.join('\n'));
        }
    }
    catch (e) {
        console.error(e);
    }
    //await wait(10);
    csvFile.close();
    await b.close();
}
exports.run = run;
run().then(() => console.log('Done')).catch((e) => console.error(e));
