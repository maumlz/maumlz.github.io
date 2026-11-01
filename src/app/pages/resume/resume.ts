import { SceneStatus, type SceneLoadState } from '../../components/scene-status/scene-status';
import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { HaloScene } from '../../components/threejs/halo-scene/halo-scene';

@Component({
  selector: 'app-resume',
  imports: [TranslatePipe, HaloScene, SceneStatus],
  templateUrl: './resume.html',
  styleUrl: './resume.css',
  standalone: true,
})
export class Resume {
  readonly sceneState = signal<SceneLoadState>('loading');
  // Most recent end date first; tied end dates use the most recent start date.
  readonly experienceKeys = ['banregio', 'code_builders', 'polyhedron_universe'];
}
