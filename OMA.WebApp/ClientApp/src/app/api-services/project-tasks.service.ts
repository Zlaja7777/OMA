import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TransactionUpsertModel } from '../shared/Models/transaction-upsert.model';
import { TaskUpsertModel } from '../shared/Models/task-upsert.model';

@Injectable({ providedIn: 'root' })
export class ProjectTasksService {
    private readonly endpoint = `${environment.baseUrl}api/ProjectTasks`;

    constructor(private http: HttpClient) { }

 
    GetAll (offerId: number): Observable<ProjectTasksData[]>{
        return this.http.get<ProjectTasksData[]>(this.endpoint + "?OfferId=" +offerId)
    }
    Insert(task: TaskUpsertModel){
        return this.http.post(this.endpoint + "/", task);
        
    }
    GetById(taskId: number){
        return this.http.get<ProjectTasksData>(this.endpoint + "/" + taskId);
    }   
    Update(id: number, task: TaskUpsertModel){
        
        return this.http.put(this.endpoint + "/" + id, task);
    }
    Delete (id: number){
        return this.http.delete(this.endpoint + "/" + id);
    }
  
}

interface IProjectTasks {
    name: string;
    paid: boolean;
    amount: number;
    workerId: number,
    offerId: number,
    workDays: number;
    worker: string;
}

export interface ProjectTasksData {
    projectTasksId: number,
    name: string;
    paid: boolean;
    amount: number;
    workerId: number,
    offerId: number,
    workDays: number;
    workers: string;
}