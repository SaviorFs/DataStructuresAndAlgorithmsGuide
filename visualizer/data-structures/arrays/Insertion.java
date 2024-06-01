//insert element in array

public class Insertion {
    public static int[] insertElement(int[] array, int value, int index) {
        int[] newArray = new int[array.length + 1];
        for (int i = 0, j = 0; i < newArray.length; i++){
            if (i == index) {
                newArray[i] = value;
            } else {
                newArray[i] = array[j++];
            }
        }
        return newArray;
    }

    public static void main(String[] args) {
        int[] array = {1,2,3,4,5};
        int value = 42;
        int index = 2;
        array = insertElement(array,value,index);
        for (int num : array) {
            System.out.print(num + " ");
        }
    }
}