namespace OMA.Model
{
    public class Client
    {
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
        public string AppUserId { get; set; }
    }
}
