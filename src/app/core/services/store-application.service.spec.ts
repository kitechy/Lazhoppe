import { TestBed } from '@angular/core/testing';

import { StoreApplicationService } from './store-application.service';

describe('StoreApplicationService', () => {
  let service: StoreApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
