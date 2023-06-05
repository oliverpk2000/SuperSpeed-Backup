import { TestBed } from '@angular/core/testing';

import { RunnerApiService } from './runner-api.service';

describe('RunnerApiService', () => {
  let service: RunnerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RunnerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
