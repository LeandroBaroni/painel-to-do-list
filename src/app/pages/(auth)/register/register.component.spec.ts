import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { ApiError } from '@exceptions/ApiError';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';


const mockRouter = { navigateByUrl: jest.fn() };
const mockToastrService = { error: jest.fn() };
const mockAuthService = { signin: jest.fn() };
const mockUserService = { createUser: jest.fn() };

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RegisterComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => jest.clearAllMocks());

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should show error if form is invalid', async () => {
    component.formGroup.setValue({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    await component.handleSubmit();
    expect(mockToastrService.error).toHaveBeenCalledWith('Preencha todos os campos');
  });

  it('should not submit if passwords do not match', async () => {
    component.formGroup.setValue({
      name: 'Test User',
      email: 'test@example.com',
      password: '123456',
      confirmPassword: '654321'
    });

    await component.handleSubmit();

    expect(mockUserService.createUser).not.toHaveBeenCalled();
    expect(mockToastrService.error).not.toHaveBeenCalled();
  });

  it('should register user and login on success', async () => {
    component.formGroup.setValue({
      name: 'Test User',
      email: 'test@example.com',
      password: '123456',
      confirmPassword: '123456'
    });

    mockUserService.createUser.mockResolvedValueOnce({ id: '123' });
    mockAuthService.signin.mockResolvedValueOnce(undefined);

    await component.handleSubmit();

    expect(mockUserService.createUser).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
      password: '123456',
    });
    expect(mockAuthService.signin).toHaveBeenCalledWith('test@example.com', '123456');
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/itens');
  });

  it('should show API error on registration failure', async () => {
    const error = new ApiError('EMAIL_ALREADY_IN_USE', 'auth/email-already-in-use');
    mockUserService.createUser.mockRejectedValueOnce(error);

    component.formGroup.setValue({
      name: 'Test User',
      email: 'test@example.com',
      password: '123456',
      confirmPassword: '123456'
    });

    await component.handleSubmit();

    expect(mockToastrService.error).toHaveBeenCalledWith(expect.any(String));
  });

  it('should show generic error on unexpected failure', async () => {
    mockUserService.createUser.mockRejectedValueOnce(new Error('Fail'));

    component.formGroup.setValue({
      name: 'Test User',
      email: 'test@example.com',
      password: '123456',
      confirmPassword: '123456'
    });

    await component.handleSubmit();

    expect(mockToastrService.error).toHaveBeenCalledWith('Houve um erro ao criar usuário');
  });
});
