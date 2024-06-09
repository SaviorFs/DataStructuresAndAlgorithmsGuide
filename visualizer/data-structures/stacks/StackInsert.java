import java.util.Stack;

public class StackInsert {
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        
        // Insert
        stack.push(1);
        stack.push(2);
        stack.push(3);
        System.out.println("Stack after insertion: " + stack);
    }
}
