import FormAuthenticationPage from '../pages/FormAuthentication.page';
import { LoginDetails } from '../domain/LoginDetails.domain';
import { users } from '../data/TestData';
import SecurePage from '../pages/Secure.page';
import { Constants } from '../data/Constants';

describe('Form Authentication page', () => {
    beforeEach(() => {
        FormAuthenticationPage.navigate();
    });

    it('Empty username', () => {
        const loginDetails = Object.assign(LoginDetails, users.validFormUser);
        loginDetails.username = '';

        FormAuthenticationPage.submitLogin(loginDetails);
        FormAuthenticationPage.assertErrorLabelText(
            Constants.INVALID_USERNAME_MESSAGE,
        );
    });

    it('Invalid username', () => {
        const loginDetails = Object.assign(LoginDetails, users.validFormUser);
        loginDetails.username = 'invalid';

        FormAuthenticationPage.submitLogin(loginDetails);
        FormAuthenticationPage.assertErrorLabelText(
            Constants.INVALID_USERNAME_MESSAGE,
        );
    });

    it('Empty password', () => {
        const loginDetails = Object.assign(LoginDetails, users.validFormUser);
        loginDetails.password = '';

        FormAuthenticationPage.submitLogin(loginDetails);
        FormAuthenticationPage.assertErrorLabelText(
            Constants.INVALID_PASSWORD_MESSAGE,
        );
    });

    it('Invalid password', () => {
        const loginDetails = Object.assign(LoginDetails, users.validFormUser);
        loginDetails.password = 'invalid';

        FormAuthenticationPage.submitLogin(loginDetails);
        FormAuthenticationPage.assertErrorLabelText(
            Constants.INVALID_PASSWORD_MESSAGE,
        );
    });

    it('Valid Login', () => {
        const loginDetails = Object.assign(LoginDetails, users.validFormUser);

        FormAuthenticationPage.submitLogin(loginDetails);
        SecurePage.assertPageUrl();
        SecurePage.assertSuccessLabelText(Constants.VALID_LOGIN_MESSAGE);
    });
});
