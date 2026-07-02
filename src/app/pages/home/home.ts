import { Component } from '@angular/core';
import { MainScene } from "../../components/threejs/main-scene/main-scene";

@Component({
  selector: 'app-home',
  imports: [MainScene],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
