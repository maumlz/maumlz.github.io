import { ComponentFixture, TestBed } from '@angular/core/testing';

import { vi } from 'vitest';
import { BaseScene } from '../base-scene/base-scene';
import { MainScene } from './main-scene';

describe('MainScene', () => {
  let component: MainScene;
  let fixture: ComponentFixture<MainScene>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainScene],
    }).compileComponents();

    vi.spyOn(BaseScene.prototype, 'initThree').mockImplementation(() => {
      throw new Error('WebGL unavailable');
    });
    fixture = TestBed.createComponent(MainScene);
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
