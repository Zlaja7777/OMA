using System;
using System.Collections.Generic;
using OMA.WebAPI.Services;

namespace OMA.WebAPI.Database
{
    public class Transaction
    {
        public Transaction()
        {
            
        }
        public int TransactionId { get; set; }
        public float Amount { get; set; }
        public DateTime Date { get; set; }

        public int OfferId { get; set; }



    }

}


