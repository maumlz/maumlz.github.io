import { SceneStatus, type SceneLoadState } from '../../components/scene-status/scene-status';
import { Component, signal } from '@angular/core';
import { MainScene } from '../../components/threejs/main-scene/main-scene';

@Component({
  selector: 'app-home',
  imports: [MainScene, SceneStatus],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly sceneState = signal<SceneLoadState>('loading');
}
