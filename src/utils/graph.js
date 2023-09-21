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

  findShortestPath(startVertex, finishVertex, previous) {
    if (!(finishVertex in previous))
      throw new Error(
        `Нет пути из вершины ${startVertex} в вершину ${finishVertex}`
      );

    let path = [];

    let currentVertex = finishVertex;

    while (currentVertex !== startVertex) {
      path.unshift(currentVertex);
      currentVertex = previous[currentVertex];
    }

    path.unshift(startVertex);

    return path;
  }

  // dijkstra(graph, startVertex) {
  //   let visited = {};
  //   let totalWeight = {};
  //   let previous = {};
  //   const coefDistance = 0.4;
  //   const coefQuality = 0.6;

  //   let vertices = Object.keys(graph);

  //   vertices.forEach((vertex) => {
  //     // тут был map
  //     totalWeight[vertex] = Infinity;
  //     previous[vertex] = null;
  //   });

  //   totalWeight[startVertex] = 0;

  //   function handleVertex(vertex) {
  //     let activeVertexDistance = totalWeight[vertex];

  //     let neighbours = graph[activeVertex];
  //     neighbours.edges.forEach((neighbourVertex) => {
  //       let currentNeighbourDistance = totalWeight[neighbourVertex.name];
  //       let newNeighbourDistance =
  //         activeVertexDistance +
  //         neighbourVertex.distance * coefDistance +
  //         neighbourVertex.quality * coefQuality;

  //       if (newNeighbourDistance < currentNeighbourDistance) {
  //         totalWeight[neighbourVertex.name] = newNeighbourDistance;
  //         previous[neighbourVertex.name] = vertex;
  //       }
  //     });

  //     visited[vertex] = 1;
  //   }

  //   function findNearestVertex(distances, visited) {
  //     let minDistance = Infinity;
  //     let nearestVertex = null;

  //     Object.keys(distances).forEach((vertex) => {
  //       if (!visited[vertex] && distances[vertex] < minDistance) {
  //         minDistance = distances[vertex];
  //         nearestVertex = vertex;
  //       }
  //     });

  //     return nearestVertex;
  //   }

  //   let activeVertex = findNearestVertex(totalWeight, visited);

  //   while (activeVertex) {
  //     handleVertex(activeVertex);
  //     activeVertex = findNearestVertex(totalWeight, visited);
  //   }

  //   return { totalWeight, previous };
  // }

  dijkstra(graph, start, end) {
    const distances = {};
    const qualities = {};

    for (let vertex in graph) {
      distances[vertex] = Infinity;
      qualities[vertex] = Infinity;
    }
    distances[start] = 0;
    qualities[start] = 0;

    const previousVertices = {};
    const visited = {};

    function findClosestVertex() {
      let closestVertex = null;
      for (let vertex in distances) {
        if (
          !visited[vertex] &&
          (closestVertex === null ||
            calculateWeight(vertex) < calculateWeight(closestVertex))
        ) {
          closestVertex = vertex;
        }
      }
      return closestVertex;
    }

    function calculateWeight(vertex) {
      return 0.4 * distances[vertex] + 0.6 * qualities[vertex];
    }

    while (true) {
      const closestVertex = findClosestVertex();
      if (closestVertex === null) {
        break;
      }

      visited[closestVertex] = true;

      for (let edge of graph[closestVertex].edges) {
        const neighborVertex = edge.vertex;
        const edgeDistance = edge.distance;
        const edgeQuality = edge.quality;
        const totalDistance = distances[closestVertex] + edgeDistance;
        const totalQuality = qualities[closestVertex] + edgeQuality;

        if (totalDistance < distances[neighborVertex]) {
          distances[neighborVertex] = totalDistance;
          qualities[neighborVertex] = totalQuality;
          previousVertices[neighborVertex] = closestVertex;
        }
      }
    }

    const shortestPath = [];
    let currentVertex = end;
    while (currentVertex !== start) {
      shortestPath.unshift(currentVertex);
      currentVertex = previousVertices[currentVertex];
    }
    shortestPath.unshift(start);

    return shortestPath;
  }

  allPaths(graph, start, end) {
    const paths = [];
    const newPaths = [];
    const visited = {};

    function DFS(node, path, visited) {
      visited[node] = true;
      path.push(node);

      if (node === end) {
        paths.push([...path]);
      } else {
        for (const edge of graph[node].edges) {
          if (!visited[edge.vertex]) {
            DFS(edge.vertex, path, visited);
          }
        }
      }
      path.pop();
      visited[node] = false;
    }

    DFS(start, [], visited);

    for (const path of paths) {
      let sumQuality = 0,
        sumDistance = 0;
      for (let i = 0; i < path.length - 1; i++) {
        const edge = graph[path[i]].edges.find((e) => e.vertex === path[i + 1]);
        sumQuality += edge.weightQuality;
        sumDistance += edge.weightDistance;
      }
      newPaths.push({
        name: path,
        quality: sumQuality,
        distance: sumDistance,
      });
    }
    return newPaths;
  }

  paretoOptimalSolutions(graph, start, end, priority = "default") {
    const allPaths = this.allPaths(graph, start, end);
    console.log("allPaths", allPaths);
    let paretoOptimal = [];

    if (allPaths.length === 0) {
      return [];
    }

    function compare(a, b) {
      if (priority === "quality") {
        return b.quality - a.quality || a.distance - b.distance;
      } else if (priority === "distance") {
        return a.distance - b.distance || b.quality - a.quality;
      }
    }
    if (priority !== "default") {
      allPaths.sort(compare);
    }

    const n = priority !== "default" ? paretoOptimal.length : allPaths.length;

    for (let i = 0; i < allPaths.length; i++) {
      let isParetoOptimal = true;
      for (let j = 0; j < n; j++) {
        if (
          (priority === "quality" &&
            allPaths[i].distance <= paretoOptimal[j].distance &&
            allPaths[i].quality > paretoOptimal[j].quality) ||
          (priority === "distance" &&
            allPaths[i].quality >= paretoOptimal[j].quality &&
            allPaths[i].distance < paretoOptimal[j].distance) ||
          (priority === "default" &&
            i !== j &&
            allPaths[i].distance >= allPaths[j].distance &&
            allPaths[i].quality <= allPaths[j].quality)
        ) {
          isParetoOptimal = false;
          break;
        }
      }

      if (isParetoOptimal) {
        paretoOptimal.push(allPaths[i]);
      }
    }

    return paretoOptimal;
  }
}

export default Graph;
