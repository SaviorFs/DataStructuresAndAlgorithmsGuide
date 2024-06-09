import java.util.PriorityQueue;

public class MinHeapInsert {
    private PriorityQueue<Integer> minHeap = new PriorityQueue<>();

    public void insert(int value) {
        minHeap.add(value);
    }

    public static void main(String[] args) {
        MinHeapInsert heap = new MinHeapInsert();
        heap.insert(3);
        heap.insert(1);
        heap.insert(5);
        
        System.out.println("MinHeap after insertion: " + heap.minHeap);
    }
}
