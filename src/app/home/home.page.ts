import { Component, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [TaskService],
})
export class HomePage {
  @Output() tasks: Task[];
  @Output() completedTasks: Task[];

  constructor() {}

  // ngOnInit() {
  //   this.taskService.getTasks().subscribe((tasks) => {
  //     this.tasks = tasks as Task[];
  //     this.taskService.sortTasks(this.tasks);
  //   });

  //   this.completedTasks = [];
  // }

  // addTask(task: any) {
  //   this.taskService.createTask(task).subscribe((response) => {
  //     console.log(response);
  //     if (response.message === 'Task created') {
  //       task.id = response.id;
  //       this.addTaskIntoTasks(task);
  //     }
  //   });
  // }

  // toggleTask(task: Task) {
  //   console.log('toggle task id = ' + task.id + ' task title = ' + task.title);
  //   task.completed = !task.completed;
  //   this.tasks = this.tasks.filter((t) => t.id !== task.id);
  //   this.addTaskIntoCompleted(task);
  // }

  // unToggleTask(task: Task) {
  //   console.log(
  //     'un toggle task id = ' + task.id + ' task title = ' + task.title
  //   );
  //   task.completed = !task.completed;
  //   this.completedTasks = this.completedTasks.filter((t) => t.id !== task.id);
  //   this.addTaskIntoTasks(task);
  // }

  // addTaskIntoCompleted(task: Task) {
  //   this.completedTasks.push(task);
  //   this.taskService.sortTasks(this.completedTasks);
  // }

  // addTaskIntoTasks(task: Task) {
  //   this.tasks.push(task);
  //   this.taskService.sortTasks(this.tasks);
  // }

  // deleteTaskFromTaskList(task: Task) {
  //   this.tasks = this.tasks.filter((t) => t.id !== task.id);
  //   this.taskService.deleteTask(task.id).subscribe((response) => {
  //     console.log(response);
  //   });
  // }

  // deleteTaskFromCompleted(task: Task) {
  //   this.completedTasks = this.completedTasks.filter((t) => t.id !== task.id);
  //   this.taskService.deleteTask(task.id).subscribe((response) => {
  //     console.log(response);
  //   });
  // }

  // updateTask(task: Task) {
  //   // const index = this.tasks.findIndex((t) => t.id === task.id);
  //   // this.tasks[index].title = task.title;
  //   // this.tasks[index].description = task.description;
  //   // this.tasks[index].urgentLevel = task.urgentLevel;
  //   // this.taskService.updateTask(task).subscribe((response) => {
  //   //   console.log(response);
  //   // });
  //   console.log('Task updated');
  // }
}
