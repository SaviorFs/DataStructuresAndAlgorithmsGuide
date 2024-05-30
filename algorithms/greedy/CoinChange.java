import java.util.Arrays;
import java.util.Collections;

public class CoinChange {
    public static int minCoins(int[] coins, int amount) {
        Integer[] sortedCoins = Arrays.stream(coins).boxed().toArray(Integer[]::new);
        Arrays.sort(sortedCoins,Collections.reverseOrder());

        int count = 0;
        for (int coin : sortedCoins) {
            if (amount == 0) break;
            count += amount / coin;
            amount %= coin;
        }
        if (amount != 0) {
            return -1;
        }
        return count;
    }
    public static void main(String[] args) {
        int[] coins = {1,5,10,25};
        int amount = 63;

        int result = minCoins(coins, amount);

        if (result != -1) {
            System.out.println("Minimum coins needed: " + result);
        } else {
            System.out.println("It's not possible to give change for the amount with the given coins.");
        }
    }
}
