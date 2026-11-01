import { SceneStatus, type SceneLoadState } from '../../components/scene-status/scene-status';
import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { HeaderScene } from '../../components/threejs/header-scene/header-scene';

@Component({
  selector: 'app-resume',
  imports: [TranslatePipe, HeaderScene, SceneStatus],
  templateUrl: './resume.html',
  styleUrl: './resume.css',
  standalone: true,
})
export class Resume {
  readonly sceneState = signal<SceneLoadState>('loading');
  // Most recent end date first; tied end dates use the most recent start date.
  readonly experienceKeys = ['banregio', 'code_builders', 'dvrv', 'polyhedron_universe'];
}
