using System;
using System.Collections.Generic;

namespace OMA.WebAPI.Database
{
    public partial class WorkerPosition
    {
        public WorkerPosition()
        {
            OfferServices = new HashSet<OfferServices>();
        }

        public int WorkerPositionId { get; set; }
        public int WorkerId { get; set; }
        public int PositionId { get; set; }
        public string Description { get; set; }

        public virtual Position Position { get; set; }
        public virtual Worker Worker { get; set; }
        public virtual ICollection<OfferServices> OfferServices { get; set; }
    }
}
