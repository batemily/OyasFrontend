import {TestBed} from '@angular/core/testing';

import {RecoverpwUserService} from './recoverpw-user.service';

describe('RecoverpwUserService', () => {
  let service: RecoverpwUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecoverpwUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
