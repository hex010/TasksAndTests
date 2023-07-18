export class MyProfileModel {
    public email: string;
    public firstname: string;
    public lastname: string;
    public gender: string;

    constructor(email: string, firstname: string, lastname: string, gender: string){
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
    }
}