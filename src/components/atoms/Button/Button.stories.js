import PxButton from './PxButton.vue'
import { radios, boolean, number, text } from '@storybook/addon-knobs'

const progressBtn = {
  progress: {
    label: 'Progress',
    default: 70,
    options: {
      range: true,
      min: 0,
      max: 100,
      step: 5,
    },
  },
  radius: {
    label: 'Radius',
    default: 40,
    options: {
      range: true,
      min: 20,
      max: 60,
      step: 1,
    },
  },
  stroke: {
    label: 'Stroke',
    default: 3,
    options: {
      range: true,
      min: 1,
      max: 6,
      step: 1,
    },
  },

  mode: {
    none: '',
    light: 'light',
    dark: 'dark',
  },
}

const sizeOptions = {
  None: '',
  Small: 'small',
  Micro: 'micro',
}

const linkVariants = {
  None: '',
  Underline: 'underline',
  'No Underline': 'no-underline',
  'External ': 'external-link',
  'Chevron Left': 'chevron-left',
  'Chevron Right': 'chevron-right',
  'Chevron Up': 'chevron-up',
  'Chevron Down': 'chevron-down',
  Edit: 'edit',
}

const tags = {
  A: 'a',
  Button: 'button',
  'Router-Link': 'router-link',
  'Nuxt Link': 'nuxt-link',
  Div: 'div',
}

const marginOptions = {
  None: '',
  Margin: 'true',
  'Responsive Margin': 'responsive',
}

const docs = `
An interactive object used to prompt a response or encourage a desired
response from the operator.

## Options

### Primary
Set as the default, this is the primary button and uses the main interaction color of \`color-eire\`
- \`btn--primary\`

### Secondary
Visually different and softer than the primary CTA, this variant can be
used as contrasting or complimenting CTA(s). Usually used when responses required are secondary or not of equal importance.
- \`btn--secondary\`

### Checked
Checked button applied \`color-sailor\` to indicate different state of button to all other states, along with a visual cue in the form of a white tick icon as a suffix on the button
- \`btn--checked\`

### Disabled
Disabled state applied, and indicated through \`cursor: not-allowed\` style.
- \`disabled="disabled"\`

### Dropdown
Dropdown indicator added for use when the button will display more information.
- \`btn--dropdown\`

## Context of use
Placed prominently close to selling points or benefits which makes it convenient
for the operator to respond.

## Design criteria

- Label must be concise, clear and preferably short.
- Positioning must be prominently close to benefit(s), providing easy access for
the operator and convenience to respond.
`

export default {
  title: 'Blocks/Atoms/Button',
  component: PxButton,
  parameters: {
    docs: {
      description: {
        component: docs,
      },
    },
  },
}

export const Rounded = () => {
  return {
    components: { PxButton },
    props: {
      secondary: {
        default: boolean('Secondary', false),
      },
      checked: {
        default: boolean('Checked', false),
      },
      isDisabled: {
        default: boolean('Disabled', false),
      },
      add: {
        default: boolean('Add', false),
      },
      added: {
        default: boolean('(Add) Added', false),
      },
      dropdown: {
        default: boolean('Dropdown', false),
      },
      loading: {
        default: boolean('Loading', false),
      },
      tag: {
        default: radios('Tag', tags, 'a'),
      },
    },
    template: `
      <div>
        <px-button
          :is-disabled="isDisabled"
          :secondary="secondary"
          :tag="tag"
          :loading="loading"
          :dropdown="dropdown"
          :checked="checked"
          :add="add"
          :added="added"
          @click="onClick"
        >
          Button Text
        </px-button>
      </div>
    `,
    methods: {
      onClick(e) {
        console.log('Button clicked', e)
      },
    },
  }
}

export const Text = () => {
  return {
    components: { PxButton },
    props: {
      link: {
        default: radios('Link Variant', linkVariants, 'underline'),
      },
      size: {
        default: radios('Size', sizeOptions, ''),
      },
      loading: {
        default: boolean('Loading', false),
      },
    },
    template: `
      <px-button
        :linkStyle="link ? link : undefined"
        :size="size ? size : undefined"
        :loading="loading"
        tag="a"
      >
        Button underline
      </px-button>
    `,
  }
}

const textDocs = `
## Options

### Style
* _None_: Regular link text with no styling applied.
* _Underline_: Regular link text with underlined styling applied though a class (
* Will also be applied where an \`<a>\` tag is within a \`<p>\`)

- \`btn--underline\`
* _No Underline_: Regular link text with underline styling removed and only the
text color changes.

- \`btn--no-underline\`
* _External_: External link indicated by add-on icon. Uses small text.

- \`btn--external-link\`
* _Chevron Left_: Adds a chevron to the left of the text usually to indicate a
link to go back a page.

- \`btn--chevron-left\`
* _Chevron Right_: Adds a chevron to the right of the text usually to indicate a
link to go forward a page.

- \`btn--chevron-right\`

### Size
Dictates font size of text in the button.
- \`btn--small\`
- \`btn--micro\`

### Chevron
Adds a chevron to the left or the right of the text usually to indicate a page change.

# TODO: Alignment of chevron looks incorrect, but renders correctly in BBM
`

Text.parameters = {
  docs: {
    description: {
      story: textDocs,
    },
  },
}

export const AriaLabel = () => {
  return {
    components: { PxButton },
    props: {
      ariaLabel: {
        default: text('Aria Label', 'Close modal'),
      },
    },
    template: `
      <px-button
        :aria-label="ariaLabel"
        tag="button"
      >
        X
      </px-button>
    `,
  }
}

const ariaDocs = `
For a11y purposes, this allows an \`aria-label\` to describe what the buttons actions is when an icon is used
`

AriaLabel.parameters = {
  docs: {
    description: {
      story: ariaDocs,
    },
  },
}

export const CallToAction = () => {
  return {
    components: { PxButton },
    props: {
      marginOptions: {
        default: radios('Margins', marginOptions, ''),
      },
    },
    template: `
      <div>
        <p>Paragraph of text which gives the user the information needed to
        warrant clicking an action to follow up on.</p>
        <px-button :text-cta="marginOptions || undefined">Chevron left</px-button>
      </div>
    `,
  }
}
