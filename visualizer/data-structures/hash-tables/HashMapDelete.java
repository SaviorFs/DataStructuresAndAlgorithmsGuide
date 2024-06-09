import java.util.HashMap;
import java.util.Map;

public class HashMapDelete {
    public static void main(String[] args) {
        Map<String, Integer> hashMap = new HashMap<>();
        
        hashMap.put("One", 1);
        hashMap.put("Two", 2);
        System.out.println("HashMap before deletion: " + hashMap);

        // Delete
        hashMap.remove("One");
        System.out.println("HashMap after deletion: " + hashMap);
    }
}
