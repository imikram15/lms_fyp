import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClassRoutineComponent } from './add-class-routine.component';

describe('AddClassRoutineComponent', () => {
  let component: AddClassRoutineComponent;
  let fixture: ComponentFixture<AddClassRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddClassRoutineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddClassRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
