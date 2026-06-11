import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, viewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-header-scene',
  imports: [],
  templateUrl: './header-scene.html',
  styleUrl: './header-scene.css',
})
export class HeaderScene implements AfterViewInit, OnDestroy{

  private canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('rendererCanvas');

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private cube!: THREE.Mesh;
  private animationFrameId!: number;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.initThree();
    this.createCube();
    
    // Run the animation loop outside Angular Zone to prevent heavy change detection cycles
    this.ngZone.runOutsideAngular(() => {
      this.animate();
    });
  }

  ngOnDestroy(): void {
    // Clean up animation frame loop and dispose renderer elements to prevent memory leaks
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.renderer.dispose();
  }

  private initThree() {
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
      1000
    );
    this.camera.position.z = 5;

    // 3. Setup the Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  private createCube(): void {
    // 4. Add an Object (Geometry + Material = Mesh)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ffcc, wireframe: true });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
  }

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);

    // Rotate the cube on each frame
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    // Render the scene
    this.renderer.render(this.scene, this.camera);
  };

}
