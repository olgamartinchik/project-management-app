import { TestBed } from '@angular/core/testing';

import { ToggleScrollService } from './toggle-scroll.service';

describe('HiddenScrollService', () => {
  let service: ToggleScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToggleScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
