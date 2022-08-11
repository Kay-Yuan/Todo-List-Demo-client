import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-edit-task-model',
  templateUrl: './edit-task-model.component.html',
  styleUrls: ['./edit-task-model.component.scss'],
})
export class EditTaskModelComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  ngOnInit() {}
  updateTask(task: any) {
    this.taskService.updateTask(task);
  }
}
