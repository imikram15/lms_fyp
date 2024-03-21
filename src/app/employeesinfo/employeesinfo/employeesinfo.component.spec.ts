import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesinfoComponent } from './employeesinfo.component';

describe('EmployeesinfoComponent', () => {
  let component: EmployeesinfoComponent;
  let fixture: ComponentFixture<EmployeesinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeesinfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeesinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
