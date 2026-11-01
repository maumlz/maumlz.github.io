import { SceneStatus, type SceneLoadState } from '../../components/scene-status/scene-status';
import { Component, signal } from '@angular/core';
import { HaloScene } from '../../components/threejs/halo-scene/halo-scene';

@Component({
  selector: 'app-home',
  imports: [SceneStatus, HaloScene],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly sceneState = signal<SceneLoadState>('loading');
}
