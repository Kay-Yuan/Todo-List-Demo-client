import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { TaskListItemComponent } from '../task-list-item/task-list-item.component';

import { EditTaskModelComponent } from '../edit-task-model/edit-task-model.component';
import { TaskItemComponent } from '../task-item/task-item.component';
import { DragTableComponent } from '../drag-table/drag-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CompletedTableComponent } from '../completed-table/completed-table.component';
import { TaskTableContainerComponent } from '../task-table-container/task-table-container.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    DragDropModule,
    MatCheckboxModule,

  ],
  declarations: [
    HomePage,
    TaskListItemComponent,
    EditTaskModelComponent,
    TaskItemComponent,
    DragTableComponent,
    CompletedTableComponent,
    TaskTableContainerComponent,
  ],
  exports: [TaskListItemComponent],
})
export class HomePageModule {}
