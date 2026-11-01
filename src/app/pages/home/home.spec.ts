import {
  ComponentFixture,
  DeferBlockBehavior,
  DeferBlockState,
  TestBed,
} from '@angular/core/testing';

import { Home } from './home';
import { TranslateModule } from '@ngx-translate/core';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      deferBlockBehavior: DeferBlockBehavior.Manual,
      imports: [Home, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('keeps content and the fallback available before the scene loads or if its import fails', async () => {
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('app-main-scene')).toBeNull();
    expect(page.querySelector('.home-fallback')).toBeTruthy();
    const [block] = await fixture.getDeferBlocks();
    await block.render(DeferBlockState.Error);
    expect(page.querySelector('.home-fallback')).toBeTruthy();
    expect(page.querySelector('app-main-scene')).toBeNull();
  });
});
