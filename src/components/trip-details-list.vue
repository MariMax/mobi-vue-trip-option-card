<template>
  <div class="horizontal-container">
    <div class="section-label">Trip Options</div>
    <div class="list-wrapper">
      <div class="list-scroller">
        <TripDetailsOptionCardComponent
          class="option-card"
          v-for="card in options"
          @click="onCardClick(card.id)"
          :key="card.id"
          :data="card"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Emit} from 'vue-property-decorator';
import TripDetailsOptionCardComponent from './trip-details-card.vue';
import {ITripOption} from '@/types/trip-option.interface';

let uniqueId = 0;

@Component({
  components: {
    TripDetailsOptionCardComponent,
  },
})
export default class TripOptionDetailsListComponent extends Vue {
  @Prop({default: null, required: true})
  public data!: ITripOption[];

  @Prop({
    default() {
      return `trip-option-list-${uniqueId++}`;
    },
  })
  public id!: string;

  private get options(): ITripOption[] {
    return this.data || [];
  }

  @Emit('onSelectCard')
  private onCardClick(id: string) {
    return id;
  }
}
</script>


<style lang="postcss" scoped>
.horizontal-container {
  width: 100%;
  overflow: hidden;
}

.section-label {
  background-color: var(--inactive-bg);
  text-transform: uppercase;
  padding: 0.5em 1em;
  color: var(--secondary);
  font-weight: 500;
}

.list-wrapper {
  overflow-y: auto;
}

.option-card {
  &:hover {
    background-color: var(--inactive-bg);
  }
}
</style>