import fc from 'fast-check';
import DrawGraph from './DrawGraph';
import ID from './ID';
import SingleLinkedList from './SingleLinkedList';

test('the tail of an empty list is empty', () => {
  expect(SingleLinkedList.of().tail).toEqual(SingleLinkedList.of());
});

test('basic appending works', () => {
  expect(SingleLinkedList.of().append(1).append(2)).toEqual(
    SingleLinkedList.of(1, 2),
  );
});

const nonEmptyValues: fc.Arbitrary<string[]> = fc.array(
  fc.asciiString(),
  1,
  20,
);

test('prepending works the same as with arrays', () => {
  fc.assert(
    fc.property(nonEmptyValues, ([v, ...vs]) => {
      expect(SingleLinkedList.of(...vs).prepend(v)).toEqual(
        SingleLinkedList.of(v, ...vs),
      );
    }),
  );
});

test('prepending works the same as with arrays - test case #1', () => {
  const [v, ...vs] = ['a'];
  expect(SingleLinkedList.of(...vs).prepend(v)).toEqual(
    SingleLinkedList.of(v, ...vs),
  );
});

test('appending works the same as with arrays', () => {
  fc.assert(
    fc.property(nonEmptyValues, (vs) => {
      // These two are safe because we generate non empty values
      const init = vs.slice(0, vs.length - 1);
      const last = vs[vs.length - 1];
      expect(SingleLinkedList.of(...init).append(last)).toEqual(
        SingleLinkedList.of(...vs),
      );
    }),
  );
});

test('appending works the same as with arrays - test case #1', () => {
  const vs = ['a'];
  expect(
    SingleLinkedList.of(...vs.slice(0, vs.length - 1)).append('a'),
  ).toEqual(SingleLinkedList.of(...vs));
});

test('basic deletion works', () => {
  expect(SingleLinkedList.of(1, 2).delete(1)).toEqual(SingleLinkedList.of(2));
  expect(SingleLinkedList.of(1, 2).delete(3)).toEqual(
    SingleLinkedList.of(1, 2),
  );
});

test('basic draw graph generation', () => {
  const id = ID.initial();
  expect(SingleLinkedList.of(1, 2).draw()).toEqual(
    DrawGraph.of({ id, label: '1' }, { id: id.next(), label: '2' }),
  );
});
