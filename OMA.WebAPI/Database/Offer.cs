using System;
using System.Collections.Generic;

namespace OMA.WebAPI.Database
{
    public partial class Offer
    {
        public Offer()
        {
            OfferServices = new HashSet<OfferServices>();
            Transaction = new HashSet<Transaction>();
        }

        public int OfferId { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal TotalPrice { get; set; }
        public int TotalTimeDays { get; set; }
        public int TotalTimeHours { get; set; }
        public bool? DeadlineExceeded { get; set; }
        public string Description { get; set; }
        public int StatusId { get; set; }
        public int CurrencyId { get; set; }
        public int ClientId { get; set; }
        public string AppUserId { get; set; }
        public bool Paid { get; set; }
        public virtual AppUser AppUser { get; set; }
        public virtual Client Client { get; set; }
        public virtual Currency Currency { get; set; }
        public virtual Status Status { get; set; }
        public virtual ICollection<OfferServices> OfferServices { get; set; }
        public virtual ICollection<Transaction> Transaction { get; set; }

    }
}
