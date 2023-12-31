import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { TasksComponent } from './tasks/tasks.component';
import { TestsComponent } from './tests/tests.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyProfileService } from './services/my-profile.service';
import { QuizService } from './services/quiz.service';
import { QuizpageComponent } from './quizpage/quizpage.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { QuizResolver } from './resolvers/quiz.resolver';
import { QuizresultComponent } from './quizresult/quizresult.component';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    TasksComponent,
    TestsComponent,
    RegisterComponent,
    HomeComponent,
    MyProfileComponent,
    QuizpageComponent,
    ErrorPageComponent,
    QuizresultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    MyProfileService,
    QuizService,
    QuizResolver,
    AuthGuard,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
