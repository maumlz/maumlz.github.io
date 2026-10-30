import * as THREE from 'three';

/** Cyan marker lights attached in the STL's local coordinate system. */
export class RingLights extends THREE.InstancedMesh {
  constructor(geometry: THREE.BufferGeometry) {
    const positions = geometry.getAttribute('position');
    geometry.computeBoundingBox();
    let radius = 0;
    for (let i = 0; i < positions.count; i++) {
      radius = Math.max(radius, Math.hypot(positions.getX(i), positions.getY(i)));
    }
    const halfWidth = (geometry.boundingBox!.max.z - geometry.boundingBox!.min.z) / 2;
    const segments = 180;
    super(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x18efff }),
      segments * 2 + 12,
    );
    // Bucket triangles by angle so each light only checks its nearby STL surface.
    const buckets: number[][] = Array.from({ length: segments }, () => []);
    for (let i = 0; i < positions.count; i += 3) {
      const angles = [0, 1, 2].map(
        (offset) =>
          (Math.atan2(positions.getY(i + offset), positions.getX(i + offset)) + Math.PI * 2) %
          (Math.PI * 2),
      );
      if (Math.max(...angles) - Math.min(...angles) > Math.PI) {
        for (let j = 0; j < 3; j++) if (angles[j] < Math.PI) angles[j] += Math.PI * 2;
      }
      const start = Math.floor((Math.min(...angles) / (Math.PI * 2)) * segments);
      const end = Math.ceil((Math.max(...angles) / (Math.PI * 2)) * segments);
      for (let bin = start; bin <= end; bin++) buckets[bin % segments].push(i);
    }
    const marker = new THREE.Object3D();
    const ray = new THREE.Ray();
    const triangle = new THREE.Triangle();
    const hit = new THREE.Vector3();
    const nearest = new THREE.Vector3();
    const normal = new THREE.Vector3();
    const radial = new THREE.Vector3();
    const localX = new THREE.Vector3(1, 0, 0);
    let index = 0;
    const attach = (
      angle: number,
      z: number,
      depth: number,
      length: number,
      width: number,
    ): void => {
      radial.set(Math.cos(angle), Math.sin(angle), 0);
      ray.origin.copy(radial).multiplyScalar(radius * 1.1);
      ray.origin.z = z;
      ray.direction.copy(radial).negate();
      let closest = Infinity;
      const bin = Math.round((angle / (Math.PI * 2)) * segments) % segments;
      for (const vertex of buckets[bin]) {
        triangle.a.fromBufferAttribute(positions, vertex);
        triangle.b.fromBufferAttribute(positions, vertex + 1);
        triangle.c.fromBufferAttribute(positions, vertex + 2);
        if (!ray.intersectTriangle(triangle.a, triangle.b, triangle.c, false, hit)) continue;
        const distance = ray.origin.distanceToSquared(hit);
        if (distance < closest) {
          closest = distance;
          nearest.copy(hit);
          triangle.getNormal(normal);
        }
      }
      // Do not create floating lights where the STL has a gap.
      if (!Number.isFinite(closest)) return;
      if (normal.dot(radial) < 0) normal.negate();
      marker.position.copy(nearest).addScaledVector(normal, -depth * 0.25);
      marker.quaternion.setFromUnitVectors(localX, normal);
      marker.scale.set(depth, length, width);
      marker.updateMatrix();
      this.setMatrixAt(index++, marker.matrix);
    };
    for (const z of [-halfWidth * 0.75, halfWidth * 0.75]) {
      for (let i = 0; i < segments; i++) {
        attach((i / segments) * Math.PI * 2, z, radius * 0.0015, radius * 0.007, radius * 0.003);
      }
    }
    for (let i = 0; i < 12; i++) {
      attach((i / 12) * Math.PI * 2, 0, radius * 0.003, radius * 0.032, radius * 0.012);
    }
    this.count = index;
    this.instanceMatrix.needsUpdate = true;
  }

  override dispose(): void {
    this.removeFromParent();
    this.geometry.dispose();
    const materials = Array.isArray(this.material) ? this.material : [this.material];
    materials.forEach((material) => material.dispose());
    super.dispose();
  }
}
