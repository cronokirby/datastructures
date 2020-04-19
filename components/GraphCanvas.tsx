import * as React from 'react';
import Drawer from '../src/Drawer';

export default function GraphCanvas() {
  const ref = React.useRef<HTMLCanvasElement | null>(null);

  const redraw = () => {
    const drawer = Drawer.fromCanvas(ref.current);
    if (!drawer) {
      return;
    }
    drawer.reset();
    drawer.rectangle(200, 200, 100, 100);
    drawer.circle(200, 300, 40);
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
