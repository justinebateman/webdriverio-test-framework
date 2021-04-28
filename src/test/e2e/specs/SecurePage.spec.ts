import FormAuthenticationPage from '../pages/FormAuthentication.page';
import { LoginDetails } from '../domain/LoginDetails.domain';
import { users } from '../data/TestData';
import SecurePage from '../pages/Secure.page';

describe('Secure page', () => {
    beforeEach(() => {
        FormAuthenticationPage.navigate();
    });

    it('Navigate to secure page as anonymous user', () => {
        SecurePage.navigate();
        FormAuthenticationPage.assertPageUrl();
    });

    it('Click Logout', () => {
        const loginDetails = Object.assign(LoginDetails, users.validFormUser);

        FormAuthenticationPage.submitLogin(loginDetails);
        SecurePage.assertPageUrl();
        SecurePage.clickLogoutButton();
        FormAuthenticationPage.assertPageUrl();
    });
});
