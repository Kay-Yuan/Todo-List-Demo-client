import {
  Component,
  AfterViewInit,
  ViewChild,
  Input,
  OnChanges,
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
import { Task } from '../task';

@Component({
  selector: 'app-drag-table',
  templateUrl: './drag-table.component.html',
  styleUrls: ['./drag-table.component.scss'],
})
export class DragTableComponent implements AfterViewInit, OnChanges {
  displayedColumns: string[] = [
    'checkBox',
    'title',
    'urgentLevel',
    'description',
  ];
  @Input() tasks: Task[];
  @Input() tableTitle: string;
  @Input() connectTo: string[];
  @Input() id: string;
  @Input() reload: boolean;
  @Output() selectedRowsChange = new EventEmitter<Set<Task>>();
  @Output() statusChange = new EventEmitter<Task>();
  @Output() dropChange = new EventEmitter<CdkDragDrop<Task[]>>();
  dataSource: MatTableDataSource<Task>;
  selectedRows = new Set<Task>();
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource();
  }

  ngOnChanges() {
    this.dataSource.data = this.tasks;
    console.log(this.tasks);
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
    this.dataSource.data = event.container.data;
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
    console.log('workd');
    console.log('toggle task id = ' + task.id + ' task title = ' + task.title);
    task.completed = !task.completed;
    this.dataSource.data = this.dataSource.data.filter((t) => t.id !== task.id);
    this.statusChange.emit(task);

    //update task status
    // this.updateTaskStatus(task);
  }
}
