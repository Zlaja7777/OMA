import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CityService {
    private readonly endpoint = `${environment.baseUrl}api/city`;

    constructor(private http: HttpClient) { }

    GetAll(countryId: number) {
        return this.http.get<{cityId: number, countryId: number, name: string}[]>(this.endpoint + "?CountryId=" + countryId);
    }

    GetById(id: number) {
        var result = this.http.get(this.endpoint + "/" + id);
    }
}

