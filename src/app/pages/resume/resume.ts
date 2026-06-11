import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { HeaderScene } from '../../components/threejs/header-scene/header-scene';

@Component({
  selector: 'app-resume',
  imports: [TranslatePipe, HeaderScene],
  templateUrl: './resume.html',
  styleUrl: './resume.css',
  standalone: true
})
export class Resume implements OnInit {

  public text: string; 

  constructor() {
    this.text = 'Hello, world!';
   }

  ngOnInit(): void {

  }

}
