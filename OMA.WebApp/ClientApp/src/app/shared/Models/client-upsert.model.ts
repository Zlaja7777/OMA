export class ClientUpsertModel {
    constructor(public FirstName: string,
    public LastName: string,
    public CompanyName: string,
    public Email: string,
    public PhoneNumber: string,
    public BankAccountNumber: string,
    public Iban: string,
    public Swift: string,
    public AddressId: number,
    public AppUserId: string) { }
}

