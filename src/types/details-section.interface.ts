import Vue, {VueConstructor} from 'vue';

export interface IDetailsSection {
  id: string;
  color: string;
  length: string;
  icon: VueConstructor<Vue> | null;
}
