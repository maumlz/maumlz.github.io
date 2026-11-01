import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import en from '../../../../public/assets/i18n/en.json';
import es from '../../../../public/assets/i18n/es.json';
import { SceneStatus } from './scene-status';

describe('SceneStatus', () => {
  it('keeps a polite status visible through loading, readiness, and failure in both languages', async () => {
    TestBed.configureTestingModule({ imports: [SceneStatus, TranslateModule.forRoot()] });
    const translate = TestBed.inject(TranslateService);
    translate.setTranslation('en', en);
    translate.setTranslation('es', es);
    translate.use('en');
    const fixture = TestBed.createComponent(SceneStatus);
    await fixture.whenStable();
    const status = fixture.nativeElement.querySelector('[role="status"]') as HTMLElement;
    expect(status.getAttribute('aria-live')).toBe('polite');
    expect(status.getAttribute('aria-atomic')).toBe('true');
    expect(status.textContent).toContain('Loading 3D scene');
    fixture.componentRef.setInput('state', 'ready');
    await fixture.whenStable();
    expect(status.textContent).toContain('3D scene ready');
    translate.use('es');
    await fixture.whenStable();
    expect(status.textContent).toContain('Escena 3D lista');
    fixture.componentRef.setInput('state', 'fallback');
    await fixture.whenStable();
    expect(status.textContent).toContain('fondo simplificado');
    translate.use('en');
    await fixture.whenStable();
    expect(status.textContent).toContain('simplified background');
  });
});
