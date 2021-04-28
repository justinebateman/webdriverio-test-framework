import BasePage from './Base.page';
import { LoginDetails } from '../domain/LoginDetails.domain';
import { expect } from 'chai';
import allureReporter from '@wdio/allure-reporter';

class FormAuthenticationPage extends BasePage {
    constructor() {
        super();
    }

    url = '/login';

    //region ELEMENTS
    get txtUsername() {
        return $('#username');
    }
    get txtPassword() {
        return $('#password');
    }
    get btnLogin() {
        return $("button[type='submit']");
    }

    get lblErrorMessage() {
        return $('div.flash.error');
    }

    //endregion ELEMENTS

    //region PAGE ACTIONS

    enterUsername(username: string) {
        allureReporter.addStep(
            `Setting value of username field to ${username}`,
        );
        this.txtUsername.setValue(username);
    }

    enterPassword(password: string) {
        allureReporter.addStep(
            `Setting value of password field to ${password}`,
        );
        this.txtPassword.setValue(password);
    }

    clickLoginButton() {
        allureReporter.addStep(`Clicking login button`);
        this.btnLogin.click();
    }

    submitLogin(loginDetails: LoginDetails) {
        this.enterUsername(loginDetails.username);
        this.enterPassword(loginDetails.password);
        this.clickLoginButton();
    }

    //endregion PAGE ACTIONS

    //region ASSERTIONS

    assertErrorLabelText(expectedText: string) {
        expect(this.lblErrorMessage.getText()).to.contain(
            expectedText,
            `Check error message label text is ${expectedText}`,
        );
        allureReporter.addStep(`Error message label text is correct`);
    }

    //endregion ASSERTIONS
}
export default new FormAuthenticationPage();
