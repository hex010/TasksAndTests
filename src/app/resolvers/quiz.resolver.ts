import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Quiz } from "../models/Quiz.interface";
import { QuizService } from "../services/quiz.service";
import { EMPTY, Observable, catchError, delay } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class QuizResolver implements Resolve<Quiz> {
   constructor(private quizService : QuizService, private router: Router) {}
   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Quiz | Observable<Quiz> | Promise<Quiz> {
       return this.quizService.getQuiz(route.params['id']).pipe(
        delay(1000),
        catchError(() => {
            const errorMessage = "Testas nerastas";
            this.router.navigate(["/error", {state: {message : errorMessage}}]);
            return EMPTY;
        })
       )
   }
}