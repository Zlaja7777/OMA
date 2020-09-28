export class AppUser {
    public Email: string;
    public PhoneNumber: string;
    public Address: string;
    public BankAccountNumber: string;
    public CompanyName: string;
    public FirstName: string;
    public LastName: string;
    public Iban: string;
    public Swift: string;
    public CityId: number;
    public CountryId: number;
    public Password: string;
    public ConfirmPassword: string;
    public StreetNumber: string;
    constructor() { }

    public setUser(user: AppUser) {
        this.Email = user.Email;
        this.PhoneNumber = user.PhoneNumber;
        this.Address = user.Address;
        this.BankAccountNumber = user.BankAccountNumber;
        this.CompanyName = user.CompanyName;
        this.FirstName = user.FirstName;
        this.LastName = user.LastName;
        this.Iban = user.Iban;
        this.Swift = user.Swift;
        this.CityId = user.CityId;
        this.CountryId = user.CountryId;
        this.Password = user.Password;
        this.ConfirmPassword = user.ConfirmPassword;
        this.StreetNumber = user.StreetNumber;
    }
}
