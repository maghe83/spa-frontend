import { TestBed } from '@angular/core/testing';

import { KistlerService } from './kistler.service';

describe('KistlerService', () => {
  let service: KistlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KistlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
