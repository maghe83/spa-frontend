import { Outcome } from './outcome';

export interface Weight {
  timestamp: number;
  outcome: Outcome;
  plate: string;
  weight: number;
}
