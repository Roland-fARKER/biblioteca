import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { Application } from '@splinetool/runtime';

@Component({
  selector: 'app-animations3d',
  templateUrl: './animations3d.component.html',
  styleUrl: './animations3d.component.css',
})
export class Animations3dComponent implements AfterViewInit, OnDestroy {
  private app: Application | null = null;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const canvas =
      this.elementRef.nativeElement.querySelector('canvas#canvas3d');
    if (canvas) {
      this.app = new Application(canvas);
      this.app.load(
        'https://prod.spline.design/zEgdVldu115NGePb/scene.splinecode'
      );
    }
  }

  ngOnDestroy(): void {
    if (this.app) {

      const canvas = document.getElementById('canvas3d');
      if (canvas) {
        canvas.parentNode?.removeChild(canvas);
      }
    }
  }
}
