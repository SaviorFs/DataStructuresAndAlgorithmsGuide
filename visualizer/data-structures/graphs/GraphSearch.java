import java.util.*;

public class GraphSearch {
    private Map<Integer, List<Integer>> adjList = new HashMap<>();

    public void addVertex(int vertex) {
        adjList.putIfAbsent(vertex, new ArrayList<>());
    }

    public void addEdge(int vertex1, int vertex2) {
        adjList.get(vertex1).add(vertex2);
        adjList.get(vertex2).add(vertex1); // Assuming undirected graph
    }

    public boolean searchVertex(int vertex) {
        return adjList.containsKey(vertex);
    }

    public boolean searchEdge(int vertex1, int vertex2) {
        return adjList.get(vertex1).contains(vertex2);
    }

    public static void main(String[] args) {
        GraphSearch graph = new GraphSearch();
        graph.addVertex(1);
        graph.addVertex(2);
        graph.addEdge(1, 2);
        
        System.out.println("Vertex 1 found: " + graph.searchVertex(1));
        System.out.println("Edge between 1 and 2 found: " + graph.searchEdge(1, 2));
    }
}
