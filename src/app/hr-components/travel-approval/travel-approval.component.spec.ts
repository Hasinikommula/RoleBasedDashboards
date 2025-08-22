import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelApprovalComponent } from './travel-approval.component';

describe('TravelApprovalComponent', () => {
  let component: TravelApprovalComponent;
  let fixture: ComponentFixture<TravelApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelApprovalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
