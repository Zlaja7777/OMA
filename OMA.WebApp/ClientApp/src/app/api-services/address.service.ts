import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddressUpsertModel } from '../shared/Models/address-upsert.model';

@Injectable({ providedIn: 'root' })
export class AddressService {
    private readonly endpoint = `${environment.baseUrl}api/address`;

    constructor(private http: HttpClient) { }

    GetById(id: number) {
        return this.http.get<IAddress>(this.endpoint + "/" + id);
    }

    GetAll(Name: string, StreetNumber: string, CityId: number) {
        return this.http.get<IAddress>(this.endpoint + "?Name=" + Name + "&StreetNumber=" + StreetNumber + "&CityId=" + CityId);
    }

    Insert(address: AddressUpsertModel) {
        return this.http.post<IAddress>(this.endpoint, address);
    }

    Update(id: number, address: AddressUpsertModel) {
        return this.http.put<IAddress>(this.endpoint + "/" + id, address);
    }
}

interface IAddress {
    addressId: number
    name: string,
    streetNumber: string,
    cityId: number,
    city: string,
    countryId: number,
    country: string
}
