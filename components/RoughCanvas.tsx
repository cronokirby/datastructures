import * as React from 'react';

function getCtx(
  el?: HTMLCanvasElement | null,
): CanvasRenderingContext2D | null {
  if (!el) {
    return null;
  }
  return el.getContext('2d') ?? null;
}

export default function RoughCanvas() {
  const ref = React.useRef<HTMLCanvasElement | null>(null);

  const redraw = () => {
    const ctx = getCtx(ref.current);
    if (!ctx) {
      return;
    }
    ctx.canvas.width = ctx.canvas.clientWidth;
    ctx.canvas.height = ctx.canvas.clientHeight;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 150, 100);
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
