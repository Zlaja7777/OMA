using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace OMA.Model.Requests
{
    public class RegisterRequest
    {
        [Required(AllowEmptyStrings = false)]
        public string FirstName { get; set; }
        [Required(AllowEmptyStrings = false)]
        public string LastName { get; set; }
        [Required(AllowEmptyStrings = false)]
        [MinLength(6)]
        public string PhoneNumber { get; set; }
        [Required(AllowEmptyStrings = false)]
        [EmailAddress]
        public string Email { get; set; }
        [Required(AllowEmptyStrings = false)]
        public string CompanyName { get; set; }
        [MinLength(10)]
        [Required(AllowEmptyStrings = false)]
        public string BankAccountNumber { get; set; }
        [Required(AllowEmptyStrings = false)]
        [MinLength(10)]
        public string Iban { get; set; }
        [Required(AllowEmptyStrings = false)]
        [MinLength(4)]
        public string Swift { get; set; }
        [Required(AllowEmptyStrings = false)]
        public string Address { get; set; }
        [Required(AllowEmptyStrings = false)]
        [MinLength(4)]
        public string Password { get; set; }
        [Required(AllowEmptyStrings = false)]
        [MinLength(4)]
        public string ConfirmPassword { get; set; }
        [Required(AllowEmptyStrings = false)]
        public string StreetNumber { get; set; }
        public int? CityId { get; set; }
        public int? CountryId { get; set; }
    }
}
