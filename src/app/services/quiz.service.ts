import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Quiz } from "../models/Quiz.interface";
import { QuizFinish } from "../models/QuizFinish.interface";
import { QuizResult } from "../models/QuizResult.interface";

@Injectable()
export class QuizService {
    private basicInformationOfQuizzesURL = "http://192.168.0.187:8080/api/v1/quiz/all";
    private getQuizURL = "http://192.168.0.187:8080/api/v1/quiz";
    private finishQuizURL = "http://192.168.0.187:8080/api/v1/quiz/finish";
    private resultQuizURL = "http://192.168.0.187:8080/api/v1/quiz/{id}/result"; 

    constructor(private http: HttpClient) {}

    getQuizzes(sortField: string, sortOrder: string, searchField: string){
        let myparams = new HttpParams();
        
        if(sortField && sortOrder)
            myparams = myparams.set('sort', sortField + ',' + sortOrder);
        if(searchField)
            myparams = myparams.set('search', searchField);

        return this.http.get<Quiz[]>(this.basicInformationOfQuizzesURL, {params: myparams});
    }

    getQuiz(id: number) {
        return this.http.get<Quiz>(`${this.getQuizURL}/${id}`);
    }

    finishQuizAndGetResults(quizFinished: QuizFinish){
        return this.http.post<QuizResult>(this.finishQuizURL, quizFinished);
    }

    getQuizResult(quizId: string) {
        return this.http.get<QuizResult>(this.resultQuizURL.replace('{id}', quizId));
    }
}