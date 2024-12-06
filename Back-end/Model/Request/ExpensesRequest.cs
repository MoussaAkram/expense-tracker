using System.ComponentModel.DataAnnotations;

namespace Back_end.Model.Request
{
    public class ExpensesRequest
    {
        public int Id { get; set; }
        public string Category { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Description { get; set; } = string.Empty;
        public DateTime Date { get; set; } = DateTime.Now;
        public int UserId { get; set; }
    }
}
