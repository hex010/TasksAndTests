import { Component } from '@angular/core';
import { Quiz } from '../models/Quiz.interface';
import { QuizService } from '../services/quiz.service';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent {

  public selectedSortOption: string = "Sort by Newest"
  private sortField : string = "";
  private sortOrder : string = "";

  public quizzes: Quiz[] = [];
  public errorMessage : String = "";

  private searchValue = "";
  private searchSubject = new Subject<string>();
  
  public loading : boolean = false;

  constructor (private quizService: QuizService) {}

  ngOnInit() {
    this.searchSubject
      .pipe(
        //operatoriai per kuriuos search value praeina:
        debounceTime(600), //jeigu greitai ivedineja teksta, kad nebutu spamo http uzklausu, idejau timeout
        distinctUntilChanged(), //reikalingas tam, kad jei ivede ta pacia reiksme, kad nesiustu tos pacios http uzklausos
        filter((searchValue) => searchValue.length >= 3) //nesiusti uzklausa, jeigu simboliu maziau nei 3
      )
      .subscribe((searchValue) => {
        //jeigu sekmingai reiksme praejo per visus operatorius, isvedam log
        this.getQuizzes(this.sortField, this.sortOrder, searchValue);
      });

    this.getQuizzes('', '', '');
  }

  onKeyUpUpdateSearch(searchValue : string) {
    this.searchValue = searchValue;
    this.searchSubject.next(searchValue); //siunciam reiksme per per searchSubject observable
  }

  handleSearchClear() {
    this.searchValue = "";
    this.getQuizzes(this.sortField, this.sortOrder, '');
  }

  sortQuizzes(selectedSort : number) {
    switch (selectedSort) {
      case 1: {
        this.selectedSortOption = "Sort by Newest";
        this.getQuizzes('date', 'desc', this.searchValue);
        this.sortField = "date";
        this.sortOrder = "desc";
        break;
      }
      case 2: {
        this.selectedSortOption = "Sort by Oldest";
        this.getQuizzes('date', 'asc', this.searchValue);
        this.sortField = "date";
        this.sortOrder = "asc";
        break;
      }
      case 3: {
        this.selectedSortOption = "Sort by likes";
        this.getQuizzes('likes', 'desc', this.searchValue);
        this.sortField = "likes";
        this.sortOrder = "desc";
        break;
      }
      default:
        break;
    }
  }

  private getQuizzes(sortField: string, sortOrder: string, searchField: string) {
    this.loading = true;

    this.quizService.getQuizzes(sortField, sortOrder, searchField).subscribe({
      error: err => { 
        this.loading = false;
        if(err.error.message)
          this.errorMessage = err.error.message;
      },
      next: response => {
        this.loading = false;
        this.quizzes = response
      },
    });
  }

}
