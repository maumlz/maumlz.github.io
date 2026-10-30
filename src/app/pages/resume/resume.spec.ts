import { ComponentFixture, TestBed } from '@angular/core/testing';
import en from '../../../../public/assets/i18n/en.json';
import es from '../../../../public/assets/i18n/es.json';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Resume } from './resume';

describe('Resume', () => {
  let fixture: ComponentFixture<Resume>;
  let translate: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Resume, TranslateModule.forRoot()],
    }).compileComponents();
    translate = TestBed.inject(TranslateService);
    translate.setTranslation('en', en);
    translate.setTranslation('es', es);
    translate.use('en');
    fixture = TestBed.createComponent(Resume);
    await fixture.whenStable();
  });

  it('renders the current resume with grouped skills and separate projects', () => {
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelectorAll('h1')).toHaveLength(1);
    expect(page.querySelectorAll('.skills-grid h3')).toHaveLength(7);
    expect(page.querySelector('#experience-heading')?.parentElement?.textContent).toContain(
      'GitHub Copilot',
    );
    expect(page.querySelector('#experience-heading')?.parentElement?.textContent).toContain(
      'mocking',
    );
    expect(page.querySelector('#experience-heading')?.parentElement?.textContent).not.toContain(
      'Othala',
    );
    expect(page.querySelector('#projects-heading')?.parentElement?.textContent).toContain(
      'Sistema Hera',
    );
    expect(page.textContent).not.toMatch(/resume\.[a-z_]+/);
  });

  it('updates the entire resume when switching languages', async () => {
    translate.use('es');
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.textContent).toContain('Resumen profesional');
    expect(page.textContent).toContain('Analista Programador Senior');
    expect(page.textContent).not.toMatch(/resume\.[a-z_]+/);
    expect(page.querySelectorAll('.skills-grid h3')).toHaveLength(7);
  });

  it('preserves contact links and prevents navigation to the missing PDF', () => {
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('a[href="mailto:mauricio_esteban@live.com"]')).toBeTruthy();
    const download = page.querySelector('a[download]')!;
    const event = new MouseEvent('click', { cancelable: true });
    download.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(download.getAttribute('aria-disabled')).toBe('true');
  });
});
