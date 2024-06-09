import java.util.Stack;

public class StackDelete {
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        
        stack.push(1);
        stack.push(2);
        stack.push(3);
        System.out.println("Stack before deletion: " + stack);
        
        // Delete
        stack.pop();
        System.out.println("Stack after deletion: " + stack);
    }
}
