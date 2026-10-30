import { AfterViewInit, Component, NgZone, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { BaseScene } from '../base-scene/base-scene';
import { StlModel } from '../models/stl-model';
import { applyRingTexture } from '../models/ring-texture';

@Component({
  selector: 'app-header-scene',
  imports: [],
  templateUrl: './header-scene.html',
  styleUrl: './header-scene.css',
})
export class HeaderScene extends BaseScene implements AfterViewInit, OnDestroy {
  // Model files are served from public/assets/models.
  private readonly stlUrl = 'assets/models/installation_04_full_ring.stl';
  private landscapeTexture?: THREE.Texture;
  private destroyed = false;
  private ring?: THREE.Mesh;
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
      this.createLights();
      void this.loadLandscapeTexture();
      void this.loadStl(this.stlUrl);

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
    this.destroyed = true;
    // Clean up animation frame loop and dispose renderer elements to prevent memory leaks
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.resizeObserver?.disconnect();
    this.disposeRing();
    this.landscapeTexture?.dispose();
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  private disposeRing(): void {
    if (!this.ring) return;
    this.ring.geometry.dispose();
    const materials = Array.isArray(this.ring.material) ? this.ring.material : [this.ring.material];
    materials.forEach((material) => material.dispose());
  }

  private async loadLandscapeTexture(): Promise<void> {
    try {
      const texture = await new THREE.TextureLoader().loadAsync('assets/textures/landscape.jpg');
      if (this.destroyed) {
        texture.dispose();
        return;
      }
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = THREE.RepeatWrapping;
      texture.anisotropy = Math.min(8, this.renderer.capabilities.getMaxAnisotropy());
      this.landscapeTexture = texture;
      if (this.ring) applyRingTexture(this.ring, texture);
      this.renderer.render(this.scene, this.camera);
    } catch (error) {
      if (!this.destroyed) console.warn('Could not load landscape texture.', error);
    }
  }

  private async loadStl(url: string): Promise<void> {
    try {
      const model = await StlModel.load(url, { size: 5.6 });
      if (this.destroyed) {
        model.dispose();
        return;
      }
      // Initial orientation also applies when reduced motion disables animation.
      model.rotation.set(0.65, 0.4, 0.15);
      this.ring = model;
      if (this.landscapeTexture) applyRingTexture(model, this.landscapeTexture);
      this.scene.add(model);
      // Render immediately even when reduced motion disables the animation loop.
      this.renderer.render(this.scene, this.camera);
    } catch (error) {
      if (!this.destroyed) console.warn('Could not load STL model.', error);
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

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);

    // Rotate the ring to reveal its broad inner surface and thin outer shell
    if (this.ring) {
      this.ring.rotation.x += 0.01;
      this.ring.rotation.y += 0.01;
    }

    // Render the scene
    if (this.renderer) {
      this.renderer.render(this.scene, this.camera);
    }
  };

  private createLights(): void {
    const ambientLight = new THREE.HemisphereLight(0xdcefff, 0x182330, 1.2);
    const keyLight = new THREE.DirectionalLight(0xffffff, 3);
    keyLight.position.set(3, 4, 5);
    const rimLight = new THREE.DirectionalLight(0x65cfff, 2);
    rimLight.position.set(-3, 1, -2);
    this.scene.add(ambientLight, keyLight, rimLight);
  }
}
