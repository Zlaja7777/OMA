import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProjectTasksService, ProjectTasksData } from 'src/app/api-services/project-tasks.service';
import { OfferService } from 'src/app/api-services/offer.service';
import { JWToken } from 'src/app/api-services/jwtoken.service';
import { CurrencyService } from 'src/app/api-services/currency.service';
import { WorkerService } from 'src/app/api-services/worker.service';
import { ModalAddTransactionComponent } from '../transactions/modal-add-transaction/modal-add-transaction.component';
import { ModalAddTaskComponent } from './modal-add-task/modal-add-task.component';
import { ContentObserver } from '@angular/cdk/observers';
import { TaskUpsertModel } from 'src/app/shared/Models/task-upsert.model';

@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.css']
})
export class ProjectTasksComponent implements OnInit {

  constructor(private route : ActivatedRoute, private dialog: MatDialog, 
      private projectTasksService: ProjectTasksService, private offerService: OfferService, private token: JWToken,
      private currencyService: CurrencyService, private workerService: WorkerService) { }

  offerId: number;
  editMode = false;
  checkUserBool: boolean;
  projectTasks: ProjectTasksData[] = [];
  currency: string;
  projectName: string;
  offerName : string;
  numberOfPaid : number;
  numberOfPaidBool = false;
  numberOfTasks: number;
  numberOfFinishedTasks: number;
  progresTasks: string;
  costs : string;
  cost: number;
  earnings : string;
  progresTasks1: number
  checkUser(loggedUser: string, offerUserId: string) : boolean{
    return loggedUser == offerUserId
  }

  ngOnInit(): void {
    if (this.route.snapshot.params['id'] != null){
      this.offerId = this.route.snapshot.params['id'];
    }
    this.projectTasksService.GetAll(this.offerId).subscribe(s=>{
        this.offerService.GetById(this.offerId).subscribe(o=>{
          if(!this.checkUser(this.token.getToken(), o.appUserId)){
            this.checkUserBool = true;
            return;
           }
           this.projectTasks = s;
           this.offerName = o.name;

           this.projectName = o.name
            this.currencyService.GetById(o.currencyId).subscribe(c=>{
                this.currency = c.tag;
            })
            this.projectTasksService.GetAll(this.offerId).subscribe(p=>{
              this.numberOfTasks = p.length;
              this.numberOfFinishedTasks = 0;
              this.cost = 0;
                p.forEach(el=>{
                  if(el.paid){
                    this.numberOfFinishedTasks++;
                  }
                  this.cost += el.amount;
                
                })
                if(this.numberOfTasks > 0){
                      this.progresTasks1= (this.numberOfFinishedTasks/ this.numberOfTasks) * 100;
                      this.progresTasks = this.progresTasks1.toString().slice(0,4)
                }
                else{
                  this.progresTasks = "0";
                
                }
               
            })
        })
        // this.numberOfPaid = 0;
        // s.forEach(el=>{
        //    if(el.paid)
        //    {
        //       this.numberOfPaid++;
        //    }
        // })
        // if(this.numberOfPaid == this.projectTasks.length){
        //   this.numberOfPaidBool = true;
        // }
    })  
  }
  openDialog(offerId: number){
    this.dialog.open(ModalAddTaskComponent, {width: '500px', data:{ offerId: offerId}});  
  }
  openEditDialog(offerId: number, taskId: number){
    this.dialog.open(ModalAddTaskComponent, {width: '500px', data:{oId: offerId, taskId: taskId}});
  }
  Delete(projectTasksId: number){
 
    this.projectTasksService.Delete(projectTasksId).subscribe(()=>{

      this.ngOnInit();
    })
  }
  ChangePaidStatus(taskId: number){
    this.projectTasksService.GetById(taskId).subscribe(s=>{
      if(!s.paid)
        var task = new TaskUpsertModel(s.workerId, s.name, s.offerId, s.amount, s.workDays, true);
      else
        var task = new TaskUpsertModel(s.workerId, s.name, s.offerId, s.amount, s.workDays, false);

      this.projectTasksService.Update(taskId, task).subscribe(()=>{
        this.ngOnInit();
      })
    })
    
      
   
     
  }
}
