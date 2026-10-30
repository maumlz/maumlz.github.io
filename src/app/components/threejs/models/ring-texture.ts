import * as THREE from 'three';

/** Cylindrical mapping for a centered ring lying in XY, with its band along Z. */
export function applyRingTexture(mesh: THREE.Mesh, texture: THREE.Texture): void {
  const geometry = mesh.geometry;
  geometry.computeBoundingBox();
  const bounds = geometry.boundingBox!;
  const depth = bounds.max.z - bounds.min.z;
  if (depth <= 0) return;

  const positions = geometry.getAttribute('position');
  const normals = geometry.getAttribute('normal');
  const uv = new Float32Array(positions.count * 2);
  // Extruded and STL geometries are non-indexed, so each triangle can cross the seam safely.
  const outer: number[] = [];
  const inner: number[] = [];
  geometry.clearGroups();
  for (let i = 0; i < positions.count; i += 3) {
    const angles = [0, 1, 2].map(
      (j) => Math.atan2(positions.getY(i + j), positions.getX(i + j)) / (2 * Math.PI) + 0.5,
    );
    const crossesSeam = Math.max(...angles) - Math.min(...angles) > 0.5;
    let radialDot = 0;
    for (let j = 0; j < 3; j++) {
      const vertex = i + j;
      uv[vertex * 2] = angles[j] + (crossesSeam && angles[j] < 0.5 ? 1 : 0);
      uv[vertex * 2 + 1] = (positions.getZ(vertex) - bounds.min.z) / depth;
      radialDot +=
        positions.getX(vertex) * normals.getX(vertex) +
        positions.getY(vertex) * normals.getY(vertex);
    }
    (radialDot < -0.01 ? inner : outer).push(i, i + 1, i + 2);
  }
  geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  // Keep all triangles for each material together: only two draw calls, even for large STLs.
  const order = [...outer, ...inner];
  for (const name of Object.keys(geometry.attributes)) {
    const attribute = geometry.getAttribute(name) as THREE.BufferAttribute;
    const reordered = new Float32Array(attribute.count * attribute.itemSize);
    for (let i = 0; i < order.length; i++) {
      for (let component = 0; component < attribute.itemSize; component++) {
        reordered[i * attribute.itemSize + component] =
          attribute.array[order[i] * attribute.itemSize + component];
      }
    }
    geometry.setAttribute(name, new THREE.BufferAttribute(reordered, attribute.itemSize));
  }
  geometry.addGroup(0, outer.length, 0);
  geometry.addGroup(outer.length, inner.length, 1);
  const previousMaterials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
  previousMaterials.forEach((material) => material.dispose());
  mesh.material = [
    new THREE.MeshStandardMaterial({ color: 0xd9efff, metalness: 0.45, roughness: 0.28 }),
    new THREE.MeshStandardMaterial({ map: texture, metalness: 0, roughness: 0.85 }),
  ];
}
