import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { TaskItemComponent } from '../task-item/task-item.component';

import { TaskService } from '../task.service';

import { TaskListItemComponent } from './task-list-item.component';

describe('TaskListItemComponent', () => {
  let component: TaskListItemComponent;
  let fixture: ComponentFixture<TaskListItemComponent>;
  const taskSpy = jasmine.createSpyObj('TaskService', [
    'getTasksFromServer',
    'deleteTask',
    'updateTask',
    'createTask',
  ]);
  taskSpy.getTasksFromServer.and.returnValue(of([]));
  taskSpy.deleteTask.and.returnValue();
  const task = {
    id: '0bfc1e4d-c6d5-4d29-8093-4f7a549c1cb3',
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    isEdit: false,
    createdAt: Math.floor(Date.now() / 1000),
    updatedAt: Math.floor(Date.now() / 1000),
    urgentLevel: 2,
  };
  let debugElement: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListItemComponent, TaskItemComponent],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        {
          provide: TaskService,
          useValue: taskSpy,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(TaskListItemComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the task service to get the tasks', () => {
    expect(taskSpy.getTasksFromServer).toHaveBeenCalled();
  });

  it('should set the tasks property', () => {
    component.toDoTasks = [
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

    component.completedTasks = [
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

    expect(component.toDoTasks).toBeDefined();
    expect(component.completedTasks).toBeDefined();
  });

  it('should display task vaules when model open', () => {
    component.openModel(task);

    expect(component.updateTaskForm.get('title').value).toEqual(task.title);
    expect(component.updateTaskForm.get('description').value).toEqual(
      task.description
    );
    expect(component.updateTaskForm.get('urgentLevel').value).toEqual(
      task.urgentLevel.toString()
    );
  });

  it('should update the task when confirm button clicked', () => {
    component.openModel(task);
    component.updateTaskForm.get('title').setValue('Test Task 2');
    component.updateTaskForm
      .get('description')
      .setValue('Test description changed');
    component.updateTaskForm.get('urgentLevel').setValue('2');

    debugElement
      .query(By.css('[id="add-task-button"]'))
      .triggerEventHandler('click', null);

    expect(component.updateTaskForm.get('title').value).toEqual('Test Task 2');
    expect(component.updateTaskForm.get('description').value).toEqual(
      'Test description changed'
    );
    expect(component.updateTaskForm.get('urgentLevel').value).toEqual('2');
  });

  it('should delete the task from TaskList when delete button clicked', () => {
    component.deleteTaskFromTaskList(task);

    expect(component.toDoTasks).toEqual([]);
  });

  it('should delete the task from Completed when delete button clicked', () => {
    component.deleteTaskFromCompleted(task);

    expect(component.completedTasks).toEqual([]);
  });

  it('should add new task into TaskList when add button clicked', () => {
    const newTask = {
      title: 'New Task',
      description: 'New Description',
      urgentLevel: 2,
    };
    taskSpy.createTask.and.returnValue(
      of([
        {
          message: 'Task created',
          id: '1234',
          createdAt: Math.floor(Date.now() / 1000),
          updatedAt: Math.floor(Date.now() / 1000),
        },
      ])
    );
    component.addTask(newTask);

    console.log(component.toDoTasks);

    expect(
      component.toDoTasks.findIndex(
        (t) => t.id === '1234' && t.title === 'New Task'
      )
    ).toBeGreaterThan(-1);
  });
});
