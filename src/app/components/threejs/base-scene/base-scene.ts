import { Component, ElementRef, NgZone, viewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-base-scene',
  imports: [],
  templateUrl: './base-scene.html',
  styleUrl: './base-scene.css',
})
export class BaseScene {
  private canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('rendererCanvas');

  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;

  constructor() {}

  initThree() {
    const canvas = this.canvasRef().nativeElement;
    console.log(this.canvasRef());

    // 1. Create the Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#1e1e24');

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
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
}
