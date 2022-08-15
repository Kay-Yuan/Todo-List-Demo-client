import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
// import 'rxjs/add/observable/from';
import { Task } from '../task';

import { TaskService } from '../task.service';

import { TaskListItemComponent } from './task-list-item.component';

describe('TaskListItemComponent', () => {
  let component: TaskListItemComponent;
  let fixture: ComponentFixture<TaskListItemComponent>;
  let taskService: TaskService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListItemComponent],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        {
          provide: TaskService,
          useValue: jasmine.createSpyObj('TaskService', ['getTasksFromServer']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListItemComponent);
    taskService = new TaskService(null);
    // component = fixture.componentInstance;
    component = new TaskListItemComponent(taskService);
    fixture.detectChanges();
  }));

  // it('should create a form with 4 controls', () => {
  //   expect(component.updateTaskForm.contains('title')).toBeTruthy();
  //   expect(component.updateTaskForm.contains('description')).toBeTruthy();
  //   expect(component.updateTaskForm.contains('urgentLevel')).toBeTruthy();
  //   expect(component.updateTaskForm.contains('id')).toBeTruthy();
  // });

  // it('#getTasksFromServer should return value from a fake object', () => {});

  it('should create', () => {
    // const taskService = TestBed.inject(TaskService);
    // taskService.getTasksFromServer.and.returnValue(
    //   of([
    //     {
    //       id: '6f7f31bf-4420-4c65-81a2-70d8c07a2465',
    //       title: 'Task 1',
    //       description: 'Task 1 description',
    //       urgentLevel: 1,
    //       completed: false,
    //       createdAt: Math.floor(Date.now() / 1000),
    //       updatedAt: Math.floor(Date.now() / 1000),
    //     },
    //   ] as Task[])
    // );
    spyOn(taskService, 'getTasksFromServer').and.callFake(() =>
      of([
        {
          id: '6f7f31bf-4420-4c65-81a2-70d8c07a2465',
          title: 'Task 1',
          description: 'Task 1 description',
          urgentLevel: 1,
          completed: false,
          createdAt: Math.floor(Date.now() / 1000),
          updatedAt: Math.floor(Date.now() / 1000),
        },
      ] as Task[])
    );

    component.ngOnInit();

    expect(component).toBeTruthy();
  });
});
