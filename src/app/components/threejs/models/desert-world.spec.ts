import * as THREE from 'three';
import { colorDesertWorld, createDesertMoon } from './desert-world';

describe('Desert world', () => {
  it('colors every terrain vertex without changing the STL positions', () => {
    const geometry = new THREE.SphereGeometry(2, 16, 12).toNonIndexed();
    const original = geometry.getAttribute('position').array.slice();
    colorDesertWorld(geometry);
    const colors = geometry.getAttribute('color');
    expect(colors.count).toBe(geometry.getAttribute('position').count);
    expect(
      Array.from(colors.array).every((value) => Number.isFinite(value) && value >= 0 && value <= 1),
    ).toBe(true);
    expect(geometry.getAttribute('position').array).toEqual(original);
    geometry.dispose();
  });

  it('creates different-sized moons and puts the hand marking only on the front', () => {
    const marked = createDesertMoon(0.68, true);
    const small = createDesertMoon(0.38);
    expect(marked.geometry.parameters.radius).toBeGreaterThan(small.geometry.parameters.radius);
    const positions = marked.geometry.getAttribute('position');
    const colors = marked.geometry.getAttribute('color');
    let front = 0;
    let back = 0;
    for (let i = 0; i < positions.count; i++) {
      const point = new THREE.Vector3().fromBufferAttribute(positions, i).normalize();
      if (Math.abs(point.x) < 0.04 && Math.abs(point.y + 0.12) < 0.05) {
        if (point.z > 0) front = colors.getX(i);
        else back = colors.getX(i);
      }
    }
    expect(front).toBeGreaterThan(0);
    expect(front).toBeLessThan(back);
    for (const moon of [marked, small]) {
      moon.geometry.dispose();
      moon.material.dispose();
    }
  });
});
