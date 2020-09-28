import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class StatusService {
    private readonly endpoint = `${environment.baseUrl}api/status`;

    constructor(private http: HttpClient) { }

    GetById(id: number) {
        return this.http.get<IStatus>(this.endpoint + "/" + id);
    }
    GetAll(){
        return this.http.get<IStatus>(this.endpoint);
    }
}

interface IStatus {
    [x: string]: any;
    statusId: number,
    name: string
}