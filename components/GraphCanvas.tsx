import * as React from 'react';
import Drawer from '../src/Drawer';
import ID from '../src/ID';

export default function GraphCanvas() {
  const ref = React.useRef<HTMLCanvasElement | null>(null);

  const redraw = () => {
    const drawer = Drawer.fromCanvas(ref.current);
    if (!drawer) {
      return;
    }
    drawer.reset();
    let id = ID.initial();
    id = id.next();
    drawer.node({ id, label: 'Oh Yeah' }, 600, 400);
    id = id.next();
    drawer.node({ id, label: 'Oh Yeah' }, 400, 400);
    drawer.arrow(400, 400, 300, 300);
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
