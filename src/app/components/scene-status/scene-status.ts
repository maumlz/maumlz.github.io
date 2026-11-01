import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export type SceneLoadState = 'loading' | 'ready' | 'fallback';

@Component({
  selector: 'app-scene-status',
  imports: [TranslatePipe],
  template: `<p role="status" aria-live="polite" aria-atomic="true">
    {{ 'scene_status.' + state() | translate }}
  </p>`,
  styles: `
    :host {
      display: block;
      position: absolute;
      bottom: 0.75rem;
      left: 1rem;
      right: 1rem;
      z-index: 1;
      text-align: center;
      pointer-events: none;
    }
    p {
      display: inline-block;
      margin: 0;
      padding: 0.25rem 0.6rem;
      border-radius: 0.25rem;
      color: #d1dbe5;
      background: rgb(3 10 23 / 85%);
      font-size: 0.75rem;
      line-height: 1.5;
    }
    @media print {
      :host {
        display: none;
      }
    }
  `,
})
export class SceneStatus {
  readonly state = input<SceneLoadState>('loading');
}
