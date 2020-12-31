import { boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import PxOverlay from './PxOverlay.vue'

const docs = `
A tinted overlay, could be used as a background for modal, side navigation, popups...

## Context of use
Place where a background for modal, side navigation, popups needed.
`

export default {
  title: 'Blocks/Atoms/Overlay',
  component: PxOverlay,
  parameters: {
    docs: {
      inlineStories: false,
      description: {
        component: docs,
      },
    },
  },
}

export const Overlay = () => {
  return {
    components: { PxOverlay },
    props: {
      showOverlay: {
        default: boolean('showOverlay', true),
      },
    },
    methods: {
      action: action('close'),
    },
    template: '<px-overlay :show-overlay="showOverlay" @close="action" />',
  }
}
