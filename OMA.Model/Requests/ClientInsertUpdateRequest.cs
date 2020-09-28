using System.ComponentModel.DataAnnotations;

namespace OMA.Model.Requests
{
    public class ClientInsertUpdateRequest
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string CompanyName { get; set; }
        [Required]
        public string BankAccountNumber { get; set; }
        [Required]
        public string Iban { get; set; }
        [Required]
        public string Swift { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public int AddressId { get; set; }
        [Required]
        public string AppUserId { get; set; }
    }
}
