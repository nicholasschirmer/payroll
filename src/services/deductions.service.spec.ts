import { TestBed } from '@angular/core/testing';

import { DeductionsService } from './deductions.service';

describe('ExpensesService', () => {
  let service: DeductionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeductionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
