import {configure} from '@storybook/vue';
import './index.css';
// import '../dist/mobi-vue-preference-slider.css'
// automatically import all files ending in *.stories.js
const req = require.context('../src/stories', true, /.stories.ts$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
