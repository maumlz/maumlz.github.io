import * as THREE from 'three';

/** Orange planet behind the ring, with warm side illumination. */
export class Eclipse extends THREE.Group {
  private readonly planet: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>;
  readonly light = new THREE.DirectionalLight(0xffe4c2, 2.4);

  constructor() {
    super();
    // Procedural cloud bands avoid requiring an external planet texture.
    const width = 512;
    const height = 256;
    const pixels = new Uint8Array(width * height * 4);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const longitude = (x / width) * Math.PI * 2;
        const latitude = (y / height) * Math.PI;
        const swirl = Math.sin(longitude * 6 + Math.sin(latitude * 9) * 2);
        const bands = Math.sin(latitude * 38 + swirl * 1.5);
        const detail = Math.sin(longitude * 27 + latitude * 75) * Math.sin(latitude * 53);
        const shade = 0.65 + bands * 0.12 + detail * 0.07;
        const offset = (y * width + x) * 4;
        pixels[offset] = Math.round(180 * shade);
        pixels[offset + 1] = Math.round(78 * shade);
        pixels[offset + 2] = Math.round(26 * shade);
        pixels[offset + 3] = 255;
      }
    }
    const texture = new THREE.DataTexture(pixels, width, height);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.needsUpdate = true;
    this.planet = new THREE.Mesh(
      new THREE.SphereGeometry(20, 64, 48),
      new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 1,
        emissive: 0x321004,
        emissiveIntensity: 0.15,
      }),
    );
    this.planet.rotation.z = -0.3;
    this.add(this.planet, this.light);
    // Keep the front of the enlarged planet behind the rotating ring.
    this.position.z = -(this.planet.geometry.parameters.radius + 3);
  }

  resize(camera: THREE.PerspectiveCamera): void {
    const distance = camera.position.z - this.position.z;
    const halfHeight = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * distance;
    // Put the projected silhouette's center on the left edge: half the planet is visible.
    // Correct for perspective because the sphere is large relative to its distance.
    const radius = this.planet.geometry.parameters.radius;
    this.position.x = -halfHeight * camera.aspect * (1 - radius ** 2 / distance ** 2);
    this.position.y = 0;
    this.light.position.set(-6, 7, 15);
  }

  dispose(): void {
    this.removeFromParent();
    this.planet.geometry.dispose();
    this.planet.material.map?.dispose();
    this.planet.material.dispose();
    this.light.dispose();
  }
}
