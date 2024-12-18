import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMarksComponent } from './view-marks.component';

describe('ViewMarksComponent', () => {
  let component: ViewMarksComponent;
  let fixture: ComponentFixture<ViewMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewMarksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
