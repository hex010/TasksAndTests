import { Component } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizResult } from '../models/QuizResult.interface';

@Component({
  selector: 'app-quizresult',
  templateUrl: './quizresult.component.html',
  styleUrls: ['./quizresult.component.scss']
})
export class QuizresultComponent {
  private quizId!: string;
  public quizResult! : QuizResult;
  public errorMessage : string = "";

  constructor( 
    private quizService : QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.quizId = id;
      } else {
        this.router.navigate(['/']);
      }
    });

    this.quizService.getQuizResult(this.quizId).subscribe({
      error: err => { 
        if(err.error.message)
          this.errorMessage = err.error.message;
       },
      next: response => { 
        this.quizResult = response;
      }
    });
  }
}
