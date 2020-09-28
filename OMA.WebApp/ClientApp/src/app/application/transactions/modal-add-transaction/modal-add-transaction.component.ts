import { Component, OnInit, ViewChild, Inject, Output, EventEmitter } from '@angular/core';
import { NgForm, FormControl, Validators, FormBuilder, Validator, ValidationErrors, AbstractControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TransactionUpsertModel } from 'src/app/shared/Models/transaction-upsert.model';
import { TransactionService, TransactionData } from 'src/app/api-services/transaction.service';
import { Route } from '@angular/compiler/src/core';
import { RouterEvent, ActivatedRoute, Router } from '@angular/router';
import { ResourceLoader } from '@angular/compiler';
import {Location, DecimalPipe} from '@angular/common'
import { OfferService } from 'src/app/api-services/offer.service';
import { CurrencyService } from 'src/app/api-services/currency.service';
import { TransactionsComponent } from '../transactions.component';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';
import { emit } from 'process';

@Component({
  selector: 'add-transaction',
  templateUrl: './modal-add-transaction.component.html',
  styleUrls: ['./modal-add-transaction.component.css']
})
export class ModalAddTransactionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private transactionService: TransactionService , 
   private router: ActivatedRoute, private location: Location, private offerService: OfferService,
   private currencyService: CurrencyService, private dialog: MatDialog, private route: Router) {
     
    }
  transactions: TransactionData[];
  isItPaid: boolean;
 
 
  @ViewChild('transactionForm') public transactionFrm: NgForm;
  currentDateTime : Date = new Date();
  offerId: number;
  offerName: string;
  currency: string;
  remainingToPay: number;
  ooId: number;
  transactionId : number;
  editMode = false;
  maxChecker = false;
  allTransactions: number; 
  subs : Subscription;
  dodano = false;
  totalPrice: number;
  editTransaction: number;
  maxCheckerEdit = false;
  // @Output() event = new EventEmitter<any>();
// transactionsComp = new TransactionsComponent(this.transactionService, this.router, this.currencyService, this.offerService, this.dialog);
  ngOnInit(): void {
    
 
    if (this.data.offerId){
      this.offerId = this.data.offerId;
    this.offerService.GetById(this.offerId).subscribe(s=>{
       this.offerName = s.name
       this.currencyService.GetById(s.currencyId).subscribe(s=>{
          this.currency = s.tag
       })
       this.transactionService.GetAll(s.offerId).subscribe(t=>{
          
        this.remainingToPay = Number(s.totalPrice) - Number(this.add(t));
      })
       
    })
    }
    else {
      this.transactionId = this.data.transactionId;
      this.offerId = this.data.oId
      this.editMode = true;
      this.transactionFrm = new NgForm([],[]);
      this.transactionService.GetById(this.transactionId).subscribe(s=>{
          this.transactionFrm.controls['amount'].setValue(s.amount);
          this.editTransaction = Number(s.amount)
      })
      this.offerService.GetById(this.offerId).subscribe(s=>{
        this.offerName = s.name
        this.currencyService.GetById(s.currencyId).subscribe(s=>{
           this.currency = s.tag
        })
        this.transactionService.GetAll(s.offerId).subscribe(t=>{
           
         this.remainingToPay = Number(s.totalPrice) - Number(this.add(t));
          this.totalPrice = Number(s.totalPrice);
          this.editTransaction+= this.remainingToPay;
       })
        
     })
    }
 
   
  }

  add(t : any) : number{
    var all = 0;
    for(let i = 0; i< t.length; i++){
      all+= t[i].amount;
    }
    return all;
  }

 
  onSubmit(){
 
    if (!this.transactionFrm.valid ) {
        return;
      }
        this.currentDateTime.setHours (this.currentDateTime.getHours() + 2)
      if(this.data.offerId){
        var transaction = new TransactionUpsertModel(this.transactionFrm.value.amount,
          this.currentDateTime, this.data.offerId  );
        this.transactionService.Insert(transaction).subscribe(s=>{
            location.reload();
        });
      }
      else{
        var transaction = new TransactionUpsertModel(this.transactionFrm.value.amount,
          this.currentDateTime, this.data.oId );
        this.transactionService.Update(this.transactionId, transaction).subscribe(s=>{
          location.reload();
        });
      }
  }
  onKeyPress(number: number){
    if((number > this.remainingToPay  || number <= 0)&& (this.data.offerId) ){
      this.maxChecker  = true;
    }
    else if(number > this.editTransaction && (this.data.oId) ){
     
      this.maxCheckerEdit  = true;
    }
    else {
      this.maxChecker = false;
      this.maxCheckerEdit = false;
    }
  }
}
