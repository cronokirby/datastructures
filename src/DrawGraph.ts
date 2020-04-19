import ID from './ID';

/**
 * Represents a unique identifier for nodes in a graph.
 *
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
  private readonly _nodes: Node[];

  private constructor(nodes: Node[]) {
    this._nodes = nodes;
  }

  /**
   * Return an empty draw graph
   */
  static empty(): DrawGraph {
    return new DrawGraph([]);
  }

  /**
   * Return a list of nodes that make up this graph.
   */
  get nodes(): ReadonlyArray<Node> {
    return this._nodes;
  }

  /**
   * Create a new draw graph containing certain elements.
   *
   * @param nodes the elements to start with
   */
  static of(...nodes: Node[]): DrawGraph {
    return new DrawGraph(nodes);
  }

  /**
   * Add a new node to the end of the graph.
   *
   * @param id a unique identifier for this node
   * @param label a label to add to this node when drawing
   */
  push(...nodes: Node[]): DrawGraph {
    return new DrawGraph([...this._nodes, ...nodes]);
  }
}
