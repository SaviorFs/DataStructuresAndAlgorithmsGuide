import java.util.PriorityQueue;

public class MinHeapDelete {
    private PriorityQueue<Integer> minHeap = new PriorityQueue<>();

    public void insert(int value) {
        minHeap.add(value);
    }

    public int remove() {
        return minHeap.poll();
    }

    public static void main(String[] args) {
        MinHeapDelete heap = new MinHeapDelete();
        heap.insert(3);
        heap.insert(1);
        heap.insert(5);
        
        System.out.println("MinHeap before removal: " + heap.minHeap);
        System.out.println("Removed element: " + heap.remove());
        System.out.println("MinHeap after removal: " + heap.minHeap);
    }
}
