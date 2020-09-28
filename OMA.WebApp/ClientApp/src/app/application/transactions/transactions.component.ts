import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TransactionService } from 'src/app/api-services/transaction.service';
import { TransactionData } from 'src/app/api-services/transaction.service';

import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyService } from 'src/app/api-services/currency.service';
import { OfferService } from 'src/app/api-services/offer.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalOfferDetailComponent } from '../my-offers/modal-offer-detail/modal-offer-detail.component';
import { ArgumentOutOfRangeError, Subject } from 'rxjs';
import { ModalAddTransactionComponent } from './modal-add-transaction/modal-add-transaction.component';
import { NumberValueAccessor } from '@angular/forms';
import { count } from 'console';
import { JWToken } from 'src/app/api-services/jwtoken.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  template: '<add-transaction (messageEvent) = "UpdateInit($event)"> </add-transaction>',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  constructor(private transactionService : TransactionService, private route: ActivatedRoute, 
    private currencyService: CurrencyService, private offerService: OfferService, private dialog: MatDialog, private token: JWToken) { 
    }

  transactions: TransactionData[] = [];
  editMode = false;
  currency : string;
  offerId: number;
  isItPaid: boolean;
  checkUserBool: boolean;
  subscription: Subscription;
  offerName: string;
  progress: number;
  paidInMoney: string;
  remainingToPay: string;
  remaining: number;
  totalPrice: number;
  @ViewChild(ModalAddTransactionComponent) modal;
  dodano = false;
  checkUser(loggedUser: string, offerUserId: string) : boolean{
      return loggedUser == offerUserId
  }

  ngOnInit(): void {
  
    if (this.route.snapshot.params['id'] != null){
      this.offerId = this.route.snapshot.params['id'];
    }

    this.transactionService.GetAll(this.offerId).subscribe(s=>{
        this.offerService.GetById(this.offerId).subscribe(o=>{
          if(!this.checkUser(this.token.getToken(), o.appUserId)){
            this.checkUserBool = true;
            return;
           }
           this.transactions = s;
           this.offerName = o.name
            this.currencyService.GetById(o.currencyId).subscribe(c=>{
                this.currency = c.tag;
                this.transactionService.GetProgressBarValue(o.offerId).subscribe(p=>{
                  this.progress = Number (String(p.progressBarValue).slice(0,4))
                  this.paidInMoney = String(p.amountOfPaidTransactions) + " " + c.tag; 
                  this.remainingToPay = String(Number(o.totalPrice) - Number(p.amountOfPaidTransactions)).slice(0,6) + "  " + c.tag;
                  this.remaining = Number(o.totalPrice) - Number(p.amountOfPaidTransactions)
                  this.totalPrice = Number(o.totalPrice);
              })
            })
           
        })
        
       
    });

    this.offerService.GetById(this.offerId).subscribe(s=>{
      this.isItPaid = s.paid;

  })

  }
  openDialog(offerId: number){
 
    this.dialog.open(ModalAddTransactionComponent, {width: '400px', data:{ offerId: offerId}}); 
  }
  openEditDialog(transactionId: number, oId: number){
    
    this.dialog.open(ModalAddTransactionComponent, {width: '400px', data:{ transactionId: transactionId , oId: oId}});

  }
  Delete(transactionId : number){

    this.transactionService.Delete(transactionId).subscribe(s=>{
        this.ngOnInit();
    })
  }
  Update(offerId: number){
    this.transactionService.GetAll(offerId).subscribe(s=>{
           
      
      this.transactions = s;
      this.offerService.GetById(offerId).subscribe(o=>{
          this.currencyService.GetById(o.currencyId).subscribe(c=>{
              this.currency = c.tag;
          })
      })

  });
  this.offerService.GetById(offerId).subscribe(s=>{
    this.isItPaid = s.paid;
      

})
  }
  UpdateInit($event){

      this.ngOnInit();
      
  }

  


  

}
