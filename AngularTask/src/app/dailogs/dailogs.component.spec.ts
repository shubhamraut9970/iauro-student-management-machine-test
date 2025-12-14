import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailogsComponent } from './dailogs.component';

describe('DailogsComponent', () => {
  let component: DailogsComponent;
  let fixture: ComponentFixture<DailogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
