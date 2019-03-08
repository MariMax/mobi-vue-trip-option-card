<template>
  <div class="horizontal-container">
    <TripOptionDetailsComponent :sections="tripSections" :gap="gapLength" :gapColor="gapColor"/>
    <section class="content">
      <div class="arrival-departure">
        <span class="label">Depart</span>
        <span class="value">{{departureTime}},</span>
        <span class="label">Arrive</span>
        <span class="value">{{arrivalTime}}</span>
      </div>

      <div class="caption">{{caption}}</div>
      <div class="positives" v-for="(p, index) in positiveThings" :key="'positive' + index">
        <IconCheck/>
        {{p}}
      </div>
      <div class="negatives" v-for="(n, index) in negativeThings" :key="'negative' + index">
        <IconCross/>
        {{n}}
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Emit} from 'vue-property-decorator';
import TripOptionDetailsComponent from './trip-details.vue';
import {ITripOption} from '../types/trip-option.interface';
import {IDetailsSection} from '../types/details-section.interface';
import {IconCross, IconCheck} from 'mobi-vue-icons';

let uniqueId = 0;

@Component({
  components: {
    TripOptionDetailsComponent,
    IconCross,
    IconCheck,
  },
})
export default class TripOptionDetailsCardComponent extends Vue {
  @Prop({default: null, required: true})
  public data!: ITripOption | null;

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
  padding: 1em;
}
</style>