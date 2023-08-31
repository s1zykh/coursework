class Graph {
  constructor() {
    this.graph = {};
  }

  addNode(value) {
    if (!(value in this.graph)) {
      this.graph[value] = { edges: [] };
    }
  }

  addEdge(node1, node2, weight) {
    if (node1 && node2) {
      this.graph[node1].edges.push({
        name: node2,
        distance: weight.distance,
        quality: weight.quality,
      });
      this.graph[node2].edges.push({
        name: node1,
        distance: weight.distance,
        quality: weight.quality,
      });
    }
  }

  dijkstra(graph, startVertex) {
    let visited = {};
    let totalWeight = {};
    let previous = {};

    let vertices = Object.keys(graph);

    vertices.map((vertex) => {
      totalWeight[vertex] = Infinity;
      previous[vertex] = null;
    });

    totalWeight[startVertex] = 0;

    function handleVertex(vertex) {
      let activeVertexDistance = totalWeight[vertex];

      let neighbours = graph[activeVertex];
      neighbours.edges.forEach((neighbourVertex) => {
        let currentNeighbourDistance = totalWeight[neighbourVertex.name];
        let newNeighbourDistance =
          activeVertexDistance +
          neighbourVertex.distance +
          neighbourVertex.quality;

        if (newNeighbourDistance < currentNeighbourDistance) {
          totalWeight[neighbourVertex.name] = newNeighbourDistance;
          previous[neighbourVertex.name] = vertex;
        }
      });

      visited[vertex] = 1;
    }

    function findNearestVertex(distances, visited) {
      let minDistance = Infinity;
      let nearestVertex = null;

      Object.keys(distances).forEach((vertex) => {
        if (!visited[vertex] && distances[vertex] < minDistance) {
          minDistance = distances[vertex];
          nearestVertex = vertex;
        }
      });

      return nearestVertex;
    }

    let activeVertex = findNearestVertex(totalWeight, visited);

    while (activeVertex) {
      handleVertex(activeVertex);
      activeVertex = findNearestVertex(totalWeight, visited);
    }

    return { totalWeight, previous };
  }
}

const graph = new Graph();

graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addNode("D");
graph.addNode("E");
graph.addNode("F");
graph.addNode("G");

graph.addEdge("A", "B", { distance: 0, quality: 2 });
graph.addEdge("A", "C", { distance: 0, quality: 1 });
graph.addEdge("B", "F", { distance: 0, quality: 7 });
graph.addEdge("C", "D", { distance: 5, quality: 0 });
graph.addEdge("C", "E", { distance: 0, quality: 2 });
graph.addEdge("D", "F", { distance: 0, quality: 2 });
graph.addEdge("E", "F", { distance: 0, quality: 1 });
graph.addEdge("F", "G", { distance: 0, quality: 1 });

const a = graph.dijkstra(graph.graph, "A");

console.log(graph.graph);
console.log(graph.graph["G"]);
