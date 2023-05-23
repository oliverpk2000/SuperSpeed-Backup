import { TestBed } from '@angular/core/testing';

import { LoginManagementService } from './login-management.service';

describe('LoginManagementService', () => {
  let service: LoginManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
