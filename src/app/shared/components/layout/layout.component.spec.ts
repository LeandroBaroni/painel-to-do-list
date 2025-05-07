import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutComponent, HeaderComponent],
      imports: [RouterOutlet],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the header component', () => {
    const headerElement = fixture.debugElement.query(By.css('app-header'));
    expect(headerElement).toBeTruthy();
  });

  it('should contain the router outlet', () => {
    const outletElement = fixture.debugElement.query(By.css('router-outlet'));
    expect(outletElement).toBeTruthy();
  });

  it('should render the page content area', () => {
    const pageContentElement = fixture.debugElement.query(By.css('.page-content'));
    expect(pageContentElement).toBeTruthy(); // Ensures .page-content is rendered
  });
});
