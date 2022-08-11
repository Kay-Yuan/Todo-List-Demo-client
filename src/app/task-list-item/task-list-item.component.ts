import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

import { IonModal, isPlatform, ModalController } from '@ionic/angular';
import { EditTaskModelComponent } from '../edit-task-model/edit-task-model.component';
import { OverlayEventDetail } from '@ionic/core/components';
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

  updateTaskForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    urgentLevel: new FormControl(''),
    id: new FormControl(''),
  });

  message =
    'This modal example uses the modalController to present and dismiss modals.';
  name: string;

  constructor(
    private taskService: TaskService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.updateForm();
  }

  addTask(task: any) {
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

    // this.taskService.createTask(task);
    // console.log('Task added');
    // this.toDoTasks = this.taskService.getTasks().filter((t) => !t.completed);
  }

  toggleTask(task: Task) {
    console.log('toggle task id = ' + task.id + ' task title = ' + task.title);
    task.completed = !task.completed;
    this.toDoTasks = this.toDoTasks.filter((t) => t.id !== task.id);
    this.completedTasks.push(task);
    this.completedTasks = this.sortTasks(this.completedTasks);

    //update task status
    this.taskService.toggleTask(task);
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
    this.taskService.toggleTask(task);
  }

  // addTaskIntoCompleted(task: Task) {
  //   this.completedTasks.push(task);
  //   this.taskService.sortTasks(this.completedTasks);
  // }

  // addTaskIntoTasks(task: Task) {
  //   this.toDoTasks.push(task);
  //   this.taskService.sortTasks(this.tasks);
  // }

  deleteTaskFromTaskList(task: Task) {
    this.taskService.deleteTask(task);
    // this.tasks = this.taskService.getTasks();
    this.toDoTasks = this.toDoTasks.filter((t) => t.id !== task?.id);
  }

  deleteTaskFromCompleted(task: Task) {
    this.taskService.deleteTask(task);
    // this.completedTasks = this.taskService.getCompletedTasks();
    this.completedTasks = this.completedTasks.filter((t) => t.id !== task?.id);
  }

  openModel(task: Task) {
    console.log(task);
    this.updateTaskForm.setValue({
      title: task.title,
      description: task.description,
      urgentLevel: task.urgentLevel.toString(),
      id: task.id,
    });
    this.isModalOpen = true;
    console.log('Task updated');
  }

  updateTask(updateTaskForm: any) {
    this.taskService.updateTask(updateTaskForm.value).subscribe(
      (response) => {
        let index = this.toDoTasks.findIndex(
          (t) => t.id === updateTaskForm.value.id
        );
        if (index !== -1) {
          this.toDoTasks[index].title = updateTaskForm.value.title;
          this.toDoTasks[index].description = updateTaskForm.value.description;
          this.toDoTasks[index].urgentLevel = updateTaskForm.value.urgentLevel;
          console.log(this.toDoTasks[index]);
        } else {
          index = this.completedTasks.findIndex(
            (t) => t.id === updateTaskForm.value.id
          );
          if (index !== -1) {
            this.completedTasks[index].title = updateTaskForm.value.title;
            this.completedTasks[index].description =
              updateTaskForm.value.description;
            this.completedTasks[index].urgentLevel =
              updateTaskForm.value.urgentLevel;
            console.log(this.completedTasks[index]);
          }
        }
        console.log(response);
        this.isModalOpen = false;
        this.updateTaskForm.reset();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateForm() {
    this.taskService.getTasksFromServer().subscribe(
      (tasks) => {
        console.log('Got data from service');
        this.toDoTasks = tasks.filter((t) => !t.completed);
        this.completedTasks = tasks.filter((t) => t.completed);
      },
      (error) => {
        console.log(error);
      }
    );

    // const tasks = this.taskService.getTasks();
    // this.toDoTasks = tasks.filter((t) => !t.completed);
    // this.completedTasks = tasks.filter((t) => t.completed);
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

  // async updateTask(task: Task) {
  //   const modal = await this.modalCtrl.create({
  //     component: EditTaskModelComponent,
  //   });
  //   modal.present();

  //   const { data, role } = await modal.onWillDismiss();

  //   if (role === 'confirm') {
  //     this.message = `Hello, ${data}!`;
  //   }
  // }

  // cancel() {
  //   this.modal.dismiss(null, 'cancel');
  //   console.log('isModalOpen is ' + this.isModalOpen);
  // }

  // confirm() {
  //   this.modal.dismiss(null, 'confirm');
  // }

  // onWillDismiss(event: Event) {
  //   const ev = event as CustomEvent<OverlayEventDetail<string>>;
  //   if (ev.detail.role === 'confirm') {
  //     this.message = `Hello, ${ev.detail.data}!`;
  //   }
  // }

  cancel() {
    this.isModalOpen = false;
  }

  // confirm() {
  //   this.isModalOpen = false;
  // }
}
