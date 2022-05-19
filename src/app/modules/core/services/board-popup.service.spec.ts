import { TestBed } from '@angular/core/testing';
import { BoardPopupService } from './board-popup.service';

describe('BoardPopupService', () => {
  let service: BoardPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
