import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, viewChild } from '@angular/core';
import * as THREE from 'three';
import { BaseScene } from '../base-scene/base-scene';

@Component({
  selector: 'app-header-scene',
  imports: [],
  templateUrl: './header-scene.html',
  styleUrl: './header-scene.css',
})
export class HeaderScene extends BaseScene implements AfterViewInit, OnDestroy{

  private cube!: THREE.Mesh;
  private animationFrameId!: number;

  constructor(private ngZone: NgZone) {
    super();
  }

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
