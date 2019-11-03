import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { SharedModule } from '../shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      declarations: [
        LoginComponent
      ],
      providers:[UserService]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  }));

  it('should render', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Login');
  });
  it('should validate', async () => {
    fixture.detectChanges();

    expect(component.form.valid).toBeFalsy();

    const compiled = fixture.debugElement.nativeElement;
    let email = compiled.querySelector("input[name=email]");
    email.value = "hm@gmail.com"
    email.dispatchEvent(new Event('input'));
    let pw = compiled.querySelector("input[name=password]");
    pw.value = "123";
    pw.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.form.valid).toBeTruthy();
    const userService = fixture.debugElement.injector.get<UserService>(UserService);
    spyOn(userService, "login")
    .and.returnValue(
      new Observable(observer => {
        observer.next({ success: true, message: "Error" });
        observer.complete();
      })
    );

    // let submitSpy = spyOn(component, "submit");
    pw.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    
    // component.submit();
    compiled.querySelector("button").click();
    fixture.detectChanges();
    // expect(component.submit).toHaveBeenCalled();
    expect(userService.login).toHaveBeenCalled();
    
    fixture.whenStable().then(() => {
      expect(component.msg).toBeNull();
    });
    

  });

});
