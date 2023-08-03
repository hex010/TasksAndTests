import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Quiz } from '../models/Quiz.interface';
import { QuizFinish } from '../models/QuizFinish.interface';
import { QuizService } from '../services/quiz.service';
import { QuizResult } from '../models/QuizResult.interface';

@Component({
  selector: 'app-quizpage',
  templateUrl: './quizpage.component.html',
  styleUrls: ['./quizpage.component.scss']
})
export class QuizpageComponent {
  constructor(private route: ActivatedRoute, private router: Router, private quizService : QuizService) {}

  quiz!: Quiz;
  public currentQuestion: number = 0;
  public selectedAnswers: number[] = [];
  public errorMessage: string = '';
  public quizResult! : QuizResult;

  public totalQuestions : number = 0;
  public submittedQuesions : number = 0;

  public timerValue : number = 1000;
  private interval : any;
  public isTimerEnding : boolean = false;

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.quiz = data['quiz'];
    })

    this.totalQuestions = this.quiz.questions.length;
    this.timerValue = this.quiz.timerInSeconds;

    for (let i = 0; i < this.quiz.questions.length; i++) {
      this.selectedAnswers[i] = 0;
    }

    this.startQuizTimer();
  }

  startQuizTimer() {
    this.interval = setInterval(() => {
      this.timerValue--;

      if (this.timerValue === 60) { //likus minutei
        this.isTimerEnding = true;
      }

      if (this.timerValue === 0) { //pasibaigus
        clearInterval(this.interval);
        this.finishQuizByTimer();
      }
    }, 1000); // timer kas sekunde mazes
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  moveToPreviousQuestion() {
    this.currentQuestion--;
  }

  moveToNextQuestion() {
    if(this.selectedAnswers[this.currentQuestion] == 0) {
      this.errorMessage = "Prašome pasirinkti vieną iš atsakymų";
      return;
    }

    this.currentQuestion++;
  }

  finishQuizByTimer() {
    const quizFinish : QuizFinish = {quiz_id: this.quiz.id, answers: this.selectedAnswers};
    
    this.quizService.finishQuizAndGetResults(quizFinish).subscribe({
      error: err => { 
        console.log("quiz finish error")
      },
      next: response => {
        this.router.navigate(['result'], {relativeTo: this.route});
        //this.router.navigate(['test', this.quiz.id, 'result']);
      },
    });
  }

  finishTest() {
    if(this.selectedAnswers[this.currentQuestion] == 0) {
      this.errorMessage = "Prašome pasirinkti vieną iš atsakymų";
      return;
    }

    const quizFinish : QuizFinish = {quiz_id: this.quiz.id, answers: this.selectedAnswers};
    
    this.quizService.finishQuizAndGetResults(quizFinish).subscribe({
      error: err => { 
        console.log("quiz finish error")
      },
      next: response => {
        this.router.navigate(['result'], {relativeTo: this.route});
      },
    });
  }

  updateAnswer(event: Event) {
    this.errorMessage = "";
    if(this.selectedAnswers[this.currentQuestion] === 0) this.submittedQuesions++;

    const selectedAnswerId : string = (event.target as HTMLInputElement).value;
    this.selectedAnswers[this.currentQuestion] = +selectedAnswerId; //+ - konvertuoja is string i int
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
