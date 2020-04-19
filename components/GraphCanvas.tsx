import * as React from 'react';
import Drawer from '../src/Drawer';
import ID from '../src/ID';
import DrawGraph from '../src/DrawGraph';

export default function GraphCanvas({ graph }: { graph: DrawGraph }) {
  const ref = React.useRef<HTMLCanvasElement | null>(null);

  const redraw = () => {
    const drawer = Drawer.fromCanvas(ref.current);
    if (!drawer) {
      return;
    }
    drawer.reset();
    drawer.centeredGraph(graph);
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
