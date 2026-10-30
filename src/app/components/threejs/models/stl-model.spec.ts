import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { StlModel } from './stl-model';

describe('StlModel', () => {
  afterEach(() => vi.restoreAllMocks());

  it('centers and uniformly scales imported geometry and disposes resources', async () => {
    const geometry = new THREE.BoxGeometry(2, 4, 1);
    geometry.translate(10, 20, 30);
    vi.spyOn(STLLoader.prototype, 'loadAsync').mockResolvedValue(geometry);
    const model = await StlModel.load('test.stl', { size: 8, color: 0x168bff });
    expect(geometry.boundingBox!.getCenter(new THREE.Vector3()).length()).toBe(0);
    expect(model.scale.toArray()).toEqual([2, 2, 2]);
    expect(model.material.color.getHex()).toBe(0x168bff);
    const disposeGeometry = vi.spyOn(geometry, 'dispose');
    const disposeMaterial = vi.spyOn(model.material, 'dispose');
    const scene = new THREE.Scene();
    scene.add(model);
    model.dispose();
    expect(model.parent).toBeNull();
    expect(disposeGeometry).toHaveBeenCalledOnce();
    expect(disposeMaterial).toHaveBeenCalledOnce();
  });

  it('propagates load errors so the caller can retain its fallback', async () => {
    vi.spyOn(STLLoader.prototype, 'loadAsync').mockRejectedValue(new Error('Missing STL'));
    await expect(StlModel.load('missing.stl')).rejects.toThrow('Missing STL');
  });

  it('rejects invalid sizes before loading', async () => {
    const load = vi.spyOn(STLLoader.prototype, 'loadAsync');
    await expect(StlModel.load('test.stl', { size: 0 })).rejects.toThrow('positive finite');
    expect(load).not.toHaveBeenCalled();
  });
});
