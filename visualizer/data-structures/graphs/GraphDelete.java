import java.util.*;

public class GraphDelete {
    private Map<Integer, List<Integer>> adjList = new HashMap<>();

    public void addVertex(int vertex) {
        adjList.putIfAbsent(vertex, new ArrayList<>());
    }

    public void addEdge(int vertex1, int vertex2) {
        adjList.get(vertex1).add(vertex2);
        adjList.get(vertex2).add(vertex1); // Assuming undirected graph
    }

    public void removeVertex(int vertex) {
        adjList.values().forEach(e -> e.remove(Integer.valueOf(vertex)));
        adjList.remove(vertex);
    }

    public void removeEdge(int vertex1, int vertex2) {
        adjList.get(vertex1).remove(Integer.valueOf(vertex2));
        adjList.get(vertex2).remove(Integer.valueOf(vertex1));
    }

    public static void main(String[] args) {
        GraphDelete graph = new GraphDelete();
        graph.addVertex(1);
        graph.addVertex(2);
        graph.addEdge(1, 2);
        System.out.println("Graph before deletion: " + graph.adjList);

        graph.removeEdge(1, 2);
        System.out.println("Graph after edge removal: " + graph.adjList);

        graph.removeVertex(1);
        System.out.println("Graph after vertex removal: " + graph.adjList);
    }
}
