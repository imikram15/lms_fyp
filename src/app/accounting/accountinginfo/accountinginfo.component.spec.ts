import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountinginfoComponent } from './accountinginfo.component';

describe('AccountinginfoComponent', () => {
  let component: AccountinginfoComponent;
  let fixture: ComponentFixture<AccountinginfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountinginfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountinginfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
