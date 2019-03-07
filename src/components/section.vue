<template>
  <div class="section" ref="container">
    <div class="trace" :id="id" ref="trace"></div>
    <label :for="id" class="trace-label" ref="label">
      {{label}}</label>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Emit} from 'vue-property-decorator';

let uniqueId = 0;

@Component
export default class SectionComponent extends Vue {
  public $refs!: {
    container: HTMLDivElement;
    label: HTMLLabelElement;
    trace: HTMLDivElement;
  };

  @Prop({default: ' '})
  public label!: string;

  @Prop({default: 'gray'})
  public color!: string;

  @Prop({default: 10})
  public width!: number;

  @Prop({
    default() {
      return `trip-detils-trace-${uniqueId++}`;
    },
  })
  public id!: string;

  public mounted() {
    this.updateLabel();
  }
  public updated() {
    this.updateLabel();
  }

  private updateLabel() {
    const availableWidth = this.width;
    if (availableWidth >= 0 && availableWidth < this.$refs.label.offsetWidth) {
      this.$refs.label.style.opacity = '0';
    }
    this.$refs.trace.style.backgroundColor = this.color;
    this.$refs.trace.style.width = `${this.width}px`;
    const halfLabel = this.$refs.label.offsetWidth / 2;
    this.$refs.label.style.transform = `translateX(${(this.width / 2) - halfLabel}px)`;
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

.trace-label {
  display: block;
  text-align: center;
  color: var(--black-50);
  font-size: 11px;
  font-weight: 600;
  position: absolute;
  bottom: -1.5em;
  will-change: transform;
  left: 0;
  margin-bottom: 0
}
</style>