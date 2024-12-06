using System.ComponentModel.DataAnnotations;

namespace Back_end.Entity
{
    public class User
    {
        [Key]
        public int Id {  get; set; }
        public required string Username { get; set; }

        [EmailAddress]
        public required string Email { get; set; }
        public required string Password { get; set; }

        public ICollection<Expense> Expenses { get; set; } = new List<Expense>();

    }
}
