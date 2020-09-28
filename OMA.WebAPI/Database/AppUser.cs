using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace OMA.WebAPI.Database
{
    public class AppUser : IdentityUser
    {

        public AppUser()
        {
            Offer = new HashSet<Offer>();
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CompanyName { get; set; }
        public string BankAccountNumber { get; set; }
        public string Iban { get; set; }
        public string Swift { get; set; }
        public int AddressId { get; set; }
        public virtual Address Address { get; set; }
        public virtual ICollection<Offer> Offer { get; set; }
        public virtual ICollection<Client> Client { get; set; }

    }
}
