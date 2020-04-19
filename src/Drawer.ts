import { RoughCanvas } from 'roughjs/bin/canvas';
import rough from 'roughjs/bin/rough';

/**
 * This allows us to easily draw elements onto a canvas
 */
export default class Drawer {
  private constructor(
    private readonly gfx: CanvasRenderingContext2D,
    private readonly rc: RoughCanvas,
  ) {}

  /**
   * Try and create a new drawer using a canvas it will target
   *
   * @param el the canvas element for this drawer
   */
  static fromCanvas(el?: HTMLCanvasElement | null): Drawer | null {
    if (!el) {
      return null;
    }
    const gfx = el.getContext('2d');
    if (!gfx) {
      return null;
    }
    const rc = rough.canvas(el);
    return new Drawer(gfx, rc);
  }

  /**
   * This resets the canvas, making sure it's empty, with the right weight and height
   */
  reset() {
    this.gfx.canvas.width = this.gfx.canvas.clientWidth;
    this.gfx.canvas.height = this.gfx.canvas.clientHeight;
    this.gfx.clearRect(0, 0, this.gfx.canvas.width, this.gfx.canvas.height);
  }

  rectangle(x: number, y: number, w: number, h: number) {
    this.rc.rectangle(x, y, w, h);
  }

  circle(x: number, y: number, r: number) {
    this.rc.circle(x, y, r);
  }

  text(text: string, x: number, y: number) {
    this.gfx.font = '32px ArchitectsDaughter';
    this.gfx.fillText(text, x, y);
  }
}
