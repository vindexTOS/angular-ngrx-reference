import { TestBed } from '@angular/core/testing';

import { RefenceService } from './refence.service';

describe('RefenceService', () => {
  let service: RefenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
