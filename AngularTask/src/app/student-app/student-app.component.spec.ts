import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAppComponent } from './student-app.component';

describe('StudentAppComponent', () => {
  let component: StudentAppComponent;
  let fixture: ComponentFixture<StudentAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
