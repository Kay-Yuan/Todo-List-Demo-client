import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TaskService } from '../task.service';
import { of } from 'rxjs';

import { EditTaskModelComponent } from './edit-task-model.component';
import { FormsModule } from '@angular/forms';

describe('EditTaskModelComponent', () => {
  let component: EditTaskModelComponent;
  let fixture: ComponentFixture<EditTaskModelComponent>;
  const taskSpy = jasmine.createSpyObj('TaskService', ['getTasksFromServer']);
  taskSpy.getTasksFromServer.and.returnValue(of([]));

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditTaskModelComponent],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        {
          provide: TaskService,
          useValue: taskSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTaskModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
