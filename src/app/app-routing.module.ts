import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TestsComponent } from './tests/tests.component';
import { TasksComponent } from './tasks/tasks.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { QuizpageComponent } from './quizpage/quizpage.component';
import { QuizResolver } from './resolvers/quiz.resolver';
import { ErrorPageComponent } from './error-page/error-page.component';
import { QuizresultComponent } from './quizresult/quizresult.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'tests', component:TestsComponent},
  {path: 'test/:id', component:QuizpageComponent, canActivate: [AuthGuard], resolve: {quiz: QuizResolver}},
  {path: 'test/:id/result', component:QuizresultComponent, canActivate: [AuthGuard]},
  {path: 'tasks', component:TasksComponent, canActivate: [AuthGuard]},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'profile', component:MyProfileComponent, canActivate: [AuthGuard]},
  {path: '**', component:ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
