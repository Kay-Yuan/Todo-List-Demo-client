import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { MatIconModule } from '@angular/material/icon';

import { HomePageRoutingModule } from './home-routing.module';

import { DragTableComponent } from '../drag-table/drag-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CompletedTableComponent } from '../completed-table/completed-table.component';
import { TaskTableContainerComponent } from '../task-table-container/task-table-container.component';
import { CdkTableModule } from '@angular/cdk/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
    CdkTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [
    HomePage,
    DragTableComponent,
    CompletedTableComponent,
    TaskTableContainerComponent,
  ],
  exports: [TaskTableContainerComponent],
})
export class HomePageModule {}
