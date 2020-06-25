import { TestBed } from '@angular/core/testing';

import { IdGeneratorService } from './id-generator.service';

describe('IdGeneratorService', () => {
  let service: IdGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return proper value 10 times', () => {

    for (let i; i < 10; i++) {
      var uniqueId: string = service.generateUniqueId();
      var num1: number = parseInt(uniqueId.substring(0, 2))
      var num2: number = parseInt(uniqueId.substring(3, 5))
      var fibo: number = parseInt(uniqueId.substring(6))

      expect((num1 - num2)).toEqual(fibo);
    }
  });
});
