using System;
using System.Collections.Generic;

namespace OMA.WebAPI.Database
{
    public partial class OfferServices
    {
        public int OfferServicesId { get; set; }
        public int WorkerPositionId { get; set; }
        public int OfferId { get; set; }
        public int ServiceId { get; set; }
        public int MeasureUnitId { get; set; }
        public double HourlyRateForClient { get; set; }
        public double HourlyRate { get; set; }
        public decimal Tax { get; set; }
        public decimal Quantity { get; set; }
        public bool IsDone { get; set; }

        public virtual MeasureUnit MeasureUnit { get; set; }
        public virtual Offer Offer { get; set; }
        public virtual Service Service { get; set; }
        public virtual WorkerPosition WorkerPosition { get; set; }
    }
}
