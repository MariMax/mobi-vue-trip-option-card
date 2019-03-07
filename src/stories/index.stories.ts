// @ts-ignore
import {storiesOf} from '@storybook/vue';

import SectionComponent from '../components/section.vue';
import {TripOptionDetailsComponent} from '../index';

storiesOf('Section', module).add('demo', () => ({
  components: {SectionComponent},
  template: `
    <div class="demo">
      <SectionComponent label="test" color="red" :width="100"/><!--
      --><SectionComponent label="test long"  color="blue" :width="50"/><!--
      --><SectionComponent label="test long" :width="10"/><!--
      --><SectionComponent label="test"  color="black" :width="40"/>
    </div>
    `,
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
