import * as THREE from 'three';

/** Static, single-draw-call background stars placed behind the ring. */
export class Starfield extends THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial> {
  constructor() {
    const count = 1800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 240;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 2] = -40 - Math.random() * 60;
      // Mostly faint stars, with a few brighter blue-white points.
      color.setHSL(0.57 + Math.random() * 0.08, 0.15, 0.25 + Math.random() * 0.55);
      color.toArray(colors, i * 3);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Soft round sprites, generated locally without image downloads.
    const resolution = 32;
    const pixels = new Uint8Array(resolution * resolution * 4);
    for (let y = 0; y < resolution; y++) {
      for (let x = 0; x < resolution; x++) {
        const distance = Math.hypot(
          ((x + 0.5) / resolution) * 2 - 1,
          ((y + 0.5) / resolution) * 2 - 1,
        );
        const offset = (y * resolution + x) * 4;
        pixels[offset] = pixels[offset + 1] = pixels[offset + 2] = 255;
        pixels[offset + 3] = Math.round(Math.pow(Math.max(0, 1 - distance), 2) * 255);
      }
    }
    const sprite = new THREE.DataTexture(pixels, resolution, resolution);
    sprite.magFilter = THREE.LinearFilter;
    sprite.needsUpdate = true;
    super(
      geometry,
      new THREE.PointsMaterial({
        map: sprite,
        size: 0.65,
        vertexColors: true,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
  }

  dispose(): void {
    this.removeFromParent();
    this.geometry.dispose();
    this.material.map?.dispose();
    this.material.dispose();
  }
}
