<template>
  <div class="section" :id="id" ref="container" :style="{'flex-basis': width}">
    <component :is="icon" class="icon" ref="icon"></component>
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
    icon: VueObject;
  };

  @Prop({default: 'gray'})
  public color!: string;

  @Prop({default: '10%'})
  public width!: string;

  @Prop({default: '2em'})
  public minWidth!: string;

  @Prop({default: null})
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
    if (!this.$refs.icon || !this.$refs.container) {
      return;
    }

    const availableWidth = this.$refs.container.offsetWidth;
    this.$refs.container.style.backgroundColor = this.color;

    const icon = this.$refs.icon.$el as HTMLDivElement;
    if (availableWidth >= 0 && availableWidth < icon.clientHeight) {
      icon.style.opacity = '0';
    }
    const halfLabel = icon.clientWidth / 2;
    icon.style.transform = `translateX(${(availableWidth / 2) - halfLabel}px)`;
  }
}
</script>

<style lang="postcss" scoped>
.section {
  display: inline-block;
  text-align: center;
  position: relative;
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