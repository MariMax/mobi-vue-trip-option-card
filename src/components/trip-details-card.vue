<template>
  <div class="horizontal-container">
    <TripOptionDetailsComponent :sections="tripSections" :gap="gapLength" :gapColor="gapColor"/>
    <TripDetailsSectionComponent
      :arriveText="arriveText"
      :departureTime="departureTime"
      :arrivalTime="arrivalTime"
      :caption="caption"
      :positiveThings="positiveThings"
      :negativeThings="negativeThings"
    />
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Emit} from 'vue-property-decorator';
import TripOptionDetailsComponent from './trip-details.vue';
import TripDetailsSectionComponent from './trip-details-section.vue';
import {ITripOption} from '../types/trip-option.interface';
import {IDetailsSection} from '../types/details-section.interface';
import {IconCross, IconCheck} from 'mobi-vue-icons';

let uniqueId = 0;

@Component({
  components: {
    TripOptionDetailsComponent,
    TripDetailsSectionComponent,
    IconCross,
    IconCheck,
  },
})
export default class TripOptionDetailsCardComponent extends Vue {
  @Prop({default: null, required: true})
  public data!: ITripOption | null;
  @Prop({default: 'Arrive'})
  public arriveText!: string;

  @Prop({
    default() {
      return `trip-option-detils-card-${uniqueId++}`;
    },
  })
  public id!: string;

  private get tripSections(): IDetailsSection[] {
    if (this.data) {
      return this.data.sections || [];
    }
    return [];
  }

  private get gapLength(): number {
    if (this.data) {
      return this.data.gapLength || 0;
    }
    return 0;
  }

  private get gapColor(): string {
    if (this.data) {
      return this.data.gapColor || '';
    }
    return '';
  }

  private get departureTime(): string {
    if (this.data) {
      return this.data.departure || '';
    }
    return '';
  }

  private get arrivalTime(): string {
    if (this.data) {
      return this.data.arrival || '';
    }
    return '';
  }
  private get caption(): string {
    if (this.data) {
      return this.data.caption || '';
    }
    return '';
  }
  private get positiveThings(): string[] {
    if (this.data) {
      return this.data.positives || [];
    }
    return [];
  }
  private get negativeThings(): string[] {
    if (this.data) {
      return this.data.negatives || [];
    }
    return [];
  }
}
</script>


<style lang="postcss" scoped>
.horizontal-container {
  width: 100%;
  overflow: hidden;
  cursor: pointer;
}
</style>