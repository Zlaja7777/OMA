using System;
using System.Collections.Generic;
using System.Text;

namespace OMA.Model
{
    public class Address
    {
        public int AddressId { get; set; }
        public string Name { get; set; }
        public string StreetNumber { get; set; }
        public int CityId { get; set; }
        public string City { get; set; }
        public int CountryId { get; set; }
        public string Country { get; set; }
    }
}
