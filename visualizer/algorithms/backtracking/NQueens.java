import java.util.ArrayList;
import java.util.List;

public class NQueens {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> solutions = new ArrayList<>();
        int[] queens = new int[n]; // queens[i] represents the column position of the queen in the i-th row
        solve(0, queens, n, solutions);
        return solutions;
    }

    private void solve(int row, int[] queens, int n, List<List<String>> solutions) {
        if (row == n) {
            // All queens are placed successfully, add the solution
            solutions.add(createBoard(queens, n));
        } else {
            for (int col = 0; col < n; col++) {
                if (isSafe(row, col, queens)) {
                    queens[row] = col; // Place queen at (row, col)
                    solve(row + 1, queens, n, solutions);
                    // Backtrack: remove queen from (row, col) and try the next column
                }
            }
        }
    }

    private boolean isSafe(int row, int col, int[] queens) {
        for (int i = 0; i < row; i++) {
            int qCol = queens[i];
            if (qCol == col || Math.abs(qCol - col) == Math.abs(i - row)) {
                // Check for column conflict and diagonal conflict
                return false;
            }
        }
        return true;
    }

    private List<String> createBoard(int[] queens, int n) {
        List<String> board = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            char[] row = new char[n];
            for (int j = 0; j < n; j++) {
                row[j] = (queens[i] == j) ? 'Q' : '.';
            }
            board.add(new String(row));
        }
        return board;
    }

    public static void main(String[] args) {
        NQueens nq = new NQueens();
        int n = 8; // Change this value for different board sizes
        List<List<String>> solutions = nq.solveNQueens(n);
        for (List<String> solution : solutions) {
            for (String row : solution) {
                System.out.println(row);
            }
            System.out.println();
        }
    }
}
