import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';

export interface StlModelOptions {
  /** Largest model dimension in scene units, preserving its proportions. */
  size?: number;
  color?: THREE.ColorRepresentation;
}

/** Loads an STL as a centered mesh; the caller owns placement and disposal. */
export class StlModel extends THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial> {
  static async load(url: string, options: StlModelOptions = {}): Promise<StlModel> {
    const size = options.size ?? 5.6;
    if (!Number.isFinite(size) || size <= 0) {
      throw new Error('STL model size must be a positive finite number.');
    }

    const geometry = await new STLLoader().loadAsync(url);
    geometry.computeBoundingBox();
    const dimensions = geometry.boundingBox!.getSize(new THREE.Vector3());
    const largestDimension = Math.max(dimensions.x, dimensions.y, dimensions.z);
    if (!Number.isFinite(largestDimension) || largestDimension <= 0) {
      geometry.dispose();
      throw new Error('STL model must contain geometry with nonzero dimensions.');
    }

    geometry.center();
    geometry.computeVertexNormals();
    const model = new StlModel(
      geometry,
      new THREE.MeshStandardMaterial({
        color: options.color ?? 0xd9efff,
        metalness: 0.45,
        roughness: 0.28,
      }),
    );
    model.scale.setScalar(size / largestDimension);
    return model;
  }

  dispose(): void {
    this.removeFromParent();
    this.geometry.dispose();
    this.material.dispose();
  }
}
