import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, viewChild } from '@angular/core';
import { BaseScene } from '../base-scene/base-scene';

@Component({
  selector: 'app-main-scene',
  imports: [],
  templateUrl: './main-scene.html',
  styleUrl: './main-scene.css',
})
export class MainScene extends BaseScene implements AfterViewInit, OnDestroy {
  
  private animationFrameId!: number;

  constructor(private ngZone: NgZone){
    super();
  }

  ngAfterViewInit(): void {
    this.initThree();
    // objects...

    this.ngZone.runOutsideAngular(() => {
      this.animate();
    })
  }

  ngOnDestroy(): void {
  }

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);

    // Render the scene
    this.renderer.render(this.scene, this.camera);
  };
}
