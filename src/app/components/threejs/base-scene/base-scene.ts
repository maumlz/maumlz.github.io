import { Component, ElementRef, viewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-base-scene',
  imports: [],
  template: '',
  styleUrl: './base-scene.css',
})
export class BaseScene {
  private canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('rendererCanvas');

  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;

  constructor() {}

  initThree() {
    const canvas = this.canvasRef()?.nativeElement;

    if(canvas) {
      // 1. Create the Scene
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color('#ff0000');
      
      // 2. Setup the Camera
      this.camera = new THREE.PerspectiveCamera(
        75,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000,
      );
      this.camera.position.z = 5;
      // 3. Setup the Renderer
      this.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
      //this.renderer.setSize(canvas.parentElement?.clientWidth ?? 0, canvas.parentElement?.clientHeight?? 0);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
  }
}
