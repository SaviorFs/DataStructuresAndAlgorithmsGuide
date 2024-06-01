//searches for element in array

public class Search {
    public static int searchElement(int[] array, int value){
        for (int i = 0; i < array.length; i++) {
            if (array[i] == value) {
                return i;
            }
        }
        return -1;
    }
    public static void main(String[] args) {
        int[] array = {1,2,3,4,5};
        int value = 3;
        int index = searchElement(array, value);
        if (index != -1){
            System.out.println("Element found at index: " + index);
        } else {
            System.out.println("Element not found");
        }
    }
}
