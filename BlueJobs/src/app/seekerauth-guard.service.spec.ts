import { TestBed } from '@angular/core/testing';

import { SeekerauthGuardService } from './seekerauth-guard.service';

describe('SeekerauthGuardService', () => {
  let service: SeekerauthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeekerauthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
