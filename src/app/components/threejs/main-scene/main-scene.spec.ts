import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainScene } from './main-scene';

describe('MainScene', () => {
  let component: MainScene;
  let fixture: ComponentFixture<MainScene>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainScene],
    }).compileComponents();

    fixture = TestBed.createComponent(MainScene);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
