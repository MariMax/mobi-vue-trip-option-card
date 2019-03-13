<template>
  <div class="horizontal-container">
    <div ref="container" class="horizontal-container-inner">
      <Section
        v-for="section in detailsSections()" :key="section.id"
        class="section"
        :color="section.color"
        :icon="section.icon"
        :minWidth="section.minWidth"
        :maxWidth="section.maxWidth"
        :width="section.length"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Emit} from 'vue-property-decorator';
import {IDetailsSection} from '../types/details-section.interface';
import Section from './section.vue';
import VueObject from 'vue';

let uniqueId = 0;

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
  private internalHash: string = '';
  private internalSections: IDetailsSection[] = [];

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

  private detailsSections(): IDetailsSection[] {
    if (!this.isReady) {
      return this.internalSections;
    }
    const maxWidth = this.$refs.container.offsetWidth;
    const minWidth = this.$refs.container.offsetHeight;
    const hash = this.sections.reduce((s: string, i: IDetailsSection) => {
      return `${s}${i.color}${i.length}`;
    }, '');
    if (this.internalHash === `${maxWidth}${hash}`) {
      return this.internalSections;
    }

    this.internalHash = `${maxWidth}${hash}`;
    this.internalSections = this.sections.reduce((result: IDetailsSection[], i: IDetailsSection, ind: number) => {
      const section: IDetailsSection = {
        ...i,
        id: `${ind}-${i.color}-${i.length}`,
        minWidth: `${minWidth}px`,
      };
      const gap: IDetailsSection = {
        color: this.gapColor,
        length: `${this.gap}px`,
        minWidth: `${this.gap}px`,
        maxWidth: 'auto',
        id: `${ind}-gap-${section.id}`,
        icon: null,
      };
      result.push(section);
      if (ind !== this.sections.length - 1) {
        result.push(gap);
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
  align-items: baseline;
}

.section {
  font-size: 2em;
  position: relative;
  flex-shrink: 1;
  flex-grow: 1;
}
</style>