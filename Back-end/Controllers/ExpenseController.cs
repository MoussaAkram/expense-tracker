using Back_end.Entity;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Back_end.Data;
using Microsoft.EntityFrameworkCore;
using Back_end.Service;
using Microsoft.AspNetCore.Authorization;
using Back_end.Model.Request;

namespace Back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private readonly ExpenseService _expenseService;

        public ExpenseController(ExpenseService expenseService)
        {
            _expenseService = expenseService;
        }

        [HttpPost]
        public async Task<IActionResult> AddExpense([FromBody] ExpensesRequest expense)
        {
            var addedExpense = await _expenseService.AddExpenseAsync(expense);
            var remainingBudget = await _expenseService.GetRemainingBudgetAsync(expense.UserId);
            if (remainingBudget < 0)
            {
                return Ok(new { message = "Budget exceeded! Total spent: " + (expense.Amount) });
            }

            return Ok(addedExpense);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetExpenses(int userId)
        {
            var expenses = await _expenseService.GetExpensesAsync(userId);
            return Ok(expenses);
        }

        [HttpGet("expense-chart/{userId}")]
        public async Task<IActionResult> GetExpenseChart(int userId)
        {
            var chartData = await _expenseService.GetExpenseChartAsync(userId);
            return Ok(chartData);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            var success = await _expenseService.DeleteExpenseAsync(id);
            if (!success)
            {
                return NotFound("Expense not found or you don't have permission to delete it.");
            }

            return Ok(new { message = "Expense deleted successfully." });
        }
    }
}