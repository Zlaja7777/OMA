import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OfferUpsertModel } from 'src/app/shared/Models/offer-upsert.model';
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { Offer } from '../shared/offer.model';

@Injectable({ providedIn: 'root' })
export class OfferService {
    private readonly endpoint = `${environment.baseUrl}api/`;

    constructor(private http: HttpClient) { }

    GetAll(clientId: number) {
        return this.http.get<IOffer[]>(this.endpoint + "offer?ClientId=" + clientId);
    }
   
    GetDashboardOffers(appUserId: string) {
        return this.http.get<IDashboardOffer>(this.endpoint + "GetDashboardOffers?AppUserId=" + appUserId);
    }

    GetOfferCounter(appUserId: string) {
        return this.http.get<{ waitingOffers, acceptedOffers, inProgressOffers, deniedOffers, doneOffers }>(this.endpoint + "GetOfferCounter?AppUserId=" + appUserId);
    }
    Insert (offer : OfferUpsertModel){
        return this.http.post(this.endpoint + "offer", offer);
    }
    GetByUserId(appUserId: string): Observable<OfferData[]>{
        return this.http.get<OfferData[]>(this.endpoint + "GetByUserId/" + appUserId);
    }
    GetById(offerId: number){
        return this.http.get<IOffer>(this.endpoint + "offer/"+ offerId);
    }
    Update (offerId: number, offer: OfferUpsertModel){
        return this.http.put(this.endpoint + "offer/" +offerId, offer);
    }
    Remove (offerId: number){
        return this.http.delete(this.endpoint + "offer/" + offerId);
    }

}

interface IOffer {
    currencyId: number,
    deadlineExceeded: boolean;
    description: string;
    endDate: Date;
    name: string,
    offerId: number,
    startDate: Date;
    statusId: number,
    totalPrice: DecimalPipe
    totalTimeDays: number;
    totalTimeHours: number;
    offersList: OfferData[],
    clientId: number;
    paid: boolean;
    appUserId: string;

}

interface IDashboardOffer {
    offersList: OfferData[],
    activeProjectsList: OfferData[],
    finishedProjectsList: OfferData[]
}

export interface OfferData {
    client: string,
    clientId: number,
    offerId: number,
    offerName: string,
    status: string,
    statusId: number,
    totalPrice: string
    currency: string;
    currencyId: number; 
}


