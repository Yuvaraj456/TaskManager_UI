import { TestBed } from '@angular/core/testing';

import AllowAnonymousService from './allow-anonymous.service';

describe('AllowAnonymousService', () => {
  let service: AllowAnonymousService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllowAnonymousService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
