import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDesignationsComponent } from './add-designations.component';

describe('AddDesignationsComponent', () => {
  let component: AddDesignationsComponent;
  let fixture: ComponentFixture<AddDesignationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDesignationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDesignationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
