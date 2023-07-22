import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Quiz } from "../models/quiz.model";

@Injectable()
export class QuizService {
    private basicInformationOfQuizzesURL = "http://192.168.0.187:8080/api/v1/quiz/allbasic";
    
    constructor(private http: HttpClient) {}

    getBasicQuizzes(){
        return this.http.get<Quiz[]>(this.basicInformationOfQuizzesURL);
    }
}