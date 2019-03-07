import Vue, {VueConstructor} from 'vue';

export interface IDetailsSection {
  color: string;
  length: number;
  icon: VueConstructor<Vue> | null;
}
