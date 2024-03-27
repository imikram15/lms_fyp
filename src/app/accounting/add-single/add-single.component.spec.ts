import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSingleComponent } from './add-single.component';

describe('AddSingleComponent', () => {
  let component: AddSingleComponent;
  let fixture: ComponentFixture<AddSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSingleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
