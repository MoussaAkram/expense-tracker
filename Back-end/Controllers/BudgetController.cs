using System.Security.Claims;
using Back_end.Data;
using Back_end.Entity;
using Back_end.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BudgetController : ControllerBase
    {
        private readonly BudgetService _budgetService;

        public BudgetController(BudgetService budgetService)
        {
            _budgetService = budgetService;
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetBudget(int userId)
        {
            var budget = await _budgetService.GetAmountBudgetAsync(userId);
            return Ok(new { Amount = budget });
        }

        [HttpPost]
        public async Task<IActionResult> SetBudget([FromBody] Budget budget)
        {
            var updatedBudget = await _budgetService.SetBudgetAsync(budget.UserId, budget);
            return Ok(updatedBudget);
        }

        [HttpGet("remaining-budget/user/{userId}")]
        public async Task<IActionResult> GetRemainingBudget(int userId)
        {
            var remainingBudget = await _budgetService.GetRemainingBudgetAsync(userId);
            return Ok(new { remainingBudget });
        }

        [HttpGet("budget-status/user/{userId}")]
        public async Task<IActionResult> GetBudgetStatus(int userId)
        {
            var result = await _budgetService.GetBudgetStatusAsync(userId);
            return result;
        }
    }
}