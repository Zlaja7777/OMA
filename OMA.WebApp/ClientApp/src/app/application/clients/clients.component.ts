import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/api-services/client.service';
import { JWToken } from 'src/app/api-services/jwtoken.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clientList: ListOfClients[] = [];
  appUserId: string;

  constructor(private token: JWToken, private clientService: ClientService) { }

  ngOnInit(): void {
    this.appUserId = this.token.getToken();
    this.clientService.GetByAppUserId(this.appUserId).subscribe(resData => {
      resData.forEach(el => {
        this.clientList.push({ClientId: el.clientId, FullName: el.firstName + " " + el.lastName, CompanyName: el.companyName, PhoneNumber: el.phoneNumber});
      });
    }, error => {
      console.log(error);
    });
  }

  onKeyPress(name: string) {
    this.clientService.GetByAppUserId(this.appUserId, name).subscribe(resData => {
      this.clientList = [];
      resData.forEach(el => {
        this.clientList.push({ClientId: el.clientId, FullName: el.firstName + " " + el.lastName, CompanyName: el.companyName, PhoneNumber: el.phoneNumber});
      });
    });
  }
}

interface ListOfClients {
  ClientId: number,
  FullName: string,
  CompanyName: string,
  PhoneNumber: string
}
