import DrawGraph, { ID, Node } from './DrawGraph';
import fc from 'fast-check';

test('basic push works', () => {
  const nodes = [
    { id: '0' as ID, label: 'Foo' },
    { id: '1' as ID, label: 'Bar' },
  ];
  expect(DrawGraph.empty().push(...nodes)).toEqual(DrawGraph.of(...nodes));
});

test('push does not modify', () => {
  const empty = DrawGraph.empty();
  empty.push({ id: '0' as ID, label: 'Bar' });
  expect(empty).toEqual(DrawGraph.empty());
});

const node: fc.Arbitrary<Node> = fc
  .tuple(fc.string(), fc.string())
  .map(([id, label]) => ({ id: id as ID, label }));

test('pushing nodes to empty is the same as calling .of', () => {
  fc.assert(
    fc.property(fc.array(node), (nodes) => {
      expect(DrawGraph.empty().push(...nodes)).toEqual(DrawGraph.of(...nodes));
    }),
  );
});
