export class AddressModel {
    constructor() { }

    public AddressId: number;
    public Address: string;
    public StreetNumber: string;
    public City: string;
    public Country: string;

    setObject(addressId: number,
        Address: string,
        StreetNumber: string,
        City: string,
        Country: string) {
        this.AddressId = addressId;
        this.Address = Address;
        this.StreetNumber = StreetNumber;
        this.City = City;
        this.Country = Country;
    }
}

