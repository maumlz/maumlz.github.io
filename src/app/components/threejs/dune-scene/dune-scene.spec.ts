import { ComponentFixture, TestBed } from '@angular/core/testing';

import { vi } from 'vitest';
import { BaseScene } from '../base-scene/base-scene';
import { DuneScene } from './dune-scene';

describe('MainScene', () => {
  let component: DuneScene;
  let fixture: ComponentFixture<DuneScene>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuneScene],
    }).compileComponents();

    vi.spyOn(BaseScene.prototype, 'initThree').mockImplementation(() => {
      throw new Error('WebGL unavailable');
    });
    fixture = TestBed.createComponent(DuneScene);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => vi.restoreAllMocks());

  it('keeps the canvas transparent when WebGL is unavailable', () => {
    expect(component).toBeTruthy();
    expect(component.rendered()).toBe(false);
    expect(fixture.nativeElement.querySelector('canvas').style.opacity).toBe('0');
  });
});
