export class OfferClientDetail {
    OfferId: number;
    Name: string;
    Status: string;
    Price: string;

    constructor() {}

    setObject(offerId, name, status, price) {
        this.OfferId = offerId;
        this.Name = name;
        this.Status = status;
        this.Price = price;
    }
}