import Vue, {VueConstructor} from 'vue';

export interface IDetailsSection {
  color: string;
  length: number;
  label: string;
  offsetLabel: string;
  icon: VueConstructor<Vue>;
}
