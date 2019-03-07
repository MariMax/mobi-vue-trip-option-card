<template>
  <div class="section" ref="container">
    <div class="trace" :id="id" ref="trace">
      <component :is="icon" class="icon" ref="icon"></component>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Emit} from 'vue-property-decorator';
import VueObject, { VueConstructor } from 'vue';

let uniqueId = 0;

@Component
export default class SectionComponent extends Vue {
  public $refs!: {
    container: HTMLDivElement;
    trace: HTMLDivElement;
    icon: VueObject;
  };

  @Prop({default: 'gray'})
  public color!: string;

  @Prop({default: 10})
  public width!: number;

  @Prop({default: null, required: true})
  public icon!: VueConstructor<Vue>;

  @Prop({
    default() {
      return `trip-option-detils-trace-${uniqueId++}`;
    },
  })
  public id!: string;

  public mounted() {
    this.updateLabel();
  }
  public updated() {
    this.updateLabel();
  }

  private updateLabel(): void {
    const availableWidth = this.width;
    if (!this.$refs.icon) {
      return;
    }
    const icon = this.$refs.icon.$el as HTMLDivElement;
    if (availableWidth >= 0 && availableWidth < icon.offsetWidth) {
      icon.style.opacity = '0';
    }
    this.$refs.trace.style.backgroundColor = this.color;
    this.$refs.trace.style.width = `${this.width}px`;
    const halfLabel = icon.clientWidth / 2;
    icon.style.transform = `translateX(${(this.width / 2) - halfLabel}px)`;
    if (this.width < halfLabel * 2) {
      icon.style.opacity = '0';
    }
  }
}
</script>

<style lang="postcss" scoped>
.section {
  display: inline-block;
  text-align: center;
  position: relative;
}

.trace {
  display: inline-block;
  height: 1em;
}

.icon {
  display: block;
  text-align: center;
  color: var(--white);
  font-size: .75em;
  position: absolute;
  will-change: transform;
  left: 0;
  top: .2em;
  margin-bottom: 0
}
</style>