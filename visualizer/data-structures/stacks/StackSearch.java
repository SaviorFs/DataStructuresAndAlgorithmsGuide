import java.util.Stack;

public class StackSearch {
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        
        stack.push(1);
        stack.push(2);
        stack.push(3);
        
        // Search
        int element = 2;
        boolean found = stack.contains(element);
        System.out.println("Element " + element + " found: " + found);
    }
}
