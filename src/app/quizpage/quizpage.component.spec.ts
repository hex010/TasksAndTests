import { ComponentFixture, TestBed } from "@angular/core/testing";
import { QuizpageComponent } from "./quizpage.component";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { Quiz } from "../models/Quiz.interface";
import { QuizService } from "../services/quiz.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Question } from "../models/Question.interface";

describe('QuizpageComponent', () => {
    let component: QuizpageComponent;
    let fixture: ComponentFixture<QuizpageComponent>;
  
    const quizMock: Quiz = {
        id: 1,
        authorUsername: 'exampleUser',
        header: 'Quiz 1 Header',
        description: 'This is quiz 1',
        creationDate: '2000-01-01',
        likes: 0,
        dislikes: 0,
        solved: false,
        reactedUsers: [],
        questions: [
            {
                id: 1,
                text: 'Question 1 text?',
                answers: [],
            } as Question,
        ],
        timerInSeconds: 120,
    };

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [QuizpageComponent],
        providers: 
        [
            QuizService,
            {
                provide: ActivatedRoute,
                useValue: {
                    data: of({quiz: quizMock}), //pradine quiz reiksme nustatoma
                },
            },
        ],
        imports: [HttpClientTestingModule]
      }).compileComponents();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(QuizpageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should not increment currentQuestion and display an error if answer wasnt selected for current question', () => {
        component.currentQuestion = 1;
        component.selectedAnswers = [2, 0, 3];
    
        component.moveToNextQuestion();
    
        expect(component.errorMessage).toBe('Prašome pasirinkti vieną iš atsakymų');
        expect(component.currentQuestion).toBe(1);
    });

    it('should increment currentQuestion if answer was selected for current question', () => {
        component.currentQuestion = 1;
        component.selectedAnswers = [2, 8, 3];
    
        component.moveToNextQuestion();
    
        expect(component.errorMessage).toBe('');
        expect(component.currentQuestion).toBe(2);
    });

    it('should update selectedAnswers and errorMessage correctly', () => {
      const eventMock = {
        target: {
          value: '2', // Mock selected answer ID
        },
      } as unknown as Event;
  
      component.currentQuestion = 0;
      component.selectedAnswers = [0, 0, 0];
      component.errorMessage = 'Previous error message'; 
  
      component.updateAnswer(eventMock);
  
      expect(component.errorMessage).toBe('');
      expect(component.selectedAnswers[component.currentQuestion]).toBe(2);
    });
  
    it('should increment submittedQuestions if selected answer was 0', () => {
        const eventMock = {
            target: {
              value: '2', // Mock selected answer ID
            },
          } as unknown as Event;
      
  
      component.currentQuestion = 1;
      component.selectedAnswers = [0, 0, 0];
      component.submittedQuesions = 0;
  
      component.updateAnswer(eventMock);
  
      expect(component.submittedQuesions).toBe(1);
    });

    it('should not increment submittedQuestions if selected answer is not 0', () => {
        const eventMock = {
            target: {
              value: '2', // Mock selected answer ID
            },
          } as unknown as Event;
      
  
      component.currentQuestion = 2;
      component.selectedAnswers = [0, 0, 5];
      component.submittedQuesions = 1;
  
      component.updateAnswer(eventMock);
  
      expect(component.submittedQuesions).toBe(1);
    });
  });