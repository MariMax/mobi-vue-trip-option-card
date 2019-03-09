<template>
  <div class="horizontal-container">
    <TripOptionDetailsComponent :sections="tripSections" :gap="gapLength" :gapColor="gapColor"/>
    <section class="content">
      <div class="arrival-departure">
        <span class="label">Depart </span>
        <span class="value">{{departureTime}},</span>
        <span class="label">Arrive </span>
        <span class="value">{{arrivalTime}}</span>
      </div>

      <div class="caption">{{caption}}</div>
      <div class="reasons" v-for="(p, index) in positiveThings" :key="'positive' + index">
        <IconCheck class="icon icon-positive"/>
        {{p}}
      </div>
      <div class="reasons" v-for="(n, index) in negativeThings" :key="'negative' + index">
        <IconCross class="icon icon-negative"/>
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
}

.content {
  margin: .5em 1em;
}

.label, .value {
  color: var(--black-50);
  font-size: .7em;
}

.value {
  font-weight: bold;
}

.caption {
  font-weight: bold;
  font-size: 1.1em;

}

.reasons {
  display: flex;
  align-items: center;
  font-size: .7em;
}

.icon {
  margin-right: .5em;

  &-positive {
    color: var(--positive, green);
  }
  &-negative {
    color: var(--positive, red);
  }
}

</style>