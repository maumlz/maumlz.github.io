import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-resume',
  imports: [TranslatePipe],
  templateUrl: './resume.html',
  styleUrl: './resume.css',
  standalone: true,
})
export class Resume {
  // Most recent end date first; tied end dates use the most recent start date.
  readonly experienceKeys = ['banregio', 'code_builders', 'dvrv', 'polyhedron_universe'];
}
