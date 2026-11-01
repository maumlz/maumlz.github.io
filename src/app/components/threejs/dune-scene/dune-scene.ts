import { applyPlanetTexture } from '../models/planet-texture';
import { AfterViewInit, Component, NgZone, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { BaseScene } from '../base-scene/base-scene';
import { Starfield } from '../models/starfield';
import { colorDesertWorld, createDesertMoon } from '../models/desert-world';

@Component({
  selector: 'app-dune-scene',
  imports: [],
  templateUrl: './dune-scene.html',
  styleUrl: './dune-scene.css',
})
export class DuneScene extends BaseScene implements AfterViewInit, OnDestroy {
  private planetTexture?: THREE.Texture;
  private loadFailed = false;
  private starfield?: Starfield;
  private destroyed = false;
  private resizeObserver?: ResizeObserver;
  private arrakis?: THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>;
  private moonOne?: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>;
  private moonTwo?: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>;

  constructor(private ngZone: NgZone) {
    super();
  }

  ngAfterViewInit(): void {
    try {
      this.initThree();
    } catch {
      this.loadStateChange.emit('fallback');
      return;
    }
    if (!this.renderer) {
      this.loadStateChange.emit('fallback');
      return;
    }
    this.scene.background = new THREE.Color('#030a17');
    this.camera.position.z = 11;
    this.camera.fov = 50;
    this.starfield = new Starfield();
    this.scene.add(this.starfield);
    const key = new THREE.DirectionalLight(0xffe2ae, 2.6);
    key.position.set(-5, 5, 7);
    this.scene.add(new THREE.HemisphereLight(0xcbdfff, 0x2b1d13, 0.6), key);

    // Create the planet locally; only its surface texture needs downloading.
    const geometry = new THREE.SphereGeometry(2.8, 64, 48).toNonIndexed();
    colorDesertWorld(geometry);
    this.arrakis = new THREE.Mesh(
      geometry,
      new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1 }),
    );
    this.moonOne = createDesertMoon(0.68, true);
    this.moonOne.name = 'Hand of God';
    this.moonTwo = createDesertMoon(0.38);
    this.scene.add(this.arrakis, this.moonOne, this.moonTwo);
    this.ngZone.runOutsideAngular(() => {
      this.resize();
      this.resizeObserver = new ResizeObserver(this.resize);
      this.resizeObserver.observe(this.renderer.domElement);
    });
    void this.loadPlanetTexture();
  }

  private async loadPlanetTexture(): Promise<void> {
    try {
      const texture = await new THREE.TextureLoader().loadAsync(
        'assets/textures/arrakis_texture.png',
      );
      if (this.destroyed) {
        texture.dispose();
        return;
      }
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = THREE.RepeatWrapping;
      texture.anisotropy = Math.min(8, this.renderer.capabilities.getMaxAnisotropy());
      this.planetTexture = texture;
      if (this.arrakis) applyPlanetTexture(this.arrakis, texture);
      this.renderer.render(this.scene, this.camera);
      this.updateLoadState();
    } catch (error) {
      if (!this.destroyed) {
        this.loadFailed = true;
        this.updateLoadState();
        console.warn('Could not load Arrakis texture; retaining terrain colors.', error);
      }
    }
  }

  private updateLoadState(): void {
    if (this.loadFailed) this.loadStateChange.emit('fallback');
    else if (this.planetTexture) this.loadStateChange.emit('ready');
  }

  private resize = (): void => {
    const canvas = this.renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    const halfHeight =
      Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)) * this.camera.position.z;
    const halfWidth = halfHeight * this.camera.aspect;
    const portrait = this.camera.aspect < 1;
    const scale = Math.min(1, halfWidth / 3.8);
    this.arrakis?.scale.setScalar(scale);
    this.arrakis?.position.set(halfWidth * 0.42, -halfHeight * (portrait ? 0.45 : 0.18), -1);
    this.moonOne?.scale.setScalar(scale);
    this.moonTwo?.scale.setScalar(scale);
    this.moonOne?.position.set(-halfWidth * 0.57, halfHeight * 0.57, 0);
    this.moonTwo?.position.set(halfWidth * 0.6, halfHeight * 0.72, -0.5);
    this.renderer.render(this.scene, this.camera);
    this.rendered.set(true);
  };

  ngOnDestroy(): void {
    this.destroyed = true;
    this.resizeObserver?.disconnect();
    this.starfield?.dispose();
    this.planetTexture?.dispose();
    for (const mesh of [this.arrakis, this.moonOne, this.moonTwo]) {
      mesh?.geometry.dispose();
      mesh?.material.dispose();
    }
    this.renderer?.dispose();
  }
}
