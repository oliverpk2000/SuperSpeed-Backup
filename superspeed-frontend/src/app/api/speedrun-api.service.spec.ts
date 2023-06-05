import { TestBed } from '@angular/core/testing';

import { SpeedrunApiService } from './speedrun-api.service';

describe('ContentApiService', () => {
  let service: SpeedrunApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeedrunApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
