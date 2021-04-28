import {Test} from "@wdio/types/build/Frameworks";
import {performancetotal} from "wdio-performancetotal-service";

exports.config = {
    runner: 'local',
    hostname: 'localhost',
    port: 4444,
    path: '/wd/hub',
    specs: ['./src/test/**/*.spec.ts'],
    maxInstances: 2,
    capabilities: [
        {
            maxInstances: 2,
            browserName: 'chrome',
        },
    ],
    logLevel: 'trace',
    outputDir: './test-report/output',
    bail: 0,
    baseUrl: 'https://the-internet.herokuapp.com/',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    framework: 'mocha',
    mochaOpts: {
        timeout: 40000,
    },
    reporters: [
        'spec',
        [
            'allure',
            {
                outputDir: './test-report/allure-result/',
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false,
            },
        ],
    ],
    services: [
        ['chromedriver'],
        [
            'performancetotal',
            {
                disableAppendToExistingFile: false,
                performanceResultsFileName: `performance-results_${new Date().getTime()}`,
                dropResultsFromFailedTest: false,
                performanceResultsDirectory: 'performance-results',
            },
        ],
    ],
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            transpileOnly: true,
            project: 'tsconfig.json',
        },
        tsConfigPathsOpts: {
            baseUrl: './',
        },
    },
    before() {
        const chai = require('chai')
        chai.use(require('chai-string'))
        global.expect = chai.expect;
        browser.setWindowSize(1280, 720);
    },
    beforeTest: function (test: Test) {
        console.log(`Test starting - ${test.parent} - ${test.title}`);
        // clear browser data before test
        browser.execute('localStorage.clear();');
        browser.execute('sessionStorage.clear();');
        browser.deleteAllCookies();
        // start performance test
        performancetotal.sampleStart(`${test.parent} - ${test.title}`);
    },
    afterTest: function (test: Test, context: any, { error }: any) {
        // take screenshot on error
        if (error) {
            browser.takeScreenshot();
        }
        // end performance test
        performancetotal.sampleEnd(`${test.parent} - ${test.title}`);
    },
};
