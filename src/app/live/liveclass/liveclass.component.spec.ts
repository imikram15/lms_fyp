import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveclassComponent } from './liveclass.component';

describe('LiveclassComponent', () => {
  let component: LiveclassComponent;
  let fixture: ComponentFixture<LiveclassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LiveclassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiveclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
