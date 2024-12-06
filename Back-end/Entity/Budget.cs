namespace Back_end.Entity
{
    public class Budget
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        private DateTime _startDate = DateTime.UtcNow;

        private DateTime _endDate;

        public int UserId { get; set; }

        public DateTime StartDate
        {
            get => _startDate;
            set => _startDate = DateTime.SpecifyKind(value, DateTimeKind.Utc);
        }

        public DateTime EndDate
        {
            get => _endDate;
            set => _endDate = DateTime.SpecifyKind(value, DateTimeKind.Utc);
        }
    }
}
