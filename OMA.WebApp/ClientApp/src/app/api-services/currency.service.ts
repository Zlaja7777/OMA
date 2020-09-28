import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
    private readonly endpoint = `${environment.baseUrl}api/currency`;

    constructor(private http: HttpClient) { }

    GetById(id: number) {
        return this.http.get<ICurrency>(this.endpoint + "/" + id);
    }
    GetAll() {
        return this.http.get<{currencyId: number, name: string, tag: string}[]>(this.endpoint);
    }
}

interface ICurrency {
    currencyId: number,
    name: string,
    tag: string
}