using System;
using System.Collections.Generic;

namespace OMA.WebAPI.Database
{
    public partial class Status
    {
        public Status()
        {
            Offer = new HashSet<Offer>();
        }

        public int StatusId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Offer> Offer { get; set; }
    }
}
