import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFeeManagerComponent } from './student-fee-manager.component';

describe('StudentFeeManagerComponent', () => {
  let component: StudentFeeManagerComponent;
  let fixture: ComponentFixture<StudentFeeManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentFeeManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentFeeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
