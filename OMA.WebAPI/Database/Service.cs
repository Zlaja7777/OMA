using System;
using System.Collections.Generic;

namespace OMA.WebAPI.Database
{
    public partial class Service
    {
        public Service()
        {
            OfferServices = new HashSet<OfferServices>();
        }

        public int ServiceId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<OfferServices> OfferServices { get; set; }
    }
}
