import * as React from 'react';
import rough from 'roughjs/bin/rough'

function getCtx(
  el?: HTMLCanvasElement | null,
): CanvasRenderingContext2D | null {
  if (!el) {
    return null;
  }
  return el.getContext('2d') ?? null;
}

export default function GraphCanvas() {
  const ref = React.useRef<HTMLCanvasElement | null>(null);

  const redraw = () => {
    if (!ref.current) {
      return;
    }
    const ctx = ref.current.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.canvas.width = ctx.canvas.clientWidth;
    ctx.canvas.height = ctx.canvas.clientHeight;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 150, 100);
    const rc = rough.canvas(ref.current);
    rc.rectangle(200, 200, 100, 100);
    rc.circle(200, 300, 40);
  };

  React.useEffect(() => {
    window.addEventListener('resize', redraw);
    return () => window.removeEventListener('resize', redraw);
  }, []);

  React.useEffect(() => {
    redraw();
  });

  return <canvas ref={ref} className="w-full h-screen"></canvas>;
}
