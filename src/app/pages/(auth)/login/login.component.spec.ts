import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ApiError } from '@exceptions/ApiError';

const mockRouter = { navigateByUrl: jest.fn() };
const mockAuthService = { signin: jest.fn() };
const mockToastrService = { error: jest.fn() };

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService },
        { provide: ToastrService, useValue: mockToastrService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => jest.clearAllMocks());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error if form is invalid (empty fields)', async () => {
    component.formGroup.setValue({ email: '', password: '' });
    await component.handleSubmit();
    expect(mockToastrService.error).toHaveBeenCalledWith('Preencha todos os campos');
    expect(mockAuthService.signin).not.toHaveBeenCalled();
  });

  it('should show error if password is less than 6 characters', async () => {
    component.formGroup.setValue({ email: 'test@example.com', password: '123' });
    await component.handleSubmit();
    expect(mockToastrService.error).toHaveBeenCalledWith('Preencha todos os campos');
    expect(mockAuthService.signin).not.toHaveBeenCalled();
  });

  it('should call signin and navigate on successful login', async () => {
    component.formGroup.setValue({ email: 'test@example.com', password: '123456' });
    mockAuthService.signin.mockResolvedValueOnce(undefined);
    await component.handleSubmit();
    expect(mockAuthService.signin).toHaveBeenCalledWith('test@example.com', '123456');
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/itens');
  });

  it('should show API error message when ApiError is thrown', async () => {
    const apiError = new ApiError('INVALID_CREDENTIALS', 'auth/invalid-credential');
    mockAuthService.signin.mockRejectedValueOnce(apiError);
    component.formGroup.setValue({ email: 'test@example.com', password: '123456' });
    await component.handleSubmit();
    expect(mockToastrService.error).toHaveBeenCalledWith(expect.any(String));
  });

  it('should show generic error for unknown errors', async () => {
    mockAuthService.signin.mockRejectedValueOnce(new Error('Unknown error'));
    component.formGroup.setValue({ email: 'test@example.com', password: '123456' });
    await component.handleSubmit();
    expect(mockToastrService.error).toHaveBeenCalledWith('Houve um erro ao logar');
  });
});
