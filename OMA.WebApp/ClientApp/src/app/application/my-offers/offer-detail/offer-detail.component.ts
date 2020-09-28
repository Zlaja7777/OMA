import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Offer } from 'src/app/shared/offer.model';
import { OfferService } from 'src/app/api-services/offer.service';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { CurrencyService } from 'src/app/api-services/currency.service';
import { StatusService } from 'src/app/api-services/status.service';
import { ClientService } from 'src/app/api-services/client.service';
import { TransactionService } from 'src/app/api-services/transaction.service';
import { DeclareFunctionStmt } from '@angular/compiler';
import { OfferUpsertModel } from 'src/app/shared/Models/offer-upsert.model';
import { stat } from 'fs';
import { JWToken } from 'src/app/api-services/jwtoken.service';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private offerService: OfferService, private currencyService: CurrencyService,
            private statusService: StatusService, private clientService: ClientService,
            private transactionService: TransactionService, private router: Router, private token : JWToken) { }
  id: number;
  offer: Offer = new Offer();
  totalPrice : string;
  status: string;
  client: string;
  progress: number;
  
  paidInMoney: string;
  remainingToPay: string;
  remaining: number;
  appUserId : string;
  statusList : statusList[] = [];
  checkUserBool: boolean
  checkUser(loggedUser: string, offerUserId: string) : boolean{
      return loggedUser == offerUserId
  }
  ngOnInit(): void {
    
    if (this.route.snapshot.params['id']) {
      
     
      this.id = this.route.snapshot.params['id'];
      this.offerService.GetById(this.id).subscribe(s=>{
     
        if(!this.checkUser(this.token.getToken(), s.appUserId)){
            this.checkUserBool = true;
            return;

        }
        this.offer.setObject(s.name, s.startDate, s.endDate, s.totalPrice,
         s.totalTimeDays, s.totalTimeHours, s.deadlineExceeded, s.description, 
         s.statusId, s.currencyId, s.clientId, s.offerId, s.paid);

         this.currencyService.GetById(s.currencyId).subscribe(e=>{
            this.totalPrice = String(s.totalPrice) + " " + e.tag;
            this.transactionService.GetProgressBarValue(this.id).subscribe(p=>{
              this.progress = Number (String(p.progressBarValue).slice(0,4))
              this.paidInMoney = String(p.amountOfPaidTransactions) + " " + e.tag; 
              this.remainingToPay = String(Number(s.totalPrice) - Number(p.amountOfPaidTransactions)).slice(0,6) + "  " + e.tag;
              this.remaining = Number(s.totalPrice) - Number(p.amountOfPaidTransactions)
           })
         })
         this.statusService.GetById(s.statusId).subscribe(r=>{
           this.status = r.name
         })
         this.statusList.splice(0, this.statusList.length);
         this.statusService.GetAll().subscribe(p=>{
            p.forEach(element => {
                if(element.statusId != s.statusId && element.statusId != 5){
                
                   this.statusList.push(element);
                }
            });
            
         })
        
         this.clientService.GetById(s.clientId).subscribe(r=>{
           this.client = r.firstName + "  " + r.lastName
         })
      
     })
    
    }
  }
  onRemove(offerId){

    this.offerService.Remove(offerId).subscribe(()=>{
      this.router.navigate(["/app/dashboard"]);
    })
  }
  ChangeStatus(statusId : number){
    var appUserID = this.token.getToken();
    this.offerService.GetById(this.id).subscribe(s=>{
      var offer = new OfferUpsertModel(s.name, s.startDate, s.endDate, s.totalPrice, s.totalTimeDays, s.totalTimeHours,
          s.deadlineExceeded, s.description, statusId, s.paid, s.currencyId, s.clientId, appUserID);
          this.offerService.Update(this.id, offer).subscribe(()=>{
            if(statusId == 3){
              this.router.navigate(["/app/my-projects/" + this.id]);
            }
            else{
              this.ngOnInit();
            }
          })
    })

        
  

  }

}
export class statusList{
   name: string;
   statusId: number;
}
