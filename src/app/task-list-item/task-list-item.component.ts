import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

import { IonModal } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss'],
})
export class TaskListItemComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  @Output() toDoTasks: Task[];
  @Output() completedTasks: Task[];
  isModalOpen = false;
  sortOrder = true;

  updateTaskForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    urgentLevel: new FormControl(''),
    id: new FormControl(''),
  });

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.updateForm();
  }

  addTask(task: any) {
    if (task.description === '') {
      task.description = '';
    }
    if (task.urgentLevel === '') {
      task.urgentLevel = 1;
    }

    this.taskService.createTask(task).subscribe((data: any) => {
      console.log(data);
      if (data.message === 'Task created') {
        task.id = data.id;
        task.completed = false;
        task.createdAt = data.createdAt;
        task.updatedAt = data.updatedAt;
        this.toDoTasks.push(task);
      }
    });
  }

  toggleTask(task: Task) {
    console.log('toggle task id = ' + task.id + ' task title = ' + task.title);
    task.completed = !task.completed;
    this.toDoTasks = this.toDoTasks.filter((t) => t.id !== task.id);
    this.completedTasks.push(task);
    this.completedTasks = this.sortTasks(this.completedTasks);

    //update task status
    this.updateTaskStatus(task);
  }

  unToggleTask(task: Task) {
    console.log(
      'un toggle task id = ' + task.id + ' task title = ' + task.title
    );
    task.completed = !task.completed;
    this.completedTasks = this.completedTasks.filter((t) => t.id !== task?.id);
    this.toDoTasks.push(task);
    this.toDoTasks = this.sortTasks(this.toDoTasks);

    //update task status
    this.updateTaskStatus(task);
  }

  updateTaskStatus(task: Task) {
    this.taskService.updateTask(task).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteTaskFromTaskList(task: Task) {
    this.taskService.deleteTask(task);
    this.toDoTasks = this.toDoTasks.filter((t) => t.id !== task?.id);
  }

  deleteTaskFromCompleted(task: Task) {
    this.taskService.deleteTask(task);
    this.completedTasks = this.completedTasks.filter((t) => t.id !== task?.id);
  }

  onUpdateTask(task: Task) {
    let index: number = this.toDoTasks.findIndex((t) => t.id === task.id);

    if (index !== -1) {
      this.toDoTasks[index].title = task.title;
      this.toDoTasks[index].description = task.description;
      this.toDoTasks[index].urgentLevel = task.urgentLevel;
    } else {
      index = this.completedTasks.findIndex((t) => t.id === task.id);
      this.completedTasks[index].title = task.title;
      this.completedTasks[index].description = task.description;
      this.completedTasks[index].urgentLevel = task.urgentLevel;
    }


    const taskArchived = this.toDoTasks[index];

    this.taskService.updateTask(task).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        // rollback changes
        let index2 = this.toDoTasks.findIndex((t) => t.id === task.id);
        if (index2 !== -1) {
          this.toDoTasks[index2] = taskArchived;
        } else {
          index2 = this.completedTasks.findIndex((t) => t.id === task.id);
          this.completedTasks[index2] = taskArchived;
        }

        console.log(error);
      }
    );
  }

  updateForm() {
    this.taskService.getTasksFromServer().subscribe(
      (tasks) => {
        console.log('Got data from service');
        this.toDoTasks = this.sortTasks(tasks.filter((t) => !t.completed));
        this.completedTasks = this.sortTasks(tasks.filter((t) => t.completed));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  sortTasks(
    tasks: Task[],
    sortBy: string = 'urgentLevel',
    sortOrderAsc: boolean = true
  ): Task[] {
    if (sortBy === 'urgentLevel') {
      tasks.sort((a, b) => {
        if (sortOrderAsc) {
          return a.urgentLevel - b.urgentLevel;
        } else {
          return b.urgentLevel - a.urgentLevel;
        }
      });
    } else {
      tasks.sort((a, b) => {
        if (sortOrderAsc) {
          return a[sortBy] - b[sortBy];
        } else {
          return b[sortBy] - a[sortBy];
        }
      });
    }
    return tasks;
  }

  onSortByUrgentLevel() {
    this.sortOrder = !this.sortOrder;
    this.toDoTasks = this.sortTasks(
      this.toDoTasks,
      'urgentLevel',
      this.sortOrder
    );
    this.completedTasks = this.sortTasks(
      this.completedTasks,
      'urgentLevel',
      this.sortOrder
    );
  }

  cancel() {
    this.isModalOpen = false;
  }
}
