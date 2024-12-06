using System.ComponentModel.DataAnnotations;

namespace Back_end.Entity
{
    public class Expense
    {
        [Key]
        public int Id { get; set; }
        public string Category { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Description { get; set; } = string.Empty;

        private DateTime _date = DateTime.UtcNow;

        [Required]
        public int UserId { get; set; }
        public User User { get; set; }

        public DateTime Date
        {
            get => _date;
            set => _date = DateTime.SpecifyKind(value, DateTimeKind.Utc);
        }

    }
}
