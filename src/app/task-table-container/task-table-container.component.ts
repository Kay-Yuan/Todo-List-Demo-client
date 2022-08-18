import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, QueryList } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-table-container',
  templateUrl: './task-table-container.component.html',
  styleUrls: ['./task-table-container.component.scss'],
})
export class TaskTableContainerComponent {
  displayedColumns: string[] = [
    'checkBox',
    'title',
    'urgentLevel',
    'description',
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
        // this.toDoTasks = this.sortTasks(tasks.filter((t) => !t.completed));
        this.tasks = tasks;
        this.p1Task = tasks.filter((t) => t.urgentLevel === 1);
        this.p2Task = tasks.filter((t) => t.urgentLevel === 2);
        this.p3Task = tasks.filter((t) => t.urgentLevel === 3);
        this.completedTask = tasks.filter((t) => t.completed);
        // console.log(this.p1Task);
        // console.log(this.p2Task);
        // console.log(this.p3Task);
      },

      (error) => {
        console.log(error);
      }
    );
  }

  drop(event: CdkDragDrop<Task[]>) {
    console.log(event);
    // console.log(this.p1Task);
    // console.log(this.p2Task);
    // console.log(this.p3Task);
    if (event.previousContainer !== event.container) {
      switch (event.previousContainer.id) {
        case 'p1':
          break;
        case 'p2':
          break;
        case 'p3':
          break;
        case 'completed':
          break;
      }
    }
  }

  // ngOnAfterViewInit() {
  //   let ldls: CdkDropList[] = [];

  //   this.dlq.forEach((dl) => {
  //     console.log('found DropList ' + dl.id);
  //     ldls.push(dl);
  //   });

  //   ldls = ldls.reverse();

  //   asapScheduler.schedule(() => {
  //     this.dls = ldls;
  //   });
  // }

  onSelectedRowsChange(selectedRows: Set<Task>) {
    this.selectedRows = new Set<Task>([...selectedRows, ...this.selectedRows]);
    console.log(this.selectedRows);
  }

  onStatusChange(task: Task) {
    console.log('hello');
    switch (task.urgentLevel) {
      case 1:
        this.p1Task = this.p1Task.filter((t) => t.id !== task.id);
        break;
      case 2:
        this.p1Task = this.p1Task.filter((t) => t.id !== task.id);
        break;
      case 3:
        this.p1Task = this.p1Task.filter((t) => t.id !== task.id);
        break;
    }

    this.completedTask.push(task);
  }

  onAdd() {
    this.completedTask.push({
      id: '1',
      isEdit: false,
      title: 'New Task',
      description: 'New Task',
      urgentLevel: 1,
      completed: false,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: Math.floor(Date.now() / 1000),
    });
  }
}
