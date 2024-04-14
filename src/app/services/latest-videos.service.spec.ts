import { TestBed } from '@angular/core/testing';

import { LatestVideosService } from './latest-videos.service';

describe('LatestVideosService', () => {
  let service: LatestVideosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LatestVideosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
