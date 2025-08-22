import { TestBed } from '@angular/core/testing';

// Update the import path below to the correct location of profile.service
import { ProfileService } from './profile.service';

describe('ProfileDataService', () => {
  let service: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
