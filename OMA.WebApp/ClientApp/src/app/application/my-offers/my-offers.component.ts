import { Component, OnInit, PipeTransform } from '@angular/core';
import { OfferService, OfferData } from 'src/app/api-services/offer.service';
import { JWToken } from 'src/app/api-services/jwtoken.service';
import { ModalOfferDetailComponent } from './modal-offer-detail/modal-offer-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Pipe } from '@angular/core';



@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})


export class MyOffersComponent implements OnInit {

  offersList: OfferData[] = [];
  activeProjectsList: OfferData[] = [];
  finishedProjectsList: OfferData[] = [];
  waitingOffers: number;
  acceptedOffers: number;
  inProgressOffers: number;
  deniedOffers: number;
  doneOffers: number;
  counter : number;
  appUserId: string;
  constructor(private token: JWToken, private offerService: OfferService,
      private dialog: MatDialog, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.appUserId = this.token.getToken();
    if(this.route.snapshot.params['id']){
        this.counter = 0;
        this.offerService.GetByUserId(this.appUserId).subscribe(r=>{
          r.forEach(e=>{
            
            if(e.statusId == this.route.snapshot.params['id']){
              this.offersList[this.counter] = e;
 
              this.counter++;
            }
          })
        });

        this.offerService.GetOfferCounter(this.appUserId).subscribe(resData => {
          this.waitingOffers = resData.waitingOffers;
          this.acceptedOffers = resData.acceptedOffers;
          this.doneOffers = resData.doneOffers;
          this.deniedOffers = resData.deniedOffers;
          this.inProgressOffers = resData.inProgressOffers;
        }, error => {
          console.log(error);
        });
        this.offersList.reverse();
        return;
    }
  this.counter = 0;
    this.offerService.GetByUserId(this.appUserId).subscribe(r=>{
      r.forEach(e=>{
        
        if(e.statusId == 1 || e.statusId == 2 || e.statusId == 4){
          this.offersList[this.counter] = e;
       
          this.counter++;
        }
      })
      
    });

    this.offerService.GetOfferCounter(this.appUserId).subscribe(resData => {
      this.waitingOffers = resData.waitingOffers;
      this.acceptedOffers = resData.acceptedOffers;
      this.doneOffers = resData.doneOffers;
      this.deniedOffers = resData.deniedOffers;
      this.inProgressOffers = resData.inProgressOffers;
    }, error => {
      console.log(error);
    });
    
    
  }
  openDialog(offerId: number){
   
    this.dialog.open(ModalOfferDetailComponent, {width: '800px', data:{offerId: offerId}},);
  }
  onKeyPress(name: string){
    this.offerService.GetByUserId(this.appUserId).subscribe(r=>{
      this.offersList = [];
      r.forEach(element => {
        if(!this.route.snapshot.params['id']){
            if(this.compare(element.offerName, name, element.client) && (element.statusId == 1 || element.statusId == 2 || element.statusId == 4)){
              this.offersList.push({offerId :element.offerId, offerName: element.offerName,
                                    clientId: element.clientId, client : element.client, statusId: element.statusId, status : element.status,
                                    totalPrice : element.totalPrice, currency: element.currency, currencyId : element.currencyId });
            }
          }
        else{
          if(this.compare(element.offerName, name, element.client) && (element.statusId == this.route.snapshot.params['id'])){
            this.offersList.push({offerId :element.offerId, offerName: element.offerName,
                                  clientId: element.clientId, client : element.client, statusId: element.statusId, status : element.status,
                                  totalPrice : element.totalPrice, currency: element.currency, currencyId : element.currencyId });
          }
        }
      });

        

    });

  }
  
  compare (elementName: string, name: string, client: string){
     return name.toLowerCase() == elementName.slice(0, name.length).toLowerCase() || name.toLowerCase() == client.slice(0, name.length).toLowerCase();  
  }
}


