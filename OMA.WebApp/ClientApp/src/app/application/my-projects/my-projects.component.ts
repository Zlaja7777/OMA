import { Component, OnInit } from '@angular/core';
import { OfferService, OfferData } from 'src/app/api-services/offer.service';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { JWToken } from 'src/app/api-services/jwtoken.service';
import { element } from 'protractor';
import { ModalOfferDetailComponent } from '../my-offers/modal-offer-detail/modal-offer-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from 'src/app/api-services/client.service';
import { ContentObserver } from '@angular/cdk/observers';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {
  
  constructor(private offerService: OfferService, private token : JWToken, private dialog: MatDialog, private clientService: ClientService, private route: ActivatedRoute) { }
  appUserId : string;
  offersList: OfferData[] = [];
  counter : number;
  counterForList : number;
  ngOnInit( ): void {
    this.appUserId = this.token.getToken();
    
    if(this.route.snapshot.params['id']){
      this.counter = 0;
      this.offerService.GetByUserId(this.appUserId).subscribe(r=>{
      r.forEach(element => {
        if(element.statusId == this.route.snapshot.params['id'] ){
         
          this.offersList[this.counter] = element;
          this.counter++;
        }
        });
        this.offersList.reverse();
      });
      this.counterForList = 0;
      return;
    }
    this.counter = 0;
    this.offerService.GetByUserId(this.appUserId).subscribe(r=>{
      r.forEach(element => {
        if(element.statusId == 3 || element.statusId == 5){
         
          this.offersList[this.counter] = element;
          this.counter++;
        }
      });
      this.offersList.reverse();
    });
    this.counterForList = 0;
    
  }
  openDialog(offerId: number){
    this.dialog.open(ModalOfferDetailComponent, {width: '800px', data:{offerId: offerId}},);
  }
  onKeyPress(name: string){
    this.offerService.GetByUserId(this.appUserId).subscribe(r=>{
      this.offersList = [];
      r.forEach(element => {
        if(!this.route.snapshot.params['id']){
           if(this.compare(element.offerName, name, element.client) && (element.statusId == 3 || element.statusId == 5) ){
          this.offersList.push({offerId :element.offerId, offerName: element.offerName,
                                clientId: element.clientId, client : element.client, statusId: element.statusId, status : element.status,
                                totalPrice : element.totalPrice ,currency: element.currency, currencyId : element.currencyId  });
          }
        }
        else{
          if(this.compare(element.offerName, name, element.client) && (element.statusId == this.route.snapshot.params['id'])){
            this.offersList.push({offerId :element.offerId, offerName: element.offerName,
                                  clientId: element.clientId, client : element.client, statusId: element.statusId, status : element.status,
                                  totalPrice : element.totalPrice ,currency: element.currency, currencyId : element.currencyId  });
            }
        }
      });

        

    });

  }
  
  compare (elementName: string, name: string, client: string){
      return name.toLowerCase() == elementName.slice(0, name.length).toLowerCase() || name.toLowerCase() == client.slice(0, name.length).toLowerCase() ;
  }



  

}

