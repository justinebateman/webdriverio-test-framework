export class LoginDetails {
    public username: string;
    public password: string;

    constructor(params: LoginDetails = {} as LoginDetails) {
        const { username = '', password = '' } = params;

        this.username = username;
        this.password = password;
    }
}
