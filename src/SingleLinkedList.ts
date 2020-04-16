import DrawGraph from './DrawGraph';
import ID from './ID';

type Node<T> = { tail: null } | { head: T; tail: Node<T> };

// We can share a single empty list between all nodes
export const EMPTY_NODE: Node<any> = { tail: null };

/**
 * A SingleLinkedList is a basic data structured, representing a list.
 *
 * Each element in the list is linked to the next element. There are no backwards links.
 */
export default class SingleLinkedList<T> {
  constructor(private readonly repr: Node<T>) {}

  /**
   * Create a new list from an array of values.
   */
  static of<T>(...values: T[]): SingleLinkedList<T> {
    let start: Node<T> = EMPTY_NODE;
    let end = start;
    for (const value of values) {
      const newNode = { head: value, tail: EMPTY_NODE };
      if (!end.tail) {
        start = newNode;
      } else {
        end.tail = newNode;
      }
      end = newNode;
    }
    return new SingleLinkedList(start);
  }

  *[Symbol.iterator](): Iterable<T> {
    let i = 0;
    for (let curr = this.repr; curr.tail; curr = curr.tail) {
      ++i;
      if (i > 10) {
        return;
      }
      yield curr.head;
    }
  }

  /**
   * Append an element to the end of this list. O(n)
   */
  append(t: T): SingleLinkedList<T> {
    let start: Node<T> = EMPTY_NODE;
    let end = start;

    const that = this;
    const iter = function* () {
      yield* that;
      yield t;
    };
    for (const value of iter()) {
      const newNode = { head: value, tail: EMPTY_NODE };
      if (!end.tail) {
        start = newNode;
      } else {
        end.tail = newNode;
      }
      end = newNode;
    }
    return new SingleLinkedList(start);
  }

  /**
   * Add a new element to the front of this list. O(1)
   */
  prepend(t: T): SingleLinkedList<T> {
    return new SingleLinkedList({ head: t, tail: this.repr });
  }

  /**
   * Delete an element from this list. O(n)
   */
  delete(t: T): SingleLinkedList<T> {
    let start: Node<T> = EMPTY_NODE;
    let end = start;
    let found = false;
    for (const value of this) {
      if (!found && value === t) {
        found = true;
        continue;
      }
      const newNode = { head: value, tail: EMPTY_NODE };
      if (!end.tail) {
        start = newNode;
      } else {
        end.tail = newNode;
      }
      end = newNode;
    }
    return new SingleLinkedList(start);
  }

  /**
   * Get all the elements of this list, except the first.
   *
   * If this list is empty, then this returns an empty list as well.
   */
  get tail(): SingleLinkedList<T> {
    return this.repr.tail ? new SingleLinkedList(this.repr.tail) : this;
  }

  /**
   * Return the graph representing this list.
   */
  draw(): DrawGraph {
    let graph = DrawGraph.empty();
    let id = ID.initial();
    for (const value of this) {
      graph = graph.push({ id, label: `${value}` });
      id = id.next();
    }
    return graph;
  }
}
