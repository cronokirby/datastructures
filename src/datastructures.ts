import DrawGraph from './DrawGraph';
import SingleLinkedList from './SingleLinkedList';

/**
 * Representss a generic data structure.
 *
 * We can interact with this data structure through its operations of type `O`.
 * We can also draw a representation of this data structure.
 */
export interface DataStructure<O, S> {
  /**
   * Apply an operation to this data structure, returning a new version of it.
   */
  apply(op: O, current: S): S;
  /**
   * Draw the state of this structure, and get a graph that we should draw
   */
  draw(current: S): DrawGraph;
}

/**
 * Represents the operations we can perform on a linked list
 */
export type LinkedListOps =
  | { type: 'append'; value: string }
  | { type: 'prepend'; value: string }
  | { type: 'delete'; value: string };

/**
 * A singly linked list, represented as a generic data structure.
 */
export const LinkedList: DataStructure<
  LinkedListOps,
  SingleLinkedList<string>
> = {
  draw(s) {
    return s.draw();
  },
  apply(op, s) {
    switch (op.type) {
      case 'append':
        return s.append(op.value);
      case 'prepend':
        return s.prepend(op.value);
      case 'delete':
        return s.delete(op.value);
      default:
        return s;
    }
  },
};
