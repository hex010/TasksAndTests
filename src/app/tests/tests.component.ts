import { HttpClient  } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent {
  constructor( 
    private http: HttpClient
) {}

  testAPIrandom(){
    this.http.get('http://192.168.0.187:8080/api/v1/hirandom', { responseType: 'text' }).subscribe({
      next: (message) => {
        alert(message)
      },
      error: (error) => {
        alert("error");
        console.log(error);
      }
    });
  }
}
