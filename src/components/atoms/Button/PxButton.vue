<script>
export default {
  name: 'PxButton',
  functional: true,
  props: {
    /**
     * Tag for the component
     * eg. `a`, `button`, `router-link`, `nuxt-link`
     */
    tag: {
      type: String,
      default: 'button',
    },
    /**
     * Use secondary button style
     */
    secondary: {
      type: Boolean,
      default: false,
    },
    /**
     * Use add button style
     */
    add: {
      type: Boolean,
      default: false,
    },
    /**
     * Use add button added state
     */
    added: {
      type: Boolean,
      default: false,
    },
    /**
     * Change button link style
     */
    linkStyle: {
      type: String,
      default: null,
      validator: prop =>
        [
          'underline',
          'no-underline',
          'external-link',
          'chevron-left',
          'chevron-right',
          'chevron-up',
          'chevron-down',
          'edit',
        ].includes(prop),
    },
    /**
     * Change default size
     */
    size: {
      type: String,
      default: null,
      validator: prop => ['small', 'micro'].includes(prop),
    },
    /**
     * Change default size
     */
    dropdown: {
      type: Boolean,
      default: false,
    },
    /**
     * Enable Disabled state
     */
    isDisabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Enable Loading state, adds loading animation
     */
    loading: {
      type: Boolean,
      default: false,
    },
  },
  render(createElement, { props, children, data, listeners }) {
    const buttonClasses = [
      ...(data.attrs && data.attrs.class ? [data.attrs.class] : []),
      {
        // Base styles
        'px-button': !props.linkStyle,
        'px-button--primary':
          !(props.secondary || props.checked || props.add) && !props.linkStyle,
        'px-button--secondary': props.secondary,
        'px-button--add': props.add,
        'px-button--added': props.added,
        'px-button--checked': props.checked,
        // Link Styles
        'px-button--underline': props.linkStyle === 'underline',
        'px-button--no-underline': props.linkStyle === 'no-underline',
        'px-button--external-link': props.linkStyle === 'external-link',
        'px-button--chevron':
          props.linkStyle && props.linkStyle.includes('chevron'),
        'px-button--chevron-left': props.linkStyle === 'chevron-left',
        'px-button--chevron-right': props.linkStyle === 'chevron-right',
        'px-button--chevron-up': props.linkStyle === 'chevron-up',
        'px-button--chevron-down': props.linkStyle === 'chevron-down',
        'px-button--edit': props.linkStyle === 'edit',
        // Size Styles
        'px-button--small': props.size === 'small',
        'px-button--micro': props.size === 'micro',
        // Additional Styles
        'px-button--progress': props.loading,
        'px-button--dropdown': props.dropdown,
        'px-button--text-cta': props.textCta,
        'px-button--text-cta-responsive': props.textCta === 'responsive',
      },
    ]
    const enabledListeners = { ...listeners }
    // Button should not allow interactions, if it's in either disabled or loading state
    if (props.isDisabled || props.loading) {
      delete enabledListeners.click // Get rid of the click listeners, if button should be unclickable
    }
    return createElement(
      props.tag,
      {
        ...data,
        attrs: {
          ...data.attrs,
          disabled: props.isDisabled,
        },
        class: buttonClasses,
        on: enabledListeners,
      },
      children
    )
  },
}
</script>

<style lang="scss">
@import '../../../sass/framework/framework.scss';

.px-button {
  // styles here
}
</style>
