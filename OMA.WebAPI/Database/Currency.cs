using System;
using System.Collections.Generic;

namespace OMA.WebAPI.Database
{
    public partial class Currency
    {
        public Currency()
        {
            Offer = new HashSet<Offer>();
        }

        public int CurrencyId { get; set; }
        public string Name { get; set; }
        public string Tag { get; set; }

        public virtual ICollection<Offer> Offer { get; set; }
    }
}
