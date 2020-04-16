/**
 * Represents a unique identifier.
 *
 * This is useful in uniquely identifying elements of a graph.
 *
 * This idea is that we start with an initial ID, which we can use to generate other IDs.
 */
export default class ID {
  constructor(private readonly i: number) {}

  /**
   * Create an initial ID to use.
   */
  static initial() {
    return new ID(0);
  }

  /**
   * Generate a new identifier based on this current one.
   *
   * This identifier will be guaranteed to not be the same as the other
   */
  next(): ID {
    return new ID(this.i + 1);
  }

  /**
   * Check whether this identifier is the same as another
   *
   * @param that the other ID
   */
  equals(that: ID) {
    return this.i === that.i;
  }
}
