import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() task: Task;

  @Output() openModel = new EventEmitter();
  @Output() toggleTask = new EventEmitter();
  @Output() unToggleTask = new EventEmitter();
  @Output() deleteTaskFromTaskList = new EventEmitter();
  @Output() deleteTaskFromCompleted = new EventEmitter();

  constructor() {
    //ss
  }

  onOpenModel(task: Task) {
    this.openModel.emit(task);
  }

  onToggleTask(task: Task) {
    this.toggleTask.emit(task);
  }

  onUnToggleTask(task: Task) {
    this.unToggleTask.emit(task);
  }

  onDeleteTaskFromTaskList(task: Task) {
    this.deleteTaskFromTaskList.emit(task);
  }

  onDeleteTaskFromCompleted(task: Task) {
    this.deleteTaskFromCompleted.emit(task);
  }
}
