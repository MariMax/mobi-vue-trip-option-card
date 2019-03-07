// @ts-ignore
import {storiesOf} from '@storybook/vue';

import SectionComponent from '../components/section.vue';
import {TripOptionDetailsComponent} from '../index';
import {IconBike} from 'mobi-vue-icons';

storiesOf('Section', module).add('demo', () => ({
  components: {SectionComponent, IconBike},
  template: `
    <div class="demo">
      <SectionComponent label="test" color="red" :width="100" :icon="bike"/><!--
      --><SectionComponent label="test long"  color="blue" :width="50" :icon="bike"/><!--
      --><SectionComponent label="test long" :width="10" :icon="bike"/><!--
      --><SectionComponent label="test"  color="black" :width="40" :icon="bike"/>
    </div>
    `,
    data() {
      return {
        bike: IconBike,
      };
    },
  // methods: {action: action('clicked')},
}));
storiesOf('Details', module).add('demo', () => ({
  components: {TripOptionDetailsComponent},
  template: `
    <div class="demo">
      <TripDetailsComponent start="test-start" end="test-end" :sections="sections"/>
    </div>
    `,
  // methods: {action: action('clicked')},
  data: () => {
    return {
      sections: [{
        label: 'test 1',
        color: 'red',
        length: 30,
        offsetLabel: 'text-offset',
      },
      {
        label: 'test 2',
        color: 'blue',
        length: 50,
        offsetLabel: 'text-offset',
      },
      {
        label: 'test 3',
        color: 'yellow',
        length: 20,
        offsetLabel: '',
      },
    ],
    };
  },
}));
