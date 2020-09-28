import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CountryService {
    private readonly endpoint = `${environment.baseUrl}api/country`;

    constructor(private http: HttpClient) { }

    GetAll() {
        return this.http.get<{countryId: number, name: string}[]>(this.endpoint);
    }

    GetById(id: number) {
        var result = this.http.get(this.endpoint + "/id");
    }
}