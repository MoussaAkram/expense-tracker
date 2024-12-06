using Back_end.Entity;

namespace Back_end.Model
{
    public class ExpensesResponse
    {
        public List<Expense> Expenses { get; set; }
        public decimal TotalExpense { get; set; }
    }
}
