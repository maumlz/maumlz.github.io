import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Navbar } from './navbar';
import { About } from '../../pages/about/about';

describe('Navbar', () => {
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar, TranslateModule.forRoot()],
      providers: [
        provideRouter([
          { path: '', component: About },
          { path: 'resume', component: About },
        ]),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(Navbar);
    await fixture.whenStable();
  });

  it('shows the centered home menu on the initial root URL', () => {
    expect(fixture.nativeElement.querySelector('.main-menu')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Mauricio Meléndez');
    expect(fixture.nativeElement.querySelectorAll('a')).toHaveLength(3);
  });

  it('returns to compact navigation on other routes and restores the home menu', async () => {
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/resume');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.main-menu')).toBeNull();
    await router.navigateByUrl('/?lang=en');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.main-menu')).toBeTruthy();
  });
});
