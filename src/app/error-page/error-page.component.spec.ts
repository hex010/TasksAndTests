import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { ErrorPageComponent } from "./error-page.component";
import { NavigationExtras, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

describe('ErrorPageComponent', () => {
  let component: ErrorPageComponent;
  let fixture: ComponentFixture<ErrorPageComponent>;
  let router: Router;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorPageComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set errorMessage from state', () => {
    const navigationExtras: NavigationExtras = {
      state: { message: 'Custom Error Message' }
    };
    spyOn(router, 'getCurrentNavigation').and.returnValue({
      extras: navigationExtras
    } as any);

    component = new ErrorPageComponent(router); // perkuriam komponenta, kad inicijuotu errorMessage
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Custom Error Message');
  });

  it('should set default errorMessage when state message is not set', () => {
    spyOn(router, 'getCurrentNavigation').and.returnValue({
      extras: {}
    } as any);

    component = new ErrorPageComponent(router); // perkuriam komponenta, kad inicijuotu errorMessage
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Puslapis nerastas');
  });

});
