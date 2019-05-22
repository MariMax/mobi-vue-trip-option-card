<template>
  <section class="content">
    <div class="arrival-departure">
      <span class="label">Depart&nbsp;</span>
      <span class="value">{{departureTime}},</span>
      <span class="label">{{arriveText}}&nbsp;</span>
      <span class="value">{{arrivalTime}}</span>
    </div>

    <div class="caption">{{caption}}</div>
    <div class="reasons" v-for="p in positiveThings" :key="p">
      <IconCheck class="icon icon-positive"/>
      {{p}}
    </div>
    <div class="reasons" v-for="n in negativeThings" :key="n">
      <IconCross class="icon icon-negative"/>
      {{n}}
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Prop, Vue, Emit} from 'vue-property-decorator';
import {IconCross, IconCheck} from 'mobi-vue-icons';
import {ITripDetailsSection} from '../types/trip-details-section.interface';

let uniqueId = 0;

@Component({
  components: {
    IconCross,
    IconCheck,
  },
})
export default class TripDetailsSectionComponent extends Vue implements ITripDetailsSection {
  @Prop({default: '', required: true})
  public departureTime!: string;
  @Prop({default: '', required: true})
  public arrivalTime!: string;
  @Prop({default: '', required: true})
  public positiveThings!: string[];
  @Prop({default: '', required: true})
  public negativeThings!: string[];
  @Prop({default: '', required: true})
  public caption!: string[];
  @Prop({default: 'Arrive'})
  public arriveText!: string;

  @Prop({
    default() {
      return `trip-detils-section-${uniqueId++}`;
    },
  })
  public id!: string;
}
</script>


<style lang="postcss" scoped>
.content {
  margin: 0.5em 1em;
  padding-bottom: 1em;
}

.label,
.value {
  color: var(--black-50);
  font-size: 0.7em;
}

.value {
  font-weight: bold;
}

.caption {
  font-weight: bold;
  font-size: 1.1em;
  color: var(--secondary);
}

.reasons {
  display: flex;
  align-items: center;
  font-size: 0.7em;
}

.icon {
  margin-right: 0.5em;

  &-positive {
    color: var(--positive, green);
  }
  &-negative {
    color: var(--positive, red);
  }
}
</style>