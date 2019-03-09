<template>
  <div class="horizontal-container">
    <div ref="container" class="horizontal-container-inner">
      <div v-for="section in detailsSections()" :key="section.id" class="section-wrapper">
        <div :style="{'height': '100%'}">
          <Section
            class="section"
            :width="section.length"
            :color="section.color"
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
  id: string;
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

  @Prop({default: 10})
  public gap!: number;

  @Prop({default: 'gray'})
  public gapColor!: string;

  @Prop({
    default() {
      return `trip-option-detils-${uniqueId++}`;
    },
  })
  public id!: string;

  private isReady: boolean = false;
  private internalHash: number = 0;
  private internalSections: IExDetailsSection[] = [];

  public mounted() {
    this.isReady = true;
    this.update = this.update.bind(this);
    window.addEventListener('resize', this.update);
  }

  public beforeDestroy() {
    window.removeEventListener('resize', this.update);
  }

  private update() {
    this.$forceUpdate();
  }

  private detailsSections(): IExDetailsSection[] {
    if (!this.isReady) {
      return this.internalSections;
    }
    const maxWidth = this.$refs.container.offsetWidth;
    if (this.internalHash === maxWidth) {
      return this.internalSections;
    }
    const fullWidth = maxWidth;
    this.internalHash = fullWidth;
    let offset = 0;
    this.internalSections = this.sections.reduce((result: IExDetailsSection[], i: IDetailsSection, ind: number) => {
      const sectionLength = ((fullWidth - (this.sections.length - 1) * this.gap) * i.length) / 100;
      offset += sectionLength;
      const section: IExDetailsSection = {
        ...i,
        length: sectionLength,
        id: `${ind}-${fullWidth}`,
        offset: offset - sectionLength,
      };
      const gap: IExDetailsSection = {
        color: this.gapColor,
        length: this.gap,
        id: `${ind}-gap`,
        offset,
        icon: null,
      };
      result.push(section);
      if (ind !== this.sections.length - 1) {
        result.push(gap);
        offset += this.gap;
      }
      return result;
    }, []);

    return this.internalSections;
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
  line-height: 0
}

.horizontal-container-inner {
  position: relative;
  display: flex;
  align-items: center;
  display: flex;
  align-items: baseline;
}

.section-wrapper {
  /* position: absolute; */
}

.section {
  font-size: 2em;
  position: relative;
}
</style>