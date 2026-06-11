import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderScene } from './header-scene';

describe('HeaderScene', () => {
  let component: HeaderScene;
  let fixture: ComponentFixture<HeaderScene>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderScene],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderScene);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
