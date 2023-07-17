import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TestsComponent } from './tests/tests.component';
import { TasksComponent } from './tasks/tasks.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './services/auth.guard';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'tests', component:TestsComponent, canActivate: [authGuard]},
  {path: 'tasks', component:TasksComponent, canActivate: [authGuard]},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
