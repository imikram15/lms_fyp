import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromtionsComponent } from './promtions.component';

describe('PromtionsComponent', () => {
  let component: PromtionsComponent;
  let fixture: ComponentFixture<PromtionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromtionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromtionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
