import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  public errorMessage : String = "";

  constructor( 
      private http: HttpClient
  ) {}

  testAPI(){
    this.http.get('http://192.168.0.187:8080/api/v1/hiuser', { responseType: 'text' }).subscribe({
      next: (message) => {
        alert(message)
      },
      error: (err) => {
        if(err.error.message)
          this.errorMessage = err.error.message;
      }
    });
  }

}
