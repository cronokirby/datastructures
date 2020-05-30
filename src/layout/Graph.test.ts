import Graph from './Graph';

test('we can add connections', () => {
  const g = new Graph<number>();
  expect(g.connected(1, 2)).toBe(false);
  g.connect(1, 2);
  expect(g.connected(1, 2)).toBe(true);
  expect(g.connected(1, 1)).toBe(false);
  g.connect(1, 1);
  g.connect(1, 1);
  expect(g.connected(1, 1)).toBe(true);
});
