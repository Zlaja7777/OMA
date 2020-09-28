export class OfferWorkerDetail {

    OfferId: number;
    Name: string;
    Status: string;
    Amount: string;
    Paid: boolean
    Position: string;
    WorkDays: number;
    constructor() {}

    setObject(offerId, name, status, amount, paid, position, WorkDays) {
        this.OfferId = offerId;
        this.Name = name;
        this.Status = status;
        this.Amount = amount;
        this.Paid = paid;
        this.Position = position;
        this.WorkDays = WorkDays;

    }
}