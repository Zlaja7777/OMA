using System;
namespace OMA.Model.Requests
{
    public class TransactionInsertUpdateRequest
    {
      
        public float Amount { get; set; }
        public DateTime Date { get; set; }
        public int OfferId { get; set; }
    }
}
