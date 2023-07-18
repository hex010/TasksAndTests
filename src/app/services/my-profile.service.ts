import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { MyProfileModel } from "../models/my-profile.model";
import { Gender } from "../models/Gender.enum";

@Injectable()
export class MyProfileService {
    private profileUrl = "http://192.168.0.187:8080/api/v1/user/profile";

    constructor(private http: HttpClient, private router: Router) {}

    getProfileData() {
        return this.http.get<MyProfileModel>(this.profileUrl);
    }

    updateProfileData(myProfileModel: MyProfileModel) {
        return this.http.put(this.profileUrl, myProfileModel, { responseType: 'text' });
    }
    
    getGenderKeyByValue(value: string) {
        const indexOfS = Object.values(Gender).indexOf(value as Gender);
      
        const key = Object.keys(Gender)[indexOfS];
      
        return key;
    }
}