import { Component } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-edit-task-model',
  templateUrl: './edit-task-model.component.html',
  styleUrls: ['./edit-task-model.component.scss'],
})
export class EditTaskModelComponent {
  constructor(private taskService: TaskService) {}

  updateTask(task: any) {
    this.taskService.updateTask(task);
  }
}
