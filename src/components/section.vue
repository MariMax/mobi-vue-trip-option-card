<template>
  <div class="section" :id="id" ref="container" :style="{'flex-basis': width}">
    <component :is="icon" class="icon" ref="icon"></component>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Emit} from 'vue-property-decorator';
import VueObject, {VueConstructor} from 'vue';

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

    const icon = this.$refs.icon.$el as HTMLDivElement;
    this.$refs.container.style.backgroundColor = this.color;
    this.$nextTick(() => {
      this.$refs.container.style.minWidth = `${icon.clientWidth + 4}px`;
    });
  }
}
</script>

<style lang="postcss" scoped>
.section {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1em;
}

.icon {
  position: absolute;
  display: block;
  color: var(--white);
  font-size: 0.75em;
  top: 50%;
  transform: translateY(-50%);
}
</style>