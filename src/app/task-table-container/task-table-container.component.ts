import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, QueryList } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Task } from '../task';
import { TaskService } from '../task.service';

// const mockTasks: Task[] = [
//   {
//     id: '6a39ad61-1d06-4293-9abb-dffda379e489',
//     title: 'Task 1',
//     isEdit: false,
//     urgentLevel: 1,
//     description: 'Description 1',
//     completed: true,
//     updatedAt: Math.floor(Date.now() / 1000),
//     createdAt: Math.floor(Date.now() / 1000),
//   },
//   {
//     id: '6a39ad61-1d06-4293-9abb-dffda379e489',
//     isEdit: false,
//     title: 'Task 2',
//     urgentLevel: 2,
//     description: 'Description 2',
//     completed: true,
//     updatedAt: Math.floor(new Date(2020, 5, 0).valueOf() / 1000),
//     createdAt: Math.floor(new Date(2020, 5, 0).getTime() / 1000),
//   },
//   {
//     id: '6a39ad61-1d06-4293-9abb-dffda379e489',
//     isEdit: false,
//     title: 'Task 3',
//     urgentLevel: 3,
//     description: 'Description 3',
//     completed: true,
//     updatedAt: Math.floor(new Date(2022, 7, 16).getTime() / 1000),
//     createdAt: Math.floor(Date.now() / 1000),
//   },
// ];

@Component({
  selector: 'app-task-table-container',
  templateUrl: './task-table-container.component.html',
  styleUrls: ['./task-table-container.component.scss'],
})
export class TaskTableContainerComponent {
  displayedColumns: string[] = [
    'status',
    'title',
    'urgentLevel',
    'description',
    'operation',
  ];
  tasks: Task[];
  p1Task: Task[];
  p2Task: Task[];
  p3Task: Task[];
  completedTask: Task[];
  selectedRows = new Set<Task>();

  dls: string[] = ['p1', 'p2', 'p3', 'completed'];
  dlq: QueryList<CdkDropList>;

  constructor(private taskService: TaskService) {
    this.taskService.getTasksFromServer().subscribe(
      (tasks) => {
        console.log('Got data from service');
        this.tasks = tasks;
        this.p1Task = tasks.filter((t) => t.urgentLevel === 1 && !t.completed);
        this.p2Task = tasks.filter((t) => t.urgentLevel === 2 && !t.completed);
        this.p3Task = tasks.filter((t) => t.urgentLevel === 3 && !t.completed);
        this.completedTask = tasks.filter((t) => t.completed);
      },

      (error) => {
        console.log(error);
      }
    );
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.container.id === 'completed') {
      this.completedTask[event.currentIndex].completed = true;
      this.updateDb(this.completedTask[event.currentIndex]);
      return;
    }

    if (event.previousContainer.id === 'completed') {
      switch (event.container.id) {
        case 'p1':
          this.p1Task[event.currentIndex].urgentLevel = 1;
          this.p1Task[event.currentIndex].completed = false;
          // update database
          this.updateDb(this.p1Task[event.currentIndex]);
          break;
        case 'p2':
          this.p2Task[event.currentIndex].urgentLevel = 2;
          this.p2Task[event.currentIndex].completed = false;
          this.updateDb(this.p2Task[event.currentIndex]);
          break;
        case 'p3':
          this.p3Task[event.currentIndex].urgentLevel = 3;
          this.p3Task[event.currentIndex].completed = false;
          this.updateDb(this.p3Task[event.currentIndex]);
          break;
      }
    } else {
      switch (event.container.id) {
        case 'p1':
          this.p1Task[event.currentIndex].urgentLevel = 1;
          // update database
          this.updateDb(this.p1Task[event.currentIndex]);
          break;
        case 'p2':
          this.p2Task[event.currentIndex].urgentLevel = 2;
          this.updateDb(this.p2Task[event.currentIndex]);
          break;
        case 'p3':
          this.p3Task[event.currentIndex].urgentLevel = 3;
          this.updateDb(this.p3Task[event.currentIndex]);
          break;
      }
    }
  }

  onSelectedRowsChange(selectedRows: Set<Task>) {
    this.selectedRows = new Set<Task>([...selectedRows, ...this.selectedRows]);
    console.log(this.selectedRows);
  }

  onStatusChange(task: Task) {
    task.completed = !task.completed;
    task.updatedAt = Math.floor(Date.now() / 1000);
    if (!task.completed) {
      this.completedTask = this.completedTask.filter((t) => t.id !== task.id);
      switch (task.urgentLevel) {
        case 1:
          this.p1Task.push(task);
          break;
        case 2:
          this.p2Task.push(task);
          break;
        case 3:
          this.p3Task.push(task);
          break;
      }
    } else {
      switch (task.urgentLevel) {
        case 1:
          this.p1Task = this.p1Task.filter((t) => t.id !== task.id);
          break;
        case 2:
          this.p2Task = this.p2Task.filter((t) => t.id !== task.id);
          break;
        case 3:
          this.p3Task = this.p3Task.filter((t) => t.id !== task.id);
          break;
      }
      this.completedTask.push(task);
    }

    this.updateDb(task);
  }

  updateDb(task: Task) {
    this.taskService.updateTask(task).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addNewTask(task: Task) {
    switch (task.urgentLevel) {
      case 1:
        this.p1Task.push(task);
        // create new task in database
        break;
      case 2:
        this.p2Task.push(task);
        break;
      case 3:
        this.p3Task.push(task);
        break;
    }
  }

  onSortChange(event: Sort) {
    console.log(event);
  }
  onUrgentLevelChange(event: { task: Task; originUrgentLevel: number }) {
    console.log(event);
    switch (event.originUrgentLevel) {
      case 1:
        this.p1Task = this.p1Task.filter((t) => t.id !== event.task.id);
        break;
      case 2:
        this.p2Task = this.p2Task.filter((t) => t.id !== event.task.id);
        break;
      case 3:
        this.p3Task = this.p3Task.filter((t) => t.id !== event.task.id);
        break;
    }

    let buffer: Task[];
    switch (+event.task.urgentLevel) {
      case 1:
        buffer = JSON.parse(JSON.stringify(this.p1Task));
        buffer.push(event.task);
        this.p1Task = buffer;
        break;
      case 2:
        buffer = JSON.parse(JSON.stringify(this.p2Task));
        buffer.push(event.task);
        this.p2Task = buffer;
        break;
      case 3:
        buffer = JSON.parse(JSON.stringify(this.p3Task));
        buffer.push(event.task);
        this.p3Task = buffer;
        break;
    }
  }
}
