
import java.util.*;

public class Dijkstra {
    static class Edge {
        int dest, weight;
        Edge(int dest, int weight) {
            this.dest = dest;
            this.weight = weight;
        }
    }

    static class Graph {
        int V;
        LinkedList<Edge>[] adjList;

        @SuppressWarnings("unchecked")
        Graph(int V) {
            this.V = V;
            adjList = new LinkedList[V];
            for (int i = 0; i < V; i++) {
                adjList[i] = new LinkedList<>();
            }
        }

        void addEdge(int src, int dest, int weight) {
            adjList[src].add(new Edge(dest, weight));
        }

        int[] dijkstra(int src) {
            PriorityQueue<Edge> pq = new PriorityQueue<>(Comparator.comparingInt(e -> e.weight));
            int[] dist = new int[V];
            Arrays.fill(dist, Integer.MAX_VALUE);
            dist[src] = 0;
            pq.add(new Edge(src, 0));

            while (!pq.isEmpty()) {
                Edge edge = pq.poll();
                int u = edge.dest;

                for (Edge neighbor : adjList[u]) {
                    int v = neighbor.dest;
                    int weight = neighbor.weight;
                    if (dist[u] + weight < dist[v]) {
                        dist[v] = dist[u] + weight;
                        pq.add(new Edge(v, dist[v]));
                    }
                }
            }

            return dist;
        }

        public static void main(String[] args) {
            Graph graph = new Graph(5);
            graph.addEdge(0, 1, 9);
            graph.addEdge(0, 2, 6);
            graph.addEdge(0, 3, 5);
            graph.addEdge(0, 4, 3);
            graph.addEdge(2, 1, 2);
            graph.addEdge(2, 3, 4);

            int[] distances = graph.dijkstra(0);

            System.out.println("Vertex\tDistance from Source");
            for (int i = 0; i < distances.length; i++) {
                System.out.println(i + "\t" + distances[i]);
            }
        }
    }
}
