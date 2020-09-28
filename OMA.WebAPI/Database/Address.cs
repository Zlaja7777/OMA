using System;
using System.Collections.Generic;

namespace OMA.WebAPI.Database
{
    public partial class Address
    {
        public Address()
        {
            Client = new HashSet<Client>();
        }

        public int AddressId { get; set; }
        public string Name { get; set; }
        public string StreetNumber { get; set; }
        public int CityId { get; set; }

        public virtual City City { get; set; }
        public virtual ICollection<Client> Client { get; set; }
    }
}
