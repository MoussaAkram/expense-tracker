using Back_end.Data;
using Back_end.Entity;
using Back_end.Model;
using Back_end.Model.Request;
using Microsoft.EntityFrameworkCore;

namespace Back_end.Service
{
    public class ExpenseService
    {
        private readonly ExpenseContext _context;

        public ExpenseService(ExpenseContext context)
        {
            _context = context;
        }

        public async Task<Expense> AddExpenseAsync(ExpensesRequest expenseRequest)
        {
            // Map ExpensesRequest to Expense entity
            var expense = new Expense
            {
                UserId = expenseRequest.UserId,
                Amount = expenseRequest.Amount,
                Category = expenseRequest.Category,
                Description = expenseRequest.Description,
                Date = DateTime.SpecifyKind(expenseRequest.Date, DateTimeKind.Utc)
            };

            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync();
            return expense;
        }

        public async Task<ExpensesResponse> GetExpensesAsync(int userId)
        {
            var expenses = await _context.Expenses
                .Where(e => e.UserId == userId)
                .ToListAsync();
            var totalExpense = expenses.Sum(e => e.Amount);

            return new ExpensesResponse
            {
                Expenses = expenses,
                TotalExpense = totalExpense
            };

        }

        public async Task<decimal> GetRemainingBudgetAsync(int userId)
        {
            var budgetService = new BudgetService(_context);
            return await budgetService.GetRemainingBudgetAsync(userId);
        }

        public async Task<List<ExpenseChartRequest>> GetExpenseChartAsync(int userId)
        {
            return await _context.Expenses
                .Where(e => e.UserId == userId)
                .GroupBy(e => e.Category)
                .Select(g => new ExpenseChartRequest
                {
                    Category = g.Key,
                    TotalAmount = g.Sum(e => e.Amount)
                })
               .ToListAsync();
        }

        public async Task<bool> DeleteExpenseAsync(int id)
        {
            var expense = await _context.Expenses
                .FirstOrDefaultAsync(e => e.Id == id);
            if (expense == null) return false;

            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
