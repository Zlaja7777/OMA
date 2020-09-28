using System;
namespace OMA.Model
{
    public class Transaction
    {
        public int TransactionId { get; set; }
        public float Amount { get; set; }
        public DateTime Date { get; set; }
        public int OfferId { get; set; }
    }
}
