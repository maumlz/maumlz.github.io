import { AfterViewInit, Component, NgZone, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { BaseScene } from '../base-scene/base-scene';
import { Starfield } from '../models/starfield';
import { StlModel } from '../models/stl-model';
import { colorDesertWorld, createDesertMoon } from '../models/desert-world';

@Component({
  selector: 'app-main-scene',
  imports: [],
  templateUrl: './main-scene.html',
  styleUrl: './main-scene.css',
})
export class MainScene extends BaseScene implements AfterViewInit, OnDestroy {
  private readonly stlArrakis = 'assets/models/arrakis_1_12_10_7.stl';
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
      return;
    }
    if (!this.renderer) return;
    this.scene.background = new THREE.Color('#030a17');
    this.camera.position.z = 11;
    this.camera.fov = 50;
    this.starfield = new Starfield();
    this.scene.add(this.starfield);
    const key = new THREE.DirectionalLight(0xffe2ae, 2.6);
    key.position.set(-5, 5, 7);
    this.scene.add(new THREE.HemisphereLight(0xcbdfff, 0x2b1d13, 0.6), key);

    // Show a lightweight planet immediately, then replace it with the user's STL.
    const geometry = new THREE.SphereGeometry(2.8, 64, 48);
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
    void this.loadArrakis();
  }

  private async loadArrakis(): Promise<void> {
    try {
      const model = await StlModel.load(this.stlArrakis, { size: 5.6 });
      if (this.destroyed) {
        model.dispose();
        return;
      }
      colorDesertWorld(model.geometry);
      model.material.setValues({ color: 0xffffff, vertexColors: true, metalness: 0, roughness: 1 });
      this.arrakis?.removeFromParent();
      this.arrakis?.geometry.dispose();
      this.arrakis?.material.dispose();
      this.arrakis = model;
      this.scene.add(model);
      this.resize();
    } catch (error) {
      if (!this.destroyed)
        console.warn('Could not load Arrakis STL; retaining the desert sphere.', error);
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
    const halfHeight =
      Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)) * this.camera.position.z;
    const halfWidth = halfHeight * this.camera.aspect;
    const portrait = this.camera.aspect < 1;
    const scale = Math.min(1, halfWidth / 3.8);
    this.arrakis?.scale.setScalar(scale);
    if (this.arrakis instanceof StlModel) {
      const dimensions = this.arrakis.geometry.boundingBox!.getSize(new THREE.Vector3());
      this.arrakis.scale.setScalar(
        (scale * 5.6) / Math.max(dimensions.x, dimensions.y, dimensions.z),
      );
    }
    this.arrakis?.position.set(halfWidth * 0.42, -halfHeight * (portrait ? 0.45 : 0.18), -1);
    this.moonOne?.scale.setScalar(scale);
    this.moonTwo?.scale.setScalar(scale);
    this.moonOne?.position.set(-halfWidth * 0.57, halfHeight * 0.57, 0);
    this.moonTwo?.position.set(halfWidth * 0.6, halfHeight * 0.72, -0.5);
    this.renderer.render(this.scene, this.camera);
  };

  ngOnDestroy(): void {
    this.destroyed = true;
    this.resizeObserver?.disconnect();
    this.starfield?.dispose();
    for (const mesh of [this.arrakis, this.moonOne, this.moonTwo]) {
      mesh?.geometry.dispose();
      mesh?.material.dispose();
    }
    this.renderer?.dispose();
  }
}
