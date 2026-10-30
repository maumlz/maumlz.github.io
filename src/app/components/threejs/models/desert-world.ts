import * as THREE from 'three';

/** Earthy sand, rock and dune colors inspired by the task's Arrakis references. */
export function colorDesertWorld(geometry: THREE.BufferGeometry): void {
  const positions = geometry.getAttribute('position');
  const colors = new Float32Array(positions.count * 3);
  const sand = new THREE.Color('#cba267');
  const rock = new THREE.Color('#71543a');
  const pale = new THREE.Color('#ead1a0');
  const color = new THREE.Color();
  const point = new THREE.Vector3();
  for (let i = 0; i < positions.count; i++) {
    point.fromBufferAttribute(positions, i).normalize();
    const terrain =
      Math.sin(point.x * 13 + Math.sin(point.z * 9) * 2) * Math.cos(point.y * 11 + point.z * 5);
    const dunes = Math.sin(point.y * 85 + Math.sin(point.x * 23) * 3) * 0.08;
    color
      .copy(sand)
      .lerp(terrain > 0 ? pale : rock, Math.min(0.65, Math.abs(terrain) * 0.6 + dunes));
    color.toArray(colors, i * 3);
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
}

function capsule(
  x: number,
  y: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
  radius: number,
): boolean {
  const dx = bx - ax;
  const dy = by - ay;
  const t = THREE.MathUtils.clamp(((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy), 0, 1);
  return Math.hypot(x - ax - t * dx, y - ay - t * dy) < radius;
}

/** Stylized lunar terrain; the larger moon carries a dark palm and five fingers. */
export function createDesertMoon(
  radius: number,
  handMarking = false,
): THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> {
  const geometry = new THREE.SphereGeometry(radius, 96, 64);
  const positions = geometry.getAttribute('position');
  const colors = new Float32Array(positions.count * 3);
  const point = new THREE.Vector3();
  const color = new THREE.Color();
  const base = new THREE.Color(handMarking ? '#bbb1a0' : '#b6bfd0');
  const dark = new THREE.Color('#4b4846');
  for (let i = 0; i < positions.count; i++) {
    point.fromBufferAttribute(positions, i).normalize();
    const terrain = Math.sin(point.x * 31 + point.z * 17) * Math.cos(point.y * 27 - point.x * 9);
    color.copy(base).multiplyScalar(0.78 + terrain * 0.18);
    const x = point.x;
    const y = point.y;
    const palm = (x / 0.24) ** 2 + ((y + 0.12) / 0.3) ** 2 < 1;
    const fingers =
      capsule(x, y, -0.17, 0.02, -0.3, 0.46, 0.065) ||
      capsule(x, y, -0.06, 0.1, -0.09, 0.63, 0.065) ||
      capsule(x, y, 0.07, 0.1, 0.13, 0.59, 0.065) ||
      capsule(x, y, 0.18, 0.02, 0.32, 0.42, 0.06) ||
      capsule(x, y, -0.18, -0.16, -0.44, 0.02, 0.085);
    if (handMarking && point.z > 0.35 && (palm || fingers)) color.lerp(dark, 0.8);
    color.toArray(colors, i * 3);
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, metalness: 0 }),
  );
}
