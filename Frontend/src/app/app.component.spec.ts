import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA] // This allows unknown elements like app-navbar and app-footer
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'revcart'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('revcart');
  });

  it('should render main layout structure', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // Check that main flex container exists
    const mainContainer = compiled.querySelector('.flex.flex-col.min-h-screen');
    expect(mainContainer).toBeTruthy();

    // Check that main element exists
    const main = compiled.querySelector('main');
    expect(main).toBeTruthy();

    // Check that router-outlet exists
    const routerOutlet = compiled.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });

  it('should have navbar and footer components', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // Check for navbar
    const navbar = compiled.querySelector('app-navbar');
    expect(navbar).toBeTruthy();

    // Check for footer
    const footer = compiled.querySelector('app-footer');
    expect(footer).toBeTruthy();
  });

  it('should have proper flex layout structure', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const main = compiled.querySelector('main');
    expect(main?.classList.contains('flex-1')).toBe(true);
  });
});
