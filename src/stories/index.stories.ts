// @ts-ignore
import {storiesOf} from '@storybook/vue';

import SectionComponent from '../components/section.vue';
import {TripOptionDetailsComponent, TripOptionDetailsCardComponent} from '../index';
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
  components: {TripOptionDetailsComponent, IconBike},
  template: `
    <div class="demo">
      <TripOptionDetailsComponent start="test-start" end="test-end" :sections="sections"/>
    </div>
    `,
  // methods: {action: action('clicked')},
  data: () => {
    return {
      sections: [{
        color: 'red',
        length: 30,
        icon: IconBike,
      },
      {
        color: 'blue',
        length: 50,
        icon: IconBike,
      },
      {
        color: 'yellow',
        length: 20,
        icon: IconBike,
      },
    ],
    };
  },
}));
storiesOf('TripOptionDetailsCard', module).add('demo', () => ({
  components: {TripOptionDetailsCardComponent},
  template: `
    <div class="demo">
      <TripOptionDetailsCardComponent :data="data"/>
    </div>
    `,
  // methods: {action: action('clicked')},
  data: () => {
    return {
      data: {
        sections: [
          {
            color: 'red',
            length: 30,
            icon: IconBike,
          },
          {
            color: 'blue',
            length: 50,
            icon: IconBike,
          },
          {
            color: 'yellow',
            length: 20,
            icon: IconBike,
          },
        ],
        gapLength: 10,
        gapColor: 'gray',
        departure: '10:00 AM',
        arrival: '10:30 PM',
        caption: 'Best ($23, 19 miles, 32 mins)',
        positives: ['Accessible, Ferry, Fast, Time to Read, All Real Time'],
        negatives: ['8 transfers, Likely Late, Not Free, Get Wet'],
      },
    };
  },
}));
