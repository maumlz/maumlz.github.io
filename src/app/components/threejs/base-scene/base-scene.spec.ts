import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseScene } from './base-scene';

describe('BaseScene', () => {
  let component: BaseScene;
  let fixture: ComponentFixture<BaseScene>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseScene],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseScene);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
