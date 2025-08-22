import { TestBed } from '@angular/core/testing';

import { HRserviceService } from './hrservice.service';

describe('HRserviceService', () => {
  let service: HRserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HRserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
