import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { CompletedTableComponent } from '../completed-table/completed-table.component';
import { DragTableComponent } from '../drag-table/drag-table.component';
import { TaskService } from '../task.service';

import { TaskTableContainerComponent } from './task-table-container.component';

describe('TaskTableContainerComponent', () => {
  let component: TaskTableContainerComponent;
  let fixture: ComponentFixture<TaskTableContainerComponent>;
  const taskSpy = jasmine.createSpyObj('TaskService', ['getTasksFromServer']);
  taskSpy.getTasksFromServer.and.returnValue(of([]));

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TaskTableContainerComponent,
        DragTableComponent,
        CompletedTableComponent,
      ],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: TaskService,
          useValue: taskSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskTableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the task service to get the tasks', () => {
    expect(taskSpy.getTasksFromServer).toHaveBeenCalled();
  });

  it('should set the tasks property', () => {
    component.tasks = [
      {
        id: '0bfc1e4d-c6d5-4d29-8093-4f7a549c1cb3',
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
        isEdit: false,
        createdAt: Math.floor(Date.now() / 1000),
        updatedAt: Math.floor(Date.now() / 1000),
        urgentLevel: 2,
      },
    ];

    // component.completedTasks = [
    //   {
    //     id: '0bfc1e4d-c6d5-4d29-8093-4f7a549c1cb3',
    //     title: 'Test Task',
    //     description: 'Test Description',
    //     completed: false,
    //     isEdit: false,
    //     createdAt: Math.floor(Date.now() / 1000),
    //     updatedAt: Math.floor(Date.now() / 1000),
    //     urgentLevel: 2,
    //   },
    // ];

    expect(component.tasks).toBeDefined();
    // expect(component.completedTasks).toBeDefined();
  });

  it('should display task vaules when model open', () => {
    //
  });

  it('should update the task when confirm button clicked', () => {
    //
  });
});
