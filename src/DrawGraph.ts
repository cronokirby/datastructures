/**
 * Represents a unique identifier for nodes in a graph.
 *
 * This is important, especially as you move towards more free form representation
 * of graphs, like adjacency lists or matrices.
 */
export type ID = string & { readonly __tag: unique symbol };

/**
 * A node is a single object we can draw.
 *
 * Right now, Nodes are directly linked to the next node in the graph, because
 * we only draw singly linked lists.
 */
export interface Node {
  // This is a unique identifier
  readonly id: ID;
  readonly label: string;
}

/**
 * Represents a Graph that we can draw on a canvas.
 *
 * We convert data structures into this representation, to allow us to draw
 * them in a generic way.
 *
 * This class contains operation both to make it convenient to construct it, which is
 * useful for the data structures, as well as operations to make it convenient to draw it.
 */
export default class DrawGraph {
  private readonly nodes: Node[];

  private constructor(nodes: Node[]) {
    this.nodes = nodes;
  }

  /**
   * Return an empty draw graph
   */
  static empty(): DrawGraph {
    return new DrawGraph([]);
  }

  /**
   * Create a new draw graph containing certain elements.
   * 
   * @param nodes the elements to start with
   */
  static of(...nodes: Node[]): DrawGraph {
    return new DrawGraph(nodes)
  }

  /**
   * Add a new node to the end of the graph.
   *
   * @param id a unique identifier for this node
   * @param label a label to add to this node when drawing
   */
  push(...nodes: Node[]): DrawGraph {
    return new DrawGraph([...this.nodes, ...nodes])
  }
}
