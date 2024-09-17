## Описание проекта

Курсовая работа на тему "Нахождение оптимального пути в графе с несколькими параметрами".
Целью проекта было определение оптимальных маршрутов между двумя вершинами графа. В реализации использованы два алгоритма: улучшенный алгоритм Дейкстры для поиска с учётом расстояния и качества, а также алгоритм Парето-оптимальности.

### Алгоритмы

1. **Улучшенный алгоритм Дейкстры**

   ```js
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
   ```

2. **Алгоритм Парето оптимальности**

   ```js
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
   ```

## Технологии

- **React**
- **json-server**
- **RTK**

## Версия Node.js

Проект использует Node.js версии **16.x**.

## Запуск проекта

1. Установите зависимости:

   ```bash
   npm install
   ```

2. Запустите проект:

   ```bash
   npm start
   ```

3. Откройте [http://localhost:3000](http://localhost:3000) для просмотра приложения.
