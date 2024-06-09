import java.util.*;

public class GraphInsert {
    private Map<Integer, List<Integer>> adjList = new HashMap<>();

    public void addVertex(int vertex) {
        adjList.putIfAbsent(vertex, new ArrayList<>());
    }

    public void addEdge(int vertex1, int vertex2) {
        adjList.get(vertex1).add(vertex2);
        adjList.get(vertex2).add(vertex1); // Assuming undirected graph
    }

    public static void main(String[] args) {
        GraphInsert graph = new GraphInsert();
        graph.addVertex(1);
        graph.addVertex(2);
        graph.addEdge(1, 2);
        
        System.out.println("Graph: " + graph.adjList);
    }
}
