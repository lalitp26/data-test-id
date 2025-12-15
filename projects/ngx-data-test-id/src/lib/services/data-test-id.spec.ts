import { TestBed } from '@angular/core/testing';

import { DataTestId } from './data-test-id';

describe('DataTestId', () => {
  let service: DataTestId;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataTestId);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
