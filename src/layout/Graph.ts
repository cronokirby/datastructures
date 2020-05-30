/**
 * Represents a generic directed graphs, with arbitrary connections between vertices.
 *
 * This class takes a type parameter `V`, which should be some type that can be used
 * as the key in Javascript's `Map`. Strings, numbers, etc should work out of the box.
 *
 * We can add new connections to the graph with declaring nodes prior.
 */
export default class Graph<V> {
  private readonly _connections: Map<V, Set<V>> = new Map();

  private getOrCreateSet(vertex: V): Set<V> {
    let set = this._connections.get(vertex);
    if (set === undefined) {
      set = new Set();
      this._connections.set(vertex, set);
    }
    return set;
  }

  /**
   * Connect a source vertex to a destination vertex. O(V) (if the nodes aren't present)
   *
   * This will do the necessary work if these vertices aren't already in the data
   * structure. If the vertices are already present, connecting them is easy.
   *
   * @param from the source vertex
   * @param to the destination vertex
   */
  connect(from: V, to: V) {
    this.getOrCreateSet(from).add(to);
  }

  /**
   * Check whether or not there's a connection from a source vertex to a destination vertex
   *
   * @param from the source vertex
   * @param to the destination vertex
   */
  connected(from: V, to: V): boolean {
    const set = this._connections.get(from);
    if (!set) {
      return false;
    }
    return set.has(to);
  }
}
