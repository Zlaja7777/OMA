import { DecimalPipe } from '@angular/common'

export class Offer{
    OfferId : Number
    Name  : string
    StartDate : Date
    EndDate    : Date 
    TotalPrice  : DecimalPipe 
    TotalTimeDays    : number
    TotalTimeHours  : number  
    DeadlineExceeded : boolean
    Description : string
    StatusId : number
    CurrencyId : number
    ClientId  : number
    AppUserId : string
    Paid: boolean
     
    constructor() {}

    setObject(offerName : string, StartDate: Date, EndDate: Date, 
        TotalPrice: DecimalPipe, TotalTimeDays: number, TotalTimeHours: number,
        DeadlineExceeded: boolean, Description: string, StatusId: number,
        CurrencyId: number, ClientId: number, OfferId: number, Paid: boolean){
        this.Name = offerName;
        this.StartDate = StartDate;
        this.OfferId = OfferId;
        
        this.EndDate = EndDate;
        this.TotalPrice = TotalPrice;
        this.TotalTimeDays = TotalTimeDays;
        this.TotalTimeHours = TotalTimeHours;
        this.DeadlineExceeded = DeadlineExceeded;
        this.Description = Description;
        this.StatusId = StatusId;
        this.CurrencyId = CurrencyId;
        this.ClientId = ClientId;
        this.Paid = Paid;
        
    }
}