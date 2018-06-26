import { TestBed, inject } from '@angular/core/testing';

import { XcentricService } from './xcentric.service';

describe('XcentricService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [XcentricService]
    });
  });

  it('should be created', inject([XcentricService], (service: XcentricService) => {
    expect(service).toBeTruthy();
  }));
});
