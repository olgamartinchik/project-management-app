import { TestBed } from '@angular/core/testing';

import { HttpBoardsService } from './http-boards.service';

describe('HttpBoardsService', () => {
  let service: HttpBoardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpBoardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
