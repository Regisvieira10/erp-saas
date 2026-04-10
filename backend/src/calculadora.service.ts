import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculadoraService {
  somar(a: number, b: number): number {
    return a + b;
  }

  subtrair(a: number, b: number): number {
    return a - b;
  }

  multiplicar(a: number, b: number): number {
    return a * b;
  }

  dividir(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Divisao por zero');
    }
    return a / b;
  }
}
