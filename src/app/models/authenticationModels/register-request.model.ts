export class RegisterRequestModel {
    public email: string;
    public password: string;
    public firstname: string;
    public lastname: string;

    constructor(email: string, password: string, firstname: string, lastname: string){
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
    }
}