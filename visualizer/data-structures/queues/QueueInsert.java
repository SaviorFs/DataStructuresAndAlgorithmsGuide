import java.util.LinkedList;
import java.util.Queue;

public class QueueInsert {
    public static void main(String[] args) {
        Queue<Integer> queue = new LinkedList<>();
        
        // Insert
        queue.add(1);
        queue.add(2);
        queue.add(3);
        System.out.println("Queue after insertion: " + queue);
    }
}
