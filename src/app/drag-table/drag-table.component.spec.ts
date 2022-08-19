import { DragDropModule } from '@angular/cdk/drag-drop';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { TaskService } from '../task.service';

import { DragTableComponent } from './drag-table.component';

describe('DragTableComponent', () => {
  let component: DragTableComponent;
  let fixture: ComponentFixture<DragTableComponent>;
  const taskSpy = jasmine.createSpyObj('TaskService', [
    'getTasksFromServer',
    'getTasks',
    'createTask',
    'updateTask',
    'deleteTask',
    'sortTasks',
    'handleError',
  ]);
  taskSpy.getTasksFromServer.and.returnValue(of([]));

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DragTableComponent],
      imports: [
        IonicModule.forRoot(),
        MatTableModule,
        MatSortModule,
        DragDropModule,
        MatCheckboxModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: TaskService,
          useValue: taskSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DragTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
