import Vue, {VueConstructor} from 'vue';

export interface IDetailsSection {
  minWidth: string;
  maxWidth: string;
  id: string;
  color: string;
  length: string;
  icon: VueConstructor<Vue> | null;
}
