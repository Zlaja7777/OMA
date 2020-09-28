import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TransactionUpsertModel } from '../shared/Models/transaction-upsert.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {
    private readonly endpoint = `${environment.baseUrl}api/transaction`;

    constructor(private http: HttpClient) { }

    GetProgressBarValue(id: number) {
        return this.http.get<TransactionProgressBar>(this.endpoint +"/" + id + "/" + "GetProgressBarValue");
    }
    GetAll (offerId: number): Observable<ITransaction[]>{
        return this.http.get<ITransaction[]>(this.endpoint + "?OfferId=" +offerId)
    }
    Insert(transaction: TransactionUpsertModel){
        return this.http.post(this.endpoint + "/", transaction);
        
    }
    GetById(transactionId: number){
        return this.http.get<ITransaction>(this.endpoint + "/" + transactionId);
    }   
    Update(transactionId: number, transaction: TransactionUpsertModel){
        
        return this.http.put(this.endpoint + "/" + transactionId, transaction);
    }
    Delete (id: number){
        
        return this.http.delete(this.endpoint + "/" + id);
    }
  
}
interface TransactionProgressBar{
    progressBarValue : DecimalPipe;
    amountOfPaidTransactions: DecimalPipe;
}
interface ITransaction {
    transactionId: number;
    amount: DecimalPipe;
    date: Date,
    offerId: number
}

export interface TransactionData {
    transactionId: number;
    amount: DecimalPipe;
    date: Date,
    offerId: number
}