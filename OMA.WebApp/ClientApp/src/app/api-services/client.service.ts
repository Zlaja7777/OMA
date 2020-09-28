import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientModel } from '../shared/client.model';
import { ClientUpsertModel } from '../shared/Models/client-upsert.model';

@Injectable({ providedIn: 'root' })
export class ClientService {
    private readonly endpoint = `${environment.baseUrl}api/client`;

    constructor(private http: HttpClient) { }

    GetByAppUserId(appUserId: string, name?: string) {
        var url = this.endpoint + "?AppUserId=" + appUserId;
        if (name) {
            var list = name.split(' ');
           
            if (list.length == 1) {
                url += "&FirstName=" + list[0];
            } else {
                url += "&FirstName=" + list[0] + "&LastName=" + list[1];
            }
        }
      
        return this.http.get<IClient[]>(url);
    }

    GetById(id: number) {
        return this.http.get<IClientDetails>(this.endpoint + "/" + id);
    }

    Insert(client: ClientUpsertModel) {
        return this.http.post(this.endpoint, client);
    }

    Update(id: number, client: ClientUpsertModel) {
        return this.http.put(this.endpoint + "/" + id, client);
    }

    ChangeStatus(id: number) {
        var obj = new StatusRequest(true);
        return this.http.patch(this.endpoint + "/" + id + "/changestatus", obj);
    }
    GetAll(){
        return this.http.get<{clientId: number, firstName:string, lastName : string}[]>(this.endpoint);
    }
    CounterOfProjects(id: number, uId: string){
        return this.http.get<ICounterOfProjects>(this.endpoint + "/" + id + "/" + uId + "/counterofprojects");
    }
}

class StatusRequest {
    constructor(public inactive: boolean) {
    }
}

interface IClient {
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
    appUserId: string
}
interface ICounterOfProjects{
    numberOfProjects: number,
    activeProjects: number,
    finishedProjects: number,
    paidProjects: number,
    remainingToPay: number
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
    addressId: number
    // addressId: number,
    // address: {
    //     addressId: number,
    //     cityId: number,
    //     name: string,
    //     streetNumber: string
    //     city: {
    //         cityId: number,
    //         countryId: number,
    //         name: string,
    //         country: {
    //             countryId: number,
    //             name: string,
    //         }
    //     }
    // }
}