import * as THREE from 'three';

/** Map an equirectangular image onto centered, non-indexed planet geometry. */
export function applyPlanetTexture(
  mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>,
  texture: THREE.Texture,
): void {
  const positions = mesh.geometry.getAttribute('position');
  const uv = new Float32Array(positions.count * 2);
  for (let i = 0; i < positions.count; i += 3) {
    const longitude: number[] = [];
    for (let j = 0; j < 3; j++) {
      const vertex = i + j;
      const x = positions.getX(vertex);
      const y = positions.getY(vertex);
      const z = positions.getZ(vertex);
      const radius = Math.hypot(x, y, z);
      longitude.push(0.5 + Math.atan2(z, x) / (2 * Math.PI));
      uv[vertex * 2 + 1] = radius
        ? 0.5 + Math.asin(THREE.MathUtils.clamp(y / radius, -1, 1)) / Math.PI
        : 0.5;
    }
    // Unwrap triangles crossing the image seam so they don't stretch across the map.
    const crossesSeam = Math.max(...longitude) - Math.min(...longitude) > 0.5;
    for (let j = 0; j < 3; j++)
      uv[(i + j) * 2] = longitude[j] + (crossesSeam && longitude[j] < 0.5 ? 1 : 0);
  }
  mesh.geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  mesh.material.setValues({
    map: texture,
    color: 0xffffff,
    vertexColors: false,
    metalness: 0,
    roughness: 1,
  });
  mesh.material.needsUpdate = true;
}
