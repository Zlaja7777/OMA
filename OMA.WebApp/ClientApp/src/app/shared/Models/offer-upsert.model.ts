import { DecimalPipe } from '@angular/common';

export class OfferUpsertModel{
    constructor(public Name: string, public  StartDate: Date,public  EndDate: Date, 
        public TotalPrice: DecimalPipe, public TotalTimeDays: number, 
        public TotalTimeHours: number, public DeadlineExceeded: boolean, public Description: string,
        public StatusId: number, public paid: boolean,  public CurrencyId: number, public ClientId: number,public  appUserId: string)
        {}
}