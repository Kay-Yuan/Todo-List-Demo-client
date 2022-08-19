import {
  Component,
  AfterViewInit,
  ViewChild,
  Input,
  DoCheck,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { PreTask, Task } from '../task';
import { Column, COLUMNS_SCHEMA } from '../table';
import { TaskService } from '../task.service';
import { CreateTaskResponse } from '../api-response';

@Component({
  selector: 'app-drag-table',
  templateUrl: './drag-table.component.html',
  styleUrls: ['./drag-table.component.scss'],
})
export class DragTableComponent implements AfterViewInit, DoCheck {
  displayedColumns: string[] = [
    'status',
    'title',
    'urgentLevel',
    'description',
    'operation',
  ];
  columnsSchema: Column[] = COLUMNS_SCHEMA;
  @Input() tasks: Task[];
  @Input() tableTitle: string;
  @Input() connectTo: string[];
  @Input() id: string;
  @Input() reload: boolean;
  @Output() selectedRowsChange = new EventEmitter<Set<Task>>();
  @Output() statusChange = new EventEmitter<Task>();
  @Output() dropChange = new EventEmitter<CdkDragDrop<Task[]>>();
  @Output() addNewTask = new EventEmitter<Task>();
  dataSource: MatTableDataSource<Task>;
  beforeEditTask: Task[] = [];

  selectedRows = new Set<Task>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(private taskService: TaskService) {
    this.dataSource = new MatTableDataSource();
  }

  ngDoCheck() {
    this.dataSource.data = this.tasks;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  drop(event: CdkDragDrop<Task[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.dropChange.emit(event);
  }

  onSortChange(sort: Sort) {
    console.log(sort);
  }

  toggleRow(row: Task) {
    if (this.selectedRows.has(row)) {
      this.selectedRows.delete(row);
    } else {
      this.selectedRows.add(row);
    }

    this.selectedRowsChange.emit(this.selectedRows);
  }

  onTaskStatusChange(task: Task) {
    console.log('toggle task id = ' + task.id + ' task title = ' + task.title);
    this.dataSource.data = this.dataSource.data.filter((t) => t.id !== task.id);
    this.statusChange.emit(task);
  }

  onAddNewTask() {
    // this.addNewTask.emit({
    //   id: '1',
    //   title: 'Title',
    //   urgentLevel: parseInt(this.id.match(/\d+/)[0], 10),
    //   description: '',
    //   completed: false,
    //   updatedAt: Math.floor(Date.now() / 1000),
    //   createdAt: Math.floor(Date.now() / 1000),
    //   isEdit: true,
    // });
    this.dataSource.data.push({
      id: '1',
      title: '',
      urgentLevel: parseInt(this.id.match(/\d+/)[0], 10),
      description: '',
      completed: false,
      updatedAt: Math.floor(Date.now() / 1000),
      createdAt: Math.floor(Date.now() / 1000),
      isEdit: true,
    });
  }

  onConfirm(task: Task) {
    task.isEdit = !task.isEdit;
    if (task.id === '1') {
      // add new task
      const newTask: PreTask = {
        title: task.title,
        urgentLevel: task.urgentLevel,
        description: task.description,
      };
      this.taskService
        .createTask(newTask)
        .subscribe((res: CreateTaskResponse) => {
          if (res.message === 'Task created') {
            task.id = res.id;
            task.completed = false;
            task.createdAt = res.createdAt;
            task.updatedAt = res.updatedAt;
            const index = this.dataSource.data.findIndex(
              (t) => t.title === task.title
            );
            this.dataSource.data[index] = task;
          }
        });
    } else {
      //update database
      this.taskService.updateTask(task).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onCancel(task: Task) {
    task.isEdit = !task.isEdit;
    if (task.id !== '1') {
      console.log('onCancel');
      const index = this.beforeEditTask.findIndex((t) => t.id === task.id);
      const index2 = this.dataSource.data.findIndex((t) => t.id === task.id);
      this.dataSource.data[index2].title = this.beforeEditTask[index].title;
      this.dataSource.data[index2].urgentLevel =
        this.beforeEditTask[index].urgentLevel;
      this.dataSource.data[index2].description =
        this.beforeEditTask[index].description;
      this.beforeEditTask.splice(index, 1);
    } else {
      const index = this.dataSource.data.findIndex((t) => t.id === task.id);
      this.dataSource.data.splice(index, 1);
    }
  }

  onEdit(task: Task) {
    console.log('onUpdate');
    this.beforeEditTask.push(JSON.parse(JSON.stringify(task)));
    task.isEdit = !task.isEdit;
  }

  onClose(task: Task) {
    const index = this.dataSource.data.findIndex((t) => t.id === task.id);
    if (task.id === '1') {
      this.dataSource.data.splice(index, 1);
    } else {
      this.dataSource.data[index].isEdit = !task.isEdit;
    }
  }

  onDelete(task: Task) {
    const index = this.dataSource.data.findIndex((t) => t.id === task.id);
    this.dataSource.data.splice(index, 1);

    // call api to delete task
    this.taskService.deleteTask(task);
  }

  // onEdit(task: Task) {
  //   const index = this.dataSource.data.findIndex((t) => t.id === task.id);
  //   this.dataSource.data[index].isEdit = !task.isEdit;
  // }

  inputHandler(e: any, id: number, key: string) {
    console.log(e);
    console.log('id = ' + id + ' key = ' + key);
  }

  validateNewTask(task: Task) {
    if (task.title === '') {
      return true;
    } else {
      return false;
    }
  }
}
