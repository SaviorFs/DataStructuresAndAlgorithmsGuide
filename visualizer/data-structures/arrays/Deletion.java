//delete element in array

public class Deletion {
    public static int[] deleteElement(int[] array, int index) {
        int [] newArray = new int[array.length - 1];
        for (int i = 0, j = 0; i < array.length; i++){
            if (i != index) {
                newArray[j++] = array[i];
            }
        }
        return newArray;
    }

    public static void main(String[] args) {
        int[] array = {1,2,3,4,5};
        int index = 2;
        array = deleteElement(array,index);
        for (int num : array) {
            System.out.print(num + " ");
        }
    }
}