import { TestBed } from '@angular/core/testing';

import { EmployeeFirebaseService } from './employee-firebase.service';

describe('EmployeeFirebaseService', () => {
  let service: EmployeeFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
