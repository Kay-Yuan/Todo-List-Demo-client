import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
// import { of } from 'rxjs';
import { TaskTableContainerComponent } from '../task-table-container/task-table-container.component';
// import { TaskService } from '../task.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  // const taskSpy = jasmine.createSpyObj('TaskService', [
  //   'getTasksFromServer',
  //   'getTasks',
  //   'createTask',
  //   'updateTask',
  //   'deleteTask',
  //   'sortTasks',
  //   'handleError',
  // ]);
  // taskSpy.getTasksFromServer.and.returnValue(of([]));

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage, TaskTableContainerComponent],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      // providers: [
      //   {
      //     provide: TaskService,
      //     useValue: taskSpy,
      //   },
      // ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
