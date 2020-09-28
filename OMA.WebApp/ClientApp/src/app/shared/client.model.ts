export class ClientModel {
    constructor() { }

    public ClientId: number;
    public FirstName: string;
    public LastName: string;
    public CompanyName: string;
    public Email: string;
    public PhoneNumber: string;
    public BankAccountNumber: string;
    public Iban: string;
    public Swift: string;
    public AddressId: number;
    public Address: string;
    public StreetNumber: string;
    public City: string;
    public Country: string;

    setClientData(clientId: number,
        firstName: string,
        lastName: string,
        companyName: string,
        email: string,
        phoneNumber: string,
        bankAccountNumber: string,
        iban: string,
        swift: string,
        addressId: number) {
        this.ClientId = clientId;
        this.FirstName = firstName;
        this.LastName = lastName;
        this.CompanyName = companyName;
        this.Email = email;
        this.PhoneNumber = phoneNumber;
        this.BankAccountNumber = bankAccountNumber;
        this.Iban = iban;
        this.Swift = swift;
        this.AddressId = addressId;
    }

    setAddressData(address: string, streetNumber: string, city: string, country: string) {
        this.Address = address;
        this.StreetNumber = streetNumber;
        this.City = city;
        this.Country = country;
    }
}

