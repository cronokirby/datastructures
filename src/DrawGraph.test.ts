import DrawGraph from './DrawGraph';
import ID from './ID';

test('basic push works', () => {
  const id = ID.initial();
  const nodes = [
    { id, label: 'Foo' },
    { id: id.next(), label: 'Bar' },
  ];
  expect(DrawGraph.empty().push(...nodes)).toEqual(DrawGraph.of(...nodes));
});

test('push does not modify', () => {
  const empty = DrawGraph.empty();
  empty.push({ id: ID.initial(), label: 'Bar' });
  expect(empty).toEqual(DrawGraph.empty());
});
