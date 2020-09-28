using System;
using System.Collections.Generic;

namespace OMA.WebAPI.Database
{
    public partial class Client
    {
        public Client()
        {
            Offer = new HashSet<Offer>();
        }

        public int ClientId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CompanyName { get; set; }
        public string BankAccountNumber { get; set; }
        public string Iban { get; set; }
        public string Swift { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public int AddressId { get; set; }
        public virtual Address Address { get; set; }
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public virtual ICollection<Offer> Offer { get; set; }
        public bool Inactive { get; set; }
    }
}
