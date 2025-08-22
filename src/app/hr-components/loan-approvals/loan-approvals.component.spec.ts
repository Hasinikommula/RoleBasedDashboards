import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanApprovalsComponent } from './loan-approvals.component';

describe('LoanApprovalsComponent', () => {
  let component: LoanApprovalsComponent;
  let fixture: ComponentFixture<LoanApprovalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanApprovalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
