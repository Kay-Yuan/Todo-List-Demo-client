import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './task';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    this.getTasksFromServer();
  }

  getTasksFromServer(): Observable<Task[]> {
    return this.http.get(`${this.url}/task?offset=0`).pipe(
      tap((data: any[]) => {
        this.tasks = data as Task[];
      }),
      catchError(this.handleError('getTasksFromServer', []))
    );
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  createTask(task: any): Observable<object> {
    return this.http.post(`${this.url}/task/create`, task).pipe(
      tap((data: any) => {
        task.id = data.id;
        task.completed = false;
        task.isEdit = false;
        task.createdAt = data.createdAt;
        task.updatedAt = data.updatedAt;
        this.tasks.push(task);
      }),
      catchError(this.handleError('createTask', []))
    );
  }

  updateTask(task: Task): Observable<object> {
    return this.http
      .put(`${this.url}/task/${task.id}`, task)
      .pipe(catchError(this.handleError('updateTask', [])));
  }

  deleteTask(task: Task): void {
    this.http.delete(`${this.url}/task/${task?.id}`).subscribe(
      (data: any) => {
        console.log(data);
        if (data.message === 'Task deleted') {
          if (task.completed) {
            this.tasks = this.tasks.filter((t) => t.id !== task?.id);
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  sortTasks(
    tasks: Task[],
    sortBy: string = 'urgentLevel',
    sortOrder: string = 'asc'
  ): Task[] {
    if (sortBy === 'urgentLevel') {
      tasks.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.urgentLevel - b.urgentLevel;
        } else {
          return b.urgentLevel - a.urgentLevel;
        }
      });
    } else {
      tasks.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a[sortBy] - b[sortBy];
        } else {
          return b[sortBy] - a[sortBy];
        }
      });
    }
    return tasks;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);

      // TODO: better job of transforming error for user consumption
      //   this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }
}
