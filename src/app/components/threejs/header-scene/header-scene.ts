import { AfterViewInit, Component, NgZone, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { BaseScene } from '../base-scene/base-scene';

@Component({
  selector: 'app-header-scene',
  imports: [],
  templateUrl: './header-scene.html',
  styleUrl: './header-scene.css',
})
export class HeaderScene extends BaseScene implements AfterViewInit, OnDestroy {
  private cube!: THREE.Mesh;
  private animationFrameId!: number;
  private resizeObserver?: ResizeObserver;

  constructor(private ngZone: NgZone) {
    super();
  }

  ngAfterViewInit(): void {
    // The header content remains usable when WebGL is unavailable.
    try {
      this.initThree();
    } catch {
      return;
    }

    if (this.renderer) {
      this.scene.background = new THREE.Color('#000');
      this.createCube();

      // Run the animation loop outside Angular Zone to prevent heavy change detection cycles
      this.ngZone.runOutsideAngular(() => {
        this.resize();
        this.resizeObserver = new ResizeObserver(this.resize);
        this.resizeObserver.observe(this.renderer.domElement);
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          this.animate();
        }
      });
    }
  }

  ngOnDestroy(): void {
    // Clean up animation frame loop and dispose renderer elements to prevent memory leaks
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.resizeObserver?.disconnect();
    this.cube?.geometry.dispose();
    if (this.cube?.material instanceof THREE.Material) {
      this.cube.material.dispose();
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  private resize = (): void => {
    const canvas = this.renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
  };

  private createCube(): void {
    // 4. Add an Object (Geometry + Material = Mesh)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x09627b, wireframe: true });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
  }

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);

    // Rotate the cube on each frame
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    // Render the scene
    if (this.renderer) {
      this.renderer.render(this.scene, this.camera);
    }
  };
}
