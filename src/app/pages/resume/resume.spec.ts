import {
  ComponentFixture,
  DeferBlockBehavior,
  DeferBlockState,
  TestBed,
} from '@angular/core/testing';
import en from '../../../../public/assets/i18n/en.json';
import es from '../../../../public/assets/i18n/es.json';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Resume } from './resume';

describe('Resume', () => {
  let fixture: ComponentFixture<Resume>;
  let translate: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      deferBlockBehavior: DeferBlockBehavior.Manual,
      imports: [Resume, TranslateModule.forRoot()],
    }).compileComponents();
    translate = TestBed.inject(TranslateService);
    translate.setTranslation('en', en);
    translate.setTranslation('es', es);
    translate.use('en');
    fixture = TestBed.createComponent(Resume);
    await fixture.whenStable();
  });

  it('renders the current resume with grouped skills and professional experience', () => {
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
    expect(page.querySelector('#projects-heading')).toBeNull();
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

  it('keeps learning separate from technical skills and updates the incident bullet in both languages', async () => {
    for (const [language, data] of [
      ['en', en],
      ['es', es],
    ] as const) {
      translate.use(language);
      await fixture.whenStable();
      const page = fixture.nativeElement as HTMLElement;
      const professional = page.querySelector('[aria-labelledby="professional-skills-heading"]')!;
      const learning = page.querySelector('[aria-labelledby="ai-learning-heading"]')!;
      expect(professional.querySelectorAll('li')).toHaveLength(4);
      for (const item of data.resume.professional_skills.items) {
        expect(professional.textContent).toContain(item);
      }
      expect(learning.querySelectorAll('li')).toHaveLength(5);
      for (const item of data.resume.ai_learning.items) {
        expect(learning.textContent).toContain(item);
      }
      expect(page.querySelector('[aria-labelledby="skills-heading"]')?.textContent).not.toMatch(
        /PyTorch|Ollama|Qwen|RAG|Transformer/,
      );
      const incident = data.resume.experience.banregio.items[7];
      const bullets = Array.from(
        page.querySelectorAll('[aria-labelledby="experience-heading"] li'),
      );
      expect(bullets.filter((item) => item.textContent?.trim() === incident)).toHaveLength(1);
      expect(page.querySelector('.professional-title')?.textContent).toContain(
        data.resume.professional_title,
      );
      expect(
        Array.from(page.querySelectorAll('section > h2[id]')).map((heading) => heading.id),
      ).toEqual([
        'summary-heading',
        'skills-heading',
        'professional-skills-heading',
        'experience-heading',
        'ai-learning-heading',
        'education-heading',
        'languages-heading',
      ]);
      expect(page.textContent).not.toMatch(/resume\.[a-z_]+/);
    }
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
  it('keeps content and the fallback available before the scene loads or if its import fails', async () => {
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('app-halo-scene')).toBeNull();
    expect(page.querySelector('.header-fallback')).toBeTruthy();
    expect(page.querySelector('h1')?.textContent).toContain('Mauricio');
    expect(page.querySelector('a[href="mailto:mauricio_esteban@live.com"]')).toBeTruthy();
    const status = page.querySelector('[role="status"]');
    expect(status?.textContent).toContain('Loading 3D scene');
    expect(status?.closest('[aria-hidden="true"]')).toBeNull();
    const [block] = await fixture.getDeferBlocks();
    await block.render(DeferBlockState.Error);
    expect(page.querySelector('[role="status"]')?.textContent).toContain('simplified background');
    expect(page.querySelector('.header-fallback')).toBeTruthy();
    expect(page.querySelector('app-halo-scene')).toBeNull();
  });
  it('mounts the renamed Halo scene with its positioning class when deferred loading completes', async () => {
    const [block] = await fixture.getDeferBlocks();
    await block.render(DeferBlockState.Complete);
    expect(fixture.nativeElement.querySelector('app-halo-scene.scene-layer')).toBeTruthy();
  });
});
