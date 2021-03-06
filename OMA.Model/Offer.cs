﻿using System;

namespace OMA.Model
{
    public class Offer
    {
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

    }
}
