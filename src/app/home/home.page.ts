import { Component, Output } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [TaskService],
})
export class HomePage {
  @Output() tasks: Task[];
  @Output() completedTasks: Task[];
}
