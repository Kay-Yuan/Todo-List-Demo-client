import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../task';

@Component({
  selector: 'app-completed-table',
  templateUrl: './completed-table.component.html',
  styleUrls: ['./completed-table.component.scss'],
})
export class CompletedTableComponent implements AfterViewInit, OnChanges {
  displayedColumns: string[] = [
    'checkBox',
    'title',
    'urgentLevel',
    'description',
    'updatedAt',
  ];
  @Input() tasks: Task[];
  @Input() connectTo: string[];
  @Input() id: string;
  @Output() selectedRowsChange = new EventEmitter<Set<Task>>();
  dataSource: MatTableDataSource<Task>;
  selectedRows = new Set<Task>();
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    // this.tasks = [
    //   {
    //     id: '6a39ad61-1d06-4293-9abb-dffda379e489',
    //     title: 'Task 1',
    //     isEdit: false,
    //     urgentLevel: 1,
    //     description: 'Description 1',
    //     completed: true,
    //     updatedAt: Math.floor(Date.now() / 1000),
    //     createdAt: Math.floor(Date.now() / 1000),
    //   },
    //   {
    //     id: '6a39ad61-1d06-4293-9abb-dffda379e489',
    //     isEdit: false,
    //     title: 'Task 2',
    //     urgentLevel: 2,
    //     description: 'Description 2',
    //     completed: true,
    //     updatedAt: Math.floor(new Date(2020, 5, 0).valueOf() / 1000),
    //     createdAt: Math.floor(new Date(2020, 5, 0).getTime() / 1000),
    //   },
    //   {
    //     id: '6a39ad61-1d06-4293-9abb-dffda379e489',
    //     isEdit: false,
    //     title: 'Task 3',
    //     urgentLevel: 3,
    //     description: 'Description 3',
    //     completed: true,
    //     updatedAt: Math.floor(new Date(2022, 7, 16).getTime() / 1000),
    //     createdAt: Math.floor(Date.now() / 1000),
    //   },
    // ];
    this.dataSource = new MatTableDataSource();
  }

  ngOnChanges() {
    this.dataSource.data = this.tasks;
    console.log('onChanges');
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
    this.dataSource.data = this.tasks;
    console.log(this.dataSource.data);
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
}
