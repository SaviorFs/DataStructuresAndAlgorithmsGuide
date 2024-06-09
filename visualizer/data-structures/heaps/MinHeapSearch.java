import java.util.PriorityQueue;

public class MinHeapSearch {
    private PriorityQueue<Integer> minHeap = new PriorityQueue<>();

    public void insert(int value) {
        minHeap.add(value);
    }

    public boolean search(int value) {
        return minHeap.contains(value);
    }

    public static void main(String[] args) {
        MinHeapSearch heap = new MinHeapSearch();
        heap.insert(3);
        heap.insert(1);
        heap.insert(5);
        
        System.out.println("MinHeap contains 1: " + heap.search(1));
    }
}
