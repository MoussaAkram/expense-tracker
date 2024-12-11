using System.Security.Claims;
using Back_end.Data;
using Back_end.Entity;
using Back_end.Model.Request;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back_end.Service
{
    public class BudgetService
    {
        private readonly ExpenseContext _context;

        public BudgetService(ExpenseContext context)
        {
            _context = context;
        }

        public async Task<Budget> GetBudgetAsync(int userId)
        {
            return await _context.Budgets.FirstOrDefaultAsync(b => b.UserId == userId);
        }

        public async Task<decimal> GetAmountBudgetAsync(int userId)
        {
            var budget = await GetBudgetAsync(userId);
            if (budget == null) return 0;
            return budget.Amount;
        }

        public async Task<decimal> GetRemainingBudgetAsync(int userId)
        {
            var budget = await GetBudgetAsync(userId);
            if (budget == null) return 0;

            var totalSpent = _context.Expenses.Where(e => e.UserId == userId).Sum(e => e.Amount);
            return budget.Amount - totalSpent;
        }

        public async Task<bool> NotifyIfExceedsBudget(int userId)
        {
            var remainingBudget = await GetRemainingBudgetAsync(userId);
            return remainingBudget < 0;  // If remaining budget is negative, notify the user
        }

        public async Task<Budget> SetBudgetAsync(int userId, Budget budget)
        {
            // Find and delete any existing budget for the user
            var existingBudget = await _context.Budgets
                .FirstOrDefaultAsync(b => b.UserId == userId);

            if (existingBudget != null)
            {
                _context.Budgets.Remove(existingBudget);
            }

            // Set the user ID and calculate the end date for the new budget
            budget.UserId = userId;
            budget.EndDate = budget.StartDate.AddMonths(1);

            // Add the new budget
            _context.Budgets.Add(budget);
            await _context.SaveChangesAsync();

            return budget;
        }

        public async Task<IActionResult> GetBudgetStatusAsync(int userId)
        {
            var budget = await _context.Budgets.FirstOrDefaultAsync(b => b.UserId == userId);
            if (budget == null)
            {
                return new NotFoundObjectResult("Budget not set.");
            }

            var totalSpent = _context.Expenses.Where(e => e.UserId == userId).Sum(e => e.Amount);
            var remainingBudget = budget.Amount - totalSpent;

            if (remainingBudget >= 0)
            {
                return new OkObjectResult(new { message = "You are within budget." });
            }
            else
            {
                return new OkObjectResult(new { message = "You have exceeded your budget." });
            }
        }
    }
}