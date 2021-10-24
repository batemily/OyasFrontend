import {TestBed} from '@angular/core/testing';

import {AddCapteurService} from './add-capteur.service';

describe('AddCapteurService', () => {
  let service: AddCapteurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddCapteurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
