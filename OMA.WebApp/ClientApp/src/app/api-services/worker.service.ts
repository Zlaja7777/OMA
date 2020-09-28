import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkerUpsertModel } from '../shared/Models/worker-upsert.model';

@Injectable({ providedIn: 'root' })
export class WorkerService {
    private readonly endpoint = `${environment.baseUrl}api/worker`;

    constructor(private http: HttpClient) { }

    GetByAppUserId(appUserId: string, name?: string) {
        var url = this.endpoint + "?AppUserId=" + appUserId;
        // if (name) {
        //     var list = name.split(' ');
        //     if (list.length == 1) {
        //         url += "&FirstName=" + list[0];
        //     } else {
        //         url += "&FirstName=" + list[0] + "&LastName=" + list[1];
        //     }
        // }
        return this.http.get<IWorker[]>(url);
    }

    GetById(id: number) {
        return this.http.get<IWorker>(this.endpoint + "/" + id);
    }
    GetAll(appUserId: string){
        return this.http.get<IWorker[]>(this.endpoint + "?AppUserId=" + appUserId);
    }

    Insert(worker: WorkerUpsertModel) {
        return this.http.post(this.endpoint + "/", worker);
    }
    Update(id: number, worker: WorkerUpsertModel) {
        return this.http.put(this.endpoint + "/" + id, worker);
    }

    // Update(id: number, client: ClientUpsertModel) {
    //     return this.http.put(this.endpoint + "/" + id, client);
    // }

    // ChangeStatus(id: number) {
    //     var obj = new StatusRequest(true);
    //     return this.http.patch(this.endpoint + "/" + id + "/changestatus", obj);
    // }
}

interface IWorker {
    addressId: number,
    appUserId: string,
    availability: string,
    bankAccountNumber: string,
    email: string,
    firstName: string,
    isActive: boolean,
    lastName: string,
    maxHoursPerMonthActual: number,
    maxHoursPerMonthBudgeted: number,
    maxHoursPerWeek: number,
    numberOfActiveProjects: 0
    phoneNumber: string,
    startDate: Date,
    workerId: number
}


interface IClientDetails {
    clientId: number,
    firstName: string,
    lastName: string,
    companyName: string,
    email: string,
    phoneNumber: string,
    bankAccountNumber: string,
    iban: string,
    swift: string,
    addressId: number,
    address: {
        addressId: number,
        cityId: number,
        name: string,
        streetNumber: string
        city: {
            cityId: number,
            countryId: number,
            name: string,
            country: {
                countryId: number,
                name: string,
            }
        }
    }
}