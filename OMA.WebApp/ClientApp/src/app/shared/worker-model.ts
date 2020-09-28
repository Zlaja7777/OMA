import { BoundElementProperty } from '@angular/compiler';

export class WorkerModel {
    constructor() { }

    public WorkerId: number;
    public FirstName: string;
    public LastName: string;
    public numberOfActiveProjects: number;
    public Email: string;
    public PhoneNumber: string;
    public BankAccountNumber: string;
    public IsActive: boolean;
    public AddressId: number;
    public Address: string;
    public StreetNumber: string;
    public City: string;
    public Country: string;

    setWorkerData(clientId: number,
        firstName: string,
        lastName: string,
        numberOfActiveProjects: number,
        email: string,
        phoneNumber: string,
        bankAccountNumber: string,
        IsActive: boolean,
        addressId: number) {
        this.WorkerId = clientId;
        this.FirstName = firstName;
        this.LastName = lastName;
        this.numberOfActiveProjects = numberOfActiveProjects;
        this.Email = email;
        this.PhoneNumber = phoneNumber;
        this.BankAccountNumber = bankAccountNumber;
        this.IsActive = IsActive;
        this.AddressId = addressId;
    }

    setAddressData(address: string, streetNumber: string, city: string, country: string) {
        this.Address = address;
        this.StreetNumber = streetNumber;
        this.City = city;
        this.Country = country;
    }
}

