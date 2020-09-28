import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

export class WorkerUpsertModel{

    constructor(public firstName: string, public lastName: string, 
        public startDate: Date, public numberOfActiveProjects: number, public IsActive: boolean, 
        public BankAccountNumber: string, public AddressId: number, public PhoneNumber: string,
        public  Availability: string, public Email: string, public MaxHoursPerWeek: number, 
        public MaxHoursPerMonthActual: number, public MaxHoursPerMonthBudgeted: number,  public AppUserId: string){}

}