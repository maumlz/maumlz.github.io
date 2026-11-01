import { SceneStatus, type SceneLoadState } from '../../components/scene-status/scene-status';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [SceneStatus],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly sceneState = signal<SceneLoadState>('loading');
}
