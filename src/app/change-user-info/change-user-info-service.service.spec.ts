import { TestBed } from '@angular/core/testing';

import { ChangeUserInfoServiceService } from './change-user-info-service.service';

describe('ChangeUserInfoServiceService', () => {
  let service: ChangeUserInfoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeUserInfoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
