import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivesettingComponent } from './livesetting.component';

describe('LivesettingComponent', () => {
  let component: LivesettingComponent;
  let fixture: ComponentFixture<LivesettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LivesettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LivesettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
