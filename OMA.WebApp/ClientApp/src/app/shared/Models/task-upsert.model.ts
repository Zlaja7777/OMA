export class TaskUpsertModel{

    constructor(public WorkerId: number, public name: string, 
        public OfferId: number, public Amount: number, public WorkDays: number, 
        public paid: boolean){}

}