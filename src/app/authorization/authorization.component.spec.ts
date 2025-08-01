import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorizationComponent } from './authorization.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/services/authorization.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AuthorizationComponent', () => {
  let component: AuthorizationComponent;
  let fixture: ComponentFixture<AuthorizationComponent>;

  const mockAuthService = {
    authenticate: jasmine.createSpy('authenticate').and.returnValue(of({ result: { token: 'mock-token' } })),
    setToken: jasmine.createSpy('setToken')
  };

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorizationComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('должен создать компонент', () => {
    expect(component).toBeTruthy();
  });

  it('форма должна быть невалидна при инициализации', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('форма становится валидной при корректных данных', () => {
    component.loginForm.setValue({ username: 'admin', password: 'admin' });
    expect(component.loginForm.valid).toBeTrue();
  });
});
