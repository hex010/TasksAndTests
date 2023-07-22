import { Component } from '@angular/core';
import { Quiz } from '../models/quiz.model';
import { QuizService } from '../services/quiz.service';
import { JwtUtils } from '../models/jwt.util';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent {

  quizzes: Quiz[] = [];
  public quizErrors : string[] = [];

  constructor (private quizService: QuizService) {}

  ngOnInit() {
    this.quizService.getBasicQuizzes().subscribe({
      error: err => { 
        this.quizErrors = [];
        if(err.error.errors)
          err.error.errors.forEach((errorMessage: string) => {
            this.quizErrors.push(errorMessage);
          });
        else
          this.quizErrors.push("Unknown quiz error"); 
      },
      next: response => { 
        this.quizzes = response
      },
    });
  }

  startQuiz(quizid : number) {
    const userId = JwtUtils.extractIdFromToken();
    
  }

}
