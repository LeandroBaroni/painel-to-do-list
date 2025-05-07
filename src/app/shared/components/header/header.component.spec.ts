import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { SessionContext } from '@contexts/session.context';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const mockUser: Partial<User> = {
    displayName: 'John Doe',
    uid: 'mock-uid',
  };

  const sessionContextMock = {
    getFirebaseUser: jest.fn().mockResolvedValue(mockUser),
    logout: jest.fn().mockResolvedValue(undefined),
  };

  const routerMock = {
    navigateByUrl: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: SessionContext, useValue: sessionContextMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize user on ngOnInit', async () => {
    await component.ngOnInit();
    expect(sessionContextMock.getFirebaseUser).toHaveBeenCalled();
    expect(component.user).toEqual(mockUser);
  });

  it('should call logout and navigate to /login', async () => {
    await component.logout();
    expect(sessionContextMock.logout).toHaveBeenCalled();
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
