import { Component, OnInit, ViewChild, Injectable, Input, Output } from '@angular/core';
import { OfferService, OfferData } from 'src/app/api-services/offer.service';
import { ClientDashboard } from 'src/app/shared/client-dashboard.model';
import { JWToken } from 'src/app/api-services/jwtoken.service';
import { ClientService } from 'src/app/api-services/client.service';
import { MatDialogModule, MatDialog, MatDialogRef} from 'node_modules/@angular/material/dialog';
import { ModalOfferDetailComponent } from '../my-offers/modal-offer-detail/modal-offer-detail.component';
import { MyOffersComponent } from '../my-offers/my-offers.component';
import { Observable } from 'rxjs';
import { EventEmitter } from 'protractor';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  offersList: OfferData[] = [];
  activeProjectsList: OfferData[] = [];
  finishedProjectsList: OfferData[] = [];
  waitingOffers: number;
  acceptedOffers: number;
  inProgressOffers: number;
  deniedOffers: number;
  doneOffers: number;
  clientList: ClientDashboard[] = [];
  appUserId: string;
 // @Output() offerId =  new EventEmitter();
  


  constructor(private token: JWToken, private offerService: OfferService, private clientService: ClientService, private dialog: MatDialog) { }

  ngOnInit(): void {
    var arrayOfClients: number[] = [];
    this.appUserId = this.token.getToken();
    
    this.offerService.GetOfferCounter(this.appUserId).subscribe(resData => {
      this.waitingOffers = resData.waitingOffers;
      this.acceptedOffers = resData.acceptedOffers;
      this.doneOffers = resData.doneOffers;
      this.deniedOffers = resData.deniedOffers;
      this.inProgressOffers = resData.inProgressOffers;
    }, error => {
      console.log(error);
    });

    this.offerService.GetDashboardOffers(this.appUserId).subscribe(resData => {
      this.offersList = resData.offersList;
      this.activeProjectsList = resData.activeProjectsList;
      this.finishedProjectsList = resData.finishedProjectsList;
    }, error => {
      console.log(error);
    });

    this.clientService.GetByAppUserId(this.appUserId).subscribe(data => {
      data.forEach(el => {
        this.clientList.push(new ClientDashboard(el.clientId, el.firstName + " " + el.lastName, el.companyName, el.phoneNumber));
      });
    }, error => {
      console.log(error);
    });
  }
  openDialog(offerId: number){
    this.dialog.open(ModalOfferDetailComponent, {width: '800px', data:{offerId: offerId}},);
    
  
    
  }
}