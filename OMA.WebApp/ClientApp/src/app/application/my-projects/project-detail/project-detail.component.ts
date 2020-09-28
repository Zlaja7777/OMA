import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
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
import { JWToken } from 'src/app/api-services/jwtoken.service';
import { Observable, Subject } from 'rxjs';
import { ProjectTasksData, ProjectTasksService } from 'src/app/api-services/project-tasks.service';
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
import { AddressService } from 'src/app/api-services/address.service';
import { ClientRequest } from 'http';
import { ClientUpsertModel } from 'src/app/shared/Models/client-upsert.model';
import { element } from 'protractor';
import { style } from '@angular/animations';

pdfMake.vfs = pdfFonts.pdfMake.vfs; 
//import {jsPDF} from 'jspdf';
declare var jsPDF: any;
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],

})
export class ProjectDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private offerService: OfferService, private currencyService: CurrencyService,
            private statusService: StatusService, private clientService: ClientService,
            private transactionService: TransactionService, private router: Router, private token: JWToken, private projectTasksService: ProjectTasksService,
            private addressService: AddressService) { }
  id: number;
  offer: Offer = new Offer();
  totalPrice : string;
  status: string;
  client: string;
  progress: number;
  @ViewChild ('content') content : ElementRef;
  paidInMoney: string;
  remainingToPay: string;
  remaining: number;
  statusList : statusList[] = [];
  isItDone = false;
  checkUserBool: boolean
  numberOfTasks: number;
  numberOfFinishedTasks: number;
  progresTasks: string;
  costs : string;
  cost: number;
  earnings : string;
  progresTasks1: number;
  offerId: number;
  projectTasks: ProjectTasksData[] = [];
  tag;


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
                  this.remaining = Number(s.totalPrice) - Number(p.amountOfPaidTransactions);
                  this.tag = new String(e.tag);
              })
                this.projectTasksService.GetAll(this.id).subscribe(p=>{
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
                    this.costs = String(this.cost) + " " + e.tag;
                    this.earnings = String(Number(s.totalPrice) - this.cost) + " " + e.tag;
                })
             

         })
         this.statusService.GetById(s.statusId).subscribe(r=>{
           this.status = r.name
           if(r.statusId == 5){
            this.isItDone = true;
          }
         })
      
         
         this.statusList.splice(0, this.statusList.length);
         this.statusService.GetAll().subscribe(p=>{
            p.forEach(element => {
                if( element.statusId == 5){
                
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
        
            this.ngOnInit();
          
        })
  })
}

  downloadAsPdf(clientId: number, offerId: number){
    

    this.clientService.GetById(clientId ).subscribe(s=>{
       this.addressService.GetById(s.addressId).subscribe(a=>{
          this.offerService.GetById(offerId).subscribe(o=>{
            this.projectTasksService.GetAll(offerId).subscribe(pt=>{
             
              this.projectTasks = pt;
      
 

    let docDefinition = {  
      info: {
        title: o.name + " - INVOICE",
       
      },  
        content: [
        {
              image: 'data:image/png;base64,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',
              height: 55,
              width: 180
        },
        {
          image: 'data:image/png;base64,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35z980fs8jnaXanWDA3kqssWd5S948JX5LSznx2A/sCPn859dz61Q92vtlRJKZWU8rlP3JwrLulsKZi97+Rcu/h9OfW4A9OVagYzkuHUU0sj9dZktlu+Rsd61Mf2m7fPjPzFP52XCz90WsdxVz3dn999yzczlFqr+9XuCSDtGcwWL1uVD/z6f29VfviCWblm8fty2skHpyuVDGYkQ6llJPXnvb9a6x6HUs9QaxnKSqk0Fkq2V70+Oi5mJPWMpLaDr9HPQLsNsC3VXT8EAC8m7Slee1PN33/kmpx29vwc9zP7j/t5yq1WkEX3rsy9d67I0cfvkyR5zXmHdux384+W5tGHn9npbkzt2bA21IbyN398ReYdPC2HHT1rrHzytJ5cdudv5Uv/fHu+8e9357Gl67Ly6U3pz3BGq92j52ymma6UM71vYmbtOyknvWpefu8jr86cedM6zte/cSh/8OvfzmNr12Ziundb60dbO2BdedniXPyxG/KePzq144wHHDQ9377l3fna5+7KN794dx5bsjarntyUDY3B1NPcYt/RLl3dqWbKxJ7MmDUxe8+amMMXzMpA/0iu+PZD2TQwuN2jWSZP7cn+PVPTN7ErpfL2P4NSknK5lEazmVWr+tNIc7c/Q+ClRQAB2AO1K+3r6pvzf373O7nktt/cLeeoppxHFq/KbTcsGwsgW9o8MJLbrn8smzKUiene6XOVU053knvufyofeMe3ctHfnZOTT5vXsc/bfvvE/OI7Xp47b3o8d92yPE8u25BNG4YyMDCSrq5yJk7qzrQZfTnimNk5/pVzctChM7Y6z/Kl6/Jnv//9fPt7CzOx1flqdxsLWMOD+fs/uzYjI4285w9eme6ezr+i3/zu4/LLv/HyLLzjydx14/I8tmxdNq0bzOBALaVKOZMmd2fylJ5Mnt6bOfOm5siXz85hLxsNatd+/5Fcd8WSbBhoprKd13X+BQty9HH7pau7nFJpxwJEV3clK5avzwfffWkGazUBBOgggADsocqtVpBrbn84n/nYDXnvH5067ueopJz+DOf26x7Lm995XCZM6gwZDy58OnfeuHyXZ5FqD7BPkpvvXJYPvvuSvO+in82bfnVBx369fdWccuZBOeXMg8a21UYaqXa9cJC49brH8vGLrs411yzOhHS1WmyK0e6KtWZTf/7u/16TVSs25r1/fFr22W9y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'
          ,height: 150,
          width: 300,
          margin:[1, -95, -22, 1], 
          alignment: 'right'
        },
        {  
          
          columns: [  
            [  
              {  text: `Date`,  alignment: 'center', bold: true, margin:[-110,60,1,2]  },  
              {  text: ` ${new Date().toLocaleDateString()}`,  alignment: 'center', bold: true, margin:[-100,10,1,1]  },  
              {  text: `_____________________________`,  alignment: 'left', bold: true,  margin:[1,-10,1,2]  }, 
              {  text: `Invoice No. `, alignment: 'center', margin:[-110,10,1,2], bold: true } , 
              {  text: ` ${(o.offerId + "-" + new Date().getFullYear())}`,  alignment: 'center', bold: true, margin:[-100,10,1,1]  },  
              {  text: `_____________________________`,  alignment: 'left', bold: true,  margin:[1,-10,1,2]  }, 
              

            ],  
            [  
              { text: 'Sanjin Omerović',  bold: true ,  alignment: 'right', margin:[1,60,1,2] },  
              { text: 'Kralja Tomislava 16 c', bold: true, alignment: 'right' , margin:[1,1,1,2]},  
              { text: 'Mostar, Bosnia and Herzegovina', bold: true, alignment: 'right', margin:[1,1,1,2] },  
              { text: '+387 60 309 25 32 ', bold: true, alignment: 'right', margin:[1,1,1,2]}  ,
              { text: 'sanjin.omerovic@outlook.com ', bold: true, alignment: 'right', margin:[1,1,1,2]}  ,
              { text: 'IBAN: BA39 3387 3028 6555 2367 (Unicredit bank)', bold: true, alignment: 'right', fontSize: 11, margin:[1,1,1,2]},
              { text: 'SWIFT: UNCRBA22', bold: true, alignment: 'right' ,fontSize: 11, margin:[1,1,1,1]}  ,
            ]  
        ] 
        
      },  
      {
        columns: [  
          [ 
           
            {  text: `BILL TO`,  alignment: 'left', bold: true, margin:[10,50,1,2]  },   
            {  text: `_________________________`,  alignment: 'left',  margin:[1,-10,1,2], color: 'grey'  }, 
            { text: s.firstName + " " + s.lastName, alignment: 'left', margin:[1,1,1,2] },  
            { text: s.companyName, alignment: 'left' , margin:[1,1,1,2]},  
            { text: a.city + ", " + a.country,  alignment: 'left', margin:[1,1,1,2] },  
            { text: s.phoneNumber,  alignment: 'left', margin:[1,1,1,2]}  ,
            { text: s.email, alignment: 'left', margin:[1,1,20,2]}  ,
            

          ],  
          [  
            {  text: `PROJECT DETAILS`,  alignment: 'right', bold: true, margin:[-20,50,1,2]  },   
            {  text: `_____________________________`,  alignment: 'right', bold: true,  margin:[-145,-10,1,2], color: 'grey'  }, 
        
            { text: o.name ,  alignment: 'right', bold: true, margin:[-20,1,1,2] },  
            { text: o.description,  alignment: 'right' , margin:[-20,1,1,2]},  
            
           
          ]  
      ] , 
      },
     {
        text : "", margin:[1, 50, 1, 1]
     },
      {table: {
              headerRows: 1,
                widths: [ '*', 100, '*', 100 ],
                margin: [1,1,1,-10],
                body:[
                  [ 
                    {text:"Description of services", color: "white", bold: true}, 
                    {text: "Amount",color: "white", bold: true}, 
                    {text: "Worker", color: "white", bold: true}, 
                    {text: "Work days", color: "white", bold: true}, ]
                
                ]
          },
          layout: {
            fillColor: function (rowIndex) {
                return (rowIndex == 0) ? '#2f258f' : null;
            },

          },
         
      },
          
          this.table(this.projectTasks),
          {text : " "},
          
          {text : "Total price: " + o.totalPrice + " " + this.tag, bold: true, alignment: 'right', fontSize: 15}

      ]
      };  
      
     

          pdfMake.createPdf(docDefinition).open(); //change to download
      
        })
      })
      })
      })
     


    }  
 

   buildTableBody(data) {
      var body = [];

      var tag = this.tag;
      body.push();

     
      data.forEach(function(row) {
        var dataRow = [];
  
          //columns.forEach(function(column) {
              
              //if(column == "Work days"){
                dataRow.push(row["name"]);
                dataRow.push(row["amount"] + " " + tag);
                dataRow.push(row["worker"]);
                dataRow.push(row["workDays"]);
              //}
              //else if(column == "Amount"){
                 
              //}
              //else if (column == "Description of services"){
              //}
              //else{
              //}
              
              //return dataRow;
          //})
          
          body.push(dataRow);
      });
      
      return body;
  }
  
   table(data) {
     if(data.length == 0){
       return;
     }
      return {
     
          table: {

              headerRows: 1,
              widths: [ '*', 100, '*', 100 ],
              alignment: 'center',
              body:  this.buildTableBody(data),

          },
          styles: {
            
            tableColumn: {
              bold: true,
              fontSize: 13,
              color: 'green'
            }
          },
          layout: {
            fillColor: function (rowIndex) {
              
                return (rowIndex % 2 === 0) ? '#CCCCCC' : null;

            },

          },
         
          
        
          
      };
  }

   //'#004a80' 
    
  }


export class statusList{
  name: string;
  statusId: number;
}
styles: {
 
}