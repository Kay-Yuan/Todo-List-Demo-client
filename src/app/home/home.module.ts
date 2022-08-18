import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { TaskListItemComponent } from '../task-list-item/task-list-item.component';

import { EditTaskModelComponent } from '../edit-task-model/edit-task-model.component';
import { TaskItemComponent } from '../task-item/task-item.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    HomePage,
    TaskListItemComponent,
    EditTaskModelComponent,
    TaskItemComponent,
  ],
  exports: [TaskListItemComponent],
})
export class HomePageModule {}
