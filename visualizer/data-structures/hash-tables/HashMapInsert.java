import java.util.HashMap;
import java.util.Map;

public class HashMapInsert {
    public static void main(String[] args) {
        Map<String, Integer> hashMap = new HashMap<>();
        
        // Insert
        hashMap.put("One", 1);
        hashMap.put("Two", 2);
        System.out.println("HashMap after insertion: " + hashMap);
    }
}
