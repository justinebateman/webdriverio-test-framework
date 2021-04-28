import BasePage from './Base.page';
import { expect } from 'chai';
import allureReporter from '@wdio/allure-reporter';

class SecurePage extends BasePage {
    constructor() {
        super();
    }

    url = '/secure';

    //region ELEMENTS
    get lblPageHeader() {
        return $('div#content h2');
    }
    get lblPageIntroText() {
        return $('div#content h4');
    }
    get btnLogout() {
        return $('a.button');
    }

    get lblSuccessMessage() {
        return $('div.flash.success');
    }

    //endregion ELEMENTS

    //region PAGE ACTIONS

    clickLogoutButton() {
        allureReporter.addStep(`Clicking logout button`);
        this.btnLogout.click();
    }

    //endregion PAGE ACTIONS

    //region ASSERTIONS

    assertSuccessLabelText(expectedText: string) {
        expect(this.lblSuccessMessage.getText()).to.contain(
            expectedText,
            `Check success message label text is ${expectedText}`,
        );
        allureReporter.addStep(`Success message label text is correct`);
    }

    //endregion ASSERTIONS
}
export default new SecurePage();
