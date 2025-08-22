import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelRequisitionComponent } from './travelrequisition.component';

describe('TravelrequisitionComponent', () => {
  let component: TravelRequisitionComponent;
  let fixture: ComponentFixture<TravelRequisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelRequisitionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
