import { expect } from 'chai';
import 'chai-string';
import allureReporter from '@wdio/allure-reporter';

class BasePage implements Page {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {}

    url = '/';

    navigate(): string {
        return browser.url(this.url);
    }

    waitForPageToLoad(): any {
        browser.waitUntil(() => browser.getUrl().endsWith(this.url), {
            timeout: 30000,
            timeoutMsg: `Timed out waiting for url to match ${this.url}`,
        });

        browser.waitUntil(
            function () {
                const state = browser.execute(function () {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    return document.readyState;
                });
                return state === 'complete';
            },
            {
                timeout: 30000,
                timeoutMsg: 'Timed out waiting for page to finish loading',
            },
        );
    }

    assertPageUrl(): void {
        this.waitForPageToLoad();
        const currentUrl = browser.getUrl();
        expect(currentUrl).to.endsWith(
            this.url,
            `Check the current url is ${this.url}`,
        );
        allureReporter.addStep(`Current url is ${this.url}`);
    }
}

export default BasePage;
