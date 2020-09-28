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

import { Subscription } from 'rxjs';
import { DropDownModel } from 'src/app/shared/dropdown.model';
import { WorkerService } from 'src/app/api-services/worker.service';
import { JWToken } from 'src/app/api-services/jwtoken.service';
import { TaskUpsertModel } from 'src/app/shared/Models/task-upsert.model';
import { ProjectTasksService } from 'src/app/api-services/project-tasks.service';


@Component({
  selector: 'add-task',
  templateUrl: './modal-add-task.component.html',
  styleUrls: ['./modal-add-task.component.css']
})
export class ModalAddTaskComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private transactionService: TransactionService , 
   private router: ActivatedRoute, private offerService: OfferService,
   private currencyService: CurrencyService, private token: JWToken, private route: Router, private workerService: WorkerService,
    private projectTaskService: ProjectTasksService) {}

  offerName: string;
  workers: DropDownModel[] = [];
  fromWorkerID: number;
  currency: string;
  amountChecker : boolean;
  remainingMoney: number;
  days : number;
  dayChecker= false;
  @ViewChild('taskForm') public taskFrm: NgForm;
  ngOnInit(): void {
    
    
    if(this.data.offerId) {
      this.offerService.GetById(this.data.offerId).subscribe(s=>{
        this.offerName = s.name;
        this.days = s.totalTimeDays;
          this.currencyService.GetById(s.currencyId).subscribe(c=>{
            this.currency = c.tag
          })
         this.projectTaskService.GetAll(s.offerId).subscribe(p=>{
           this.remainingMoney  = Number(s.totalPrice) - this.add(p);
         })
      })
    }
    else{
      
      this.offerService.GetById(this.data.oId).subscribe(s=>{
        this.offerName = s.name;
        this.days = s.totalTimeDays;
          this.currencyService.GetById(s.currencyId).subscribe(c=>{
            this.currency = c.tag
          })
          this.projectTaskService.GetAll(s.offerId).subscribe(p=>{
           this.remainingMoney  = Number(s.totalPrice);
        
          })
          this.projectTaskService.GetById(this.data.taskId).subscribe(t=>{

            this.taskFrm.controls['name'].setValue(t.name);
            this.taskFrm.controls['workerId'].setValue(t.workerId);
            this.taskFrm.controls['amount'].setValue(t.amount);
            this.taskFrm.controls['workDays'].setValue(t.workDays);

          })

      })
    }
    this.workerService.GetAll(this.token.getToken()).subscribe(resData => {
      resData.forEach(element => {
        var el = { id: element.workerId , name: element.firstName + " " + element.lastName };
        this.workers.push(el);
      });
    }, error => {
      console.log(error);
      console.log(error.error);
    });
    
  
  }

  add(t : any) : number{
    var all = 0;
    for(let i = 0; i< t.length; i++){
      all+= t[i].amount;
    }
    return all;
  }

 
  onSubmit(){
    if(!this.taskFrm.valid)
        return;
    if(this.data.offerId){
      
      var task = new TaskUpsertModel(this.taskFrm.value.workerId, this.taskFrm.value.name, this.data.offerId, this.taskFrm.value.amount, this.taskFrm.value.workDays, false);

      this.projectTaskService.Insert(task).subscribe(()=>{
            location.reload();
      })
    }
    else {
      var task = new TaskUpsertModel(this.taskFrm.value.workerId, this.taskFrm.value.name, this.data.oId, this.taskFrm.value.amount, this.taskFrm.value.workDays, false);
      //false promijeniti u skladu
   
      this.projectTaskService.Update(this.data.taskId, task).subscribe(()=>{
           location.reload();
      })
    }
      
  }
  onKeyPressAmount(number: number){
      if((number > this.remainingMoney || number<=0) && (this.data.offerId || this.data.oId)){
        this.amountChecker  = true;
      }
      
      
      else {
        this.amountChecker = false;
      }
  }
  onKeyPressDays(number: number){
    if((number > this.days || number<=0)){
        this.dayChecker  = true;
    }
    else{
        this.dayChecker  = false;
    }
  }
}
