import java.util.HashMap;
import java.util.Map;

public class HashMapSearch {
    public static void main(String[] args) {
        Map<String, Integer> hashMap = new HashMap<>();
        
        hashMap.put("One", 1);
        hashMap.put("Two", 2);
        
        // Search
        String key = "Two";
        if (hashMap.containsKey(key)) {
            System.out.println("Value for key '" + key + "': " + hashMap.get(key));
        } else {
            System.out.println("Key '" + key + "' not found");
        }
    }
}
