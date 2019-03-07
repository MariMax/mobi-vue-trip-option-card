<template>
  <div class="horizontal-container">
    <div ref="container" class="horizontal-container-inner">
      <div
        v-for="section in detailsSections"
        :key="section.length"
        class="section-wrapper"
        :style="{transform: 'translateX('+section.offset+'px)'}"
      >
        <div :style="{'height': '100%'}">
          <Section
            class="section"
            :width="section.length"
            :color="section.color"
            :label="section.label"
            :icon="section.icon"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Emit} from 'vue-property-decorator';
import {IDetailsSection} from '../types/details-section.interface';
import Section from './section.vue';
import VueObject from 'vue';

let uniqueId = 0;

interface IExDetailsSection extends IDetailsSection {
  id: number;
  offset: number;
}

@Component({
  components: {
    Section,
  },
})
export default class TripOptionDetailsComponent extends Vue {
  public $refs!: {
    container: HTMLDivElement;
  };

  @Prop({default: []})
  public sections!: IDetailsSection[];

  @Prop({
    default() {
      return `trip-detils-${uniqueId++}`;
    },
  })
  public id!: string;

  private isReady: boolean = false;

  public mounted() {
    this.isReady = true;
  }

  private get detailsSections(): IExDetailsSection[] {
    if (!this.isReady) {
      return [];
    }
    const fullWidth = this.$refs.container.offsetWidth;
    let offset = 0;
    const sections = this.sections.map((i: IDetailsSection, ind: number) => {
      offset += (fullWidth * i.length) / 100;
      return {
        ...i,
        length: (fullWidth * i.length) / 100,
        id: ind,
        offset: offset - (fullWidth * i.length) / 100,
      };
    });

    return sections;
  }

  private get isValid(): boolean {
    return this.sections.length > 0;
  }

  private isIconShown(id: number): boolean {
    const sections = this.detailsSections;
    const sectionIndex = sections.findIndex((i) => i.id === id);
    if (sectionIndex < 0) {
      return false;
    }
    const prevSection = sections[sectionIndex];
    const nextSection = sections[sectionIndex + 1];
    if (!nextSection) {
      return false;
    }

    const prevWidth = prevSection.length / 2;
    const nextWidth = nextSection.length / 2;
    const fullWidth = this.$refs.container.offsetWidth;
    return true;
  }
}
</script>


<style lang="postcss" scoped>
.horizontal-container {
  width: 100%;
  overflow: hidden;
  padding: 1em;
}

.horizontal-container-inner {
  position: relative;
  display: flex;
  align-items: center;
  display: flex;
  align-items: baseline;
}

.section-wrapper {
  position: absolute;
}

.section {
  font-size: 4px;
  position: relative;
  top: 7px;
}
</style>