import { SceneStatus, type SceneLoadState } from '../../components/scene-status/scene-status';
import { Component, signal } from '@angular/core';
import { DuneScene } from '../../components/threejs/dune-scene/dune-scene';

@Component({
  selector: 'app-home',
  imports: [SceneStatus, DuneScene],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly sceneState = signal<SceneLoadState>('loading');
}
