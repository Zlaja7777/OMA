import { Component, OnInit, ViewChild } from '@angular/core';
import { DropDownModel } from 'src/app/shared/dropdown.model';
import { NumberValueAccessor, FormGroup } from '@angular/forms';
import { StatusService } from 'src/app/api-services/status.service';
import { CurrencyService } from 'src/app/api-services/currency.service';
import { JWToken } from 'src/app/api-services/jwtoken.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import { ClientService } from 'src/app/api-services/client.service';
import { OfferUpsertModel } from 'src/app/shared/Models/offer-upsert.model';
import { OfferService } from 'src/app/api-services/offer.service';
import { stat } from 'fs';
import { start } from 'repl';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {

  editMode = false;
  clients : DropDownModel [] = [];
  currency: DropDownModel[] = [];
  dateNow : Date;
  fromClientID : number;
  fromCurrencyID : number;
  errorArray : string;
  checkStartDate = false;
  checkPrice  = false;
  startDate : Date;
  checkEndDate = false;

  @ViewChild('offerForm') public offerFrm: NgForm;
  offerId: number;
  constructor(private currencyService : CurrencyService,
              private token: JWToken, private clientService : ClientService,
              private router: Router, private route: ActivatedRoute, private offerService : OfferService,
             
    ) { }

  ngOnInit(): void {
    this.dateNow = new Date();
    this.currencyService.GetAll().subscribe(resData => {
      resData.forEach(element => {
        var el = { id: element.currencyId, name: element.tag + " (" + element.name + ")" };
        this.currency.push(el);
        
      });
    }, error => {
      console.log(error);
      console.log(error.error);
    });
    this.clientService.GetByAppUserId(this.token.getToken()).subscribe(resData => {
      resData.forEach(element => {
        var el = { id: element.clientId, name: element.firstName + " " + element.lastName };
        this.clients.push(el);
      });
    }, error => {
      console.log(error);
      console.log(error.error);
    });

    if (this.route.snapshot.params['id']){
      this.editMode = true;
      this.offerId = this.route.snapshot.params['id'];
      
      this.initForm();
    }
  }

  onSubmit(){
    if(!this.offerFrm.valid) return;
  
    var appUserID = this.token.getToken();

    this.offerFrm.value.totalTimeDays =  this.getWorkDays(this.offerFrm.value.startDate, this.offerFrm.value.endDate);
    if(!this.offerFrm.value.deadlineExceeded && !this.offerFrm.value.statusId){
      this.offerFrm.value.deadlineExceeded = false;
      this.offerFrm.value.statusId = 1;
  
    }
    var dateNow = new Date();
    var startDate = new Date(this.offerFrm.value.startDate);
    startDate.setHours(dateNow.getHours() + 2)
    startDate.setMinutes(dateNow.getMinutes())
    this.offerFrm.value.totalTimeHours = this.offerFrm.value.totalTimeDays * 8; 
    var offer = new OfferUpsertModel(this.offerFrm.value.name, startDate,
        this.offerFrm.value.endDate, this.offerFrm.value.price, 
        this.offerFrm.value.totalTimeDays, 
        this.offerFrm.value.totalTimeHours, this.offerFrm.value.deadlineExceeded, this.offerFrm.value.description, this.offerFrm.value.statusId, false,
        this.offerFrm.value.currencyId, this.offerFrm.value.clientId, appUserID);
      

    if (this.editMode){
        this.offerService.Update(this.offerId, offer).subscribe(()=>{
          this.router.navigate(['/app/my-offers/' + this.offerId]);
        })
      
    } 
    else{
       
        this.offerService.Insert(offer).subscribe(() => {
          this.router.navigate(['/app/my-offers']);
        });
     } 
    
  }
  getWorkDays(startDate:Date, endDate : Date) {

      var countWorkDays=0;
      var currentDate = new Date(startDate);
      var end = new Date (endDate);
      const sunday = 0;
      const saturday = 6;

      while(currentDate <= end){

          if(currentDate.getDay() != sunday && currentDate.getDay() != saturday){
            countWorkDays++;
          }
          currentDate.setDate(currentDate.getDate() + 1);
      }
      return countWorkDays;
  }
  private initForm(){
    this.offerFrm = new NgForm([],[]);
    this.offerService.GetById(this.offerId).subscribe(o=>{
      if(o.statusId == 3 || o.statusId == 5){
          this.router.navigate(['/app/my-projects/' + o.offerId]);
          return;
      }
        this.offerFrm.controls['name'].setValue(o.name);
        this.offerFrm.controls['clientId'].setValue(o.clientId);
        this.offerFrm.controls['startDate'].setValue(o.startDate);
        this.offerFrm.controls['endDate'].setValue(o.endDate);
        this.offerFrm.controls['price'].setValue(o.totalPrice);
        this.offerFrm.controls['currencyId'].setValue(o.currencyId);
        this.offerFrm.controls['description'].setValue(o.description);
        this.offerFrm.controls['statusId'].setValue(o.statusId);
        this.offerFrm.controls['deadlineExceeded'].setValue(o.deadlineExceeded);
   
    })
    
  }
  CheckStartDate(date: Date){
      var dateNow = new Date();
      var dateStart = new Date(date);

      if(dateNow > dateStart){
          this.checkStartDate = true;
      }
      else{
          this.checkStartDate = false;
          this.startDate = new Date(dateStart);
      }
  }

  CheckPrice(number : number){

      if(number <= 0){
          this.checkPrice = true;
      }
      else {
          this.checkPrice = false;
          
      }
  }
  CheckEndDate(date: Date){
    var dateEnd = new Date(date);
      //ako je start date null onda se moze i ovdje staviti true
      if(this.startDate >= dateEnd){
        this.checkEndDate = true;
      }   
      else{
        this.checkEndDate = false;
      }
  }
  
  
  
 

}
