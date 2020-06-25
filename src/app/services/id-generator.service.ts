import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService {

  private fibunacciNumbers: number[] = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610];

  constructor() { }

  generateUniqueId() {
    let fiboNum = this.fibunacciNumbers[Math.floor(Math.random() * this.fibunacciNumbers.length)];

    let randomFirst = Math.floor(Math.random() * (900 - fiboNum)) + (fiboNum + 100);
    let second = randomFirst - fiboNum;

    return parseInt(randomFirst.toString() + second.toString() + fiboNum.toString());
  }
}
