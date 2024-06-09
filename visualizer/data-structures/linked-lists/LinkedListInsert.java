public class LinkedListInsert {
    static class Node {
        int data;
        Node next;
        
        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }

    private Node head;

    public void insert(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
        } else {
            Node current = head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    public static void main(String[] args) {
        LinkedListInsert list = new LinkedListInsert();
        list.insert(1);
        list.insert(2);
        list.insert(3);
        
        Node current = list.head;
        while (current != null) {
            System.out.print(current.data + " ");
            current = current.next;
        }
    }
}
