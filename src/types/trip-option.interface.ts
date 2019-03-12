
import { IDetailsSection } from './details-section.interface';

export interface ITripOption {
  id: string;
  sections: IDetailsSection[];
  gapLength: number;
  gapColor: string;
  departure: string;
  arrival: string;
  caption: string;
  positives: string[];
  negatives: string[];
}
