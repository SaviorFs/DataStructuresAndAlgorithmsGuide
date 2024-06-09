import java.util.LinkedList;
import java.util.Queue;

public class QueueSearch {
    public static void main(String[] args) {
        Queue<Integer> queue = new LinkedList<>();
        
        queue.add(1);
        queue.add(2);
        queue.add(3);
        
        // Search
        int element = 2;
        boolean found = queue.contains(element);
        System.out.println("Element " + element + " found: " + found);
    }
}
