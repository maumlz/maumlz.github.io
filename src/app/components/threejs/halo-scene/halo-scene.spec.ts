import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaloScene } from './halo-scene';

describe('HaloScene', () => {
  let component: HaloScene;
  let fixture: ComponentFixture<HaloScene>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HaloScene],
    }).compileComponents();

    fixture = TestBed.createComponent(HaloScene);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
