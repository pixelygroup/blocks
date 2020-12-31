import { addParameters } from '@storybook/vue'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import Vue from 'vue'
import ModalPlugin from '../src/plugins/modalPlugin'

import "./storybook.scss";

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
})

Vue.use(ModalPlugin)

