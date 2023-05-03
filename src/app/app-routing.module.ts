import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TestsComponent } from './tests/tests.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  {path: '', component:AppComponent},
  {path: 'tests', component:TestsComponent},
  {path: 'tasks', component:TasksComponent},
  {path: 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
