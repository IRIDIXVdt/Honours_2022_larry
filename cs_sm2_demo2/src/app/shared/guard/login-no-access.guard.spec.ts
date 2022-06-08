import { TestBed } from '@angular/core/testing';

import { LoginNoAccessGuard } from './login-no-access.guard';

describe('LoginNoAccessGuard', () => {
  let guard: LoginNoAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginNoAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
