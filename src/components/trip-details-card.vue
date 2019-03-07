<template>
  <div class="horizontal-container">

  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Emit} from 'vue-property-decorator';
import { IDetailsSection } from '..';

let uniqueId = 0;

@Component({
  components: {

  },
})
export default class TripOptionDetailsCardComponent extends Vue {
  public $refs!: {
    container: HTMLDivElement;
  };

  @Prop({default: []})
  public sections!: IDetailsSection[];

  @Prop({default: 10})
  public gap!: number;

  @Prop({default: 'gray'})
  public gapColor!: string;

  @Prop({default: 0})
  public maxWidth!: number;

  @Prop({default() {
    return Math.random();
  }})
  public updateTrigger!: number;

  @Prop({
    default() {
      return `trip-option-detils-card-${uniqueId++}`;
    },
  })
  public id!: string;
  private isReady: boolean = false;



  public mounted() {
    this.isReady = true;
  }

  private get isValid(): boolean {
    return this.sections.length > 0;
  }
}
</script>


<style lang="postcss" scoped>
.horizontal-container {
  width: 100%;
  overflow: hidden;
  padding: 1em;
}
</style>