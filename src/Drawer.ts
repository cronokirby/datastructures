import { RoughCanvas } from 'roughjs/bin/canvas';
import rough from 'roughjs/bin/rough';
import { Node } from './DrawGraph';

// The distance between one side of the text, and another side of the bounding box
const NODE_PADDING = 10;
const ARROW_TIP_ANGLE_DEG = 30;
const ARROW_TIP_LENGTH = 30;
const ARROW_STROKE_WIDTH = 1.5;

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
    this.gfx.font = '32px ArchitectsDaughter';
  }

  rectangle(x: number, y: number, w: number, h: number) {
    this.rc.rectangle(x, y, w, h);
  }

  circle(x: number, y: number, r: number) {
    this.rc.circle(x, y, r);
  }

  measureText(text: string): { w: number; h: number } {
    const metrics = this.gfx.measureText(text);
    const ret = {
      w: metrics.width,
      h: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
    };
    return ret;
  }

  text(text: string, x: number, y: number) {
    this.gfx.textBaseline = 'top';
    this.gfx.fillText(text, x, y);
  }

  node({ label }: Node, x: number, y: number) {
    const { w, h } = this.measureText(label);
    this.text(label, x + NODE_PADDING, y + NODE_PADDING);
    this.rectangle(x, y, w + 2 * NODE_PADDING, h + 2 * NODE_PADDING);
  }

  arrow(startX: number, startY: number, endX: number, endY: number) {
    this.rc.line(startX, startY, endX, endY, {
      strokeWidth: ARROW_STROKE_WIDTH,
    });
    const lineAngle = Math.atan2(endY - startY, endX - startX);
    const arrowTipAngle = (Math.PI / 180) * ARROW_TIP_ANGLE_DEG;
    const topAngle = Math.PI + lineAngle - arrowTipAngle;
    const botAngle = Math.PI + lineAngle + arrowTipAngle;
    this.rc.line(
      endX,
      endY,
      endX + ARROW_TIP_LENGTH * Math.cos(topAngle),
      endY + ARROW_TIP_LENGTH * Math.sin(topAngle),
      { strokeWidth: ARROW_STROKE_WIDTH },
    );
    this.rc.line(
      endX,
      endY,
      endX + ARROW_TIP_LENGTH * Math.cos(botAngle),
      endY + ARROW_TIP_LENGTH * Math.sin(botAngle),
      { strokeWidth: ARROW_STROKE_WIDTH },
    );
  }
}
