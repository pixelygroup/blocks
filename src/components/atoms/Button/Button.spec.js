import { shallowMount } from '@vue/test-utils'
import PxButton from './PxButton.vue'

describe('PxButton', () => {
  test('it renders the header correctly when no props are passed', () => {
    const wrapper = shallowMount(PxButton)
    expect(wrapper.isFunctionalComponent).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
  })

  test('it passes children through', () => {
    const wrapper = shallowMount(PxButton, {
      context: {
        children: ['test'],
      },
    })
    expect(wrapper).toMatchSnapshot()
  })

  test('tag can be updated from default', () => {
    const wrapper = shallowMount(PxButton, {
      propsData: {
        tag: 'a',
      },
    })
    expect(wrapper).toMatchSnapshot()
  })

  describe('getting proper styles', () => {
    test('it has a primary style', () => {
      const wrapper = shallowMount(PxButton)
      expect(wrapper.classes()).toContain('px-button--primary')
    })

    test('it has a secondary style', () => {
      const wrapper = shallowMount(PxButton, {
        propsData: {
          secondary: true,
        },
      })
      expect(wrapper.classes()).toContain('px-button--secondary')
      expect(wrapper.classes()).not.toContain('px-button--primary')
    })

    test('it has a checked style', () => {
      const wrapper = shallowMount(PxButton, {
        propsData: {
          checked: true,
        },
      })
      expect(wrapper.classes()).toContain('px-button--checked')
      expect(wrapper.classes()).not.toContain('px-button--primary')
    })
  })

  describe('link styles', () => {
    test('it has underline class', () => {
      const wrapper = shallowMount(PxButton, {
        propsData: {
          linkStyle: 'underline',
        },
      })
      expect(wrapper.classes()).not.toContain('px-button')
      expect(wrapper.classes()).toContain('px-button--underline')
    })
    test('it has no-underline class', () => {
      const wrapper = shallowMount(PxButton, {
        propsData: {
          linkStyle: 'no-underline',
        },
      })
      expect(wrapper.classes()).not.toContain('px-button')
      expect(wrapper.classes()).toContain('px-button--no-underline')
    })
    test('it has external-link class', () => {
      const wrapper = shallowMount(PxButton, {
        propsData: {
          linkStyle: 'external-link',
        },
      })
      expect(wrapper.classes()).not.toContain('px-button')
      expect(wrapper.classes()).toContain('px-button--external-link')
    })
    describe("it has chevron classes and doesn't contain .px-button class", () => {
      test.each(['left', 'right', 'up', 'down'])('%s', direction => {
        const wrapper = shallowMount(PxButton, {
          propsData: {
            linkStyle: `chevron-${direction}`,
          },
        })
        expect(wrapper.classes()).toContain(`px-button--chevron`)
        expect(wrapper.classes()).toContain(`px-button--chevron-${direction}`)
        expect(wrapper.classes()).not.toContain('px-button')
      })
    })
  })

  describe('click interactions', () => {
    test('is clickable', () => {
      const click = jest.fn()
      const wrapper = shallowMount(PxButton, {
        propsData: {
          tag: 'div',
        },
        context: {
          on: {
            click,
          },
        },
      })
      wrapper.trigger('click')
      expect(click).toHaveBeenCalled()
    })

    test('unclickable when disabled', () => {
      const click = jest.fn()
      const wrapper = shallowMount(PxButton, {
        propsData: {
          tag: 'div',
          isDisabled: true,
        },
        context: {
          on: {
            click,
          },
        },
      })
      wrapper.trigger('click')
      expect(click).not.toHaveBeenCalled()
    })

    test('unclickable when loading', () => {
      const click = jest.fn()
      const wrapper = shallowMount(PxButton, {
        propsData: {
          tag: 'div',
          loading: true,
        },
        context: {
          on: {
            click,
          },
        },
      })
      wrapper.trigger('click')
      expect(click).not.toHaveBeenCalled()
    })
  })

  describe('additional styles', () => {
    test('has disabled style', () => {
      const wrapper = shallowMount(PxButton, {
        propsData: {
          isDisabled: true,
        },
      })
      expect(wrapper.attributes().disabled).toBeTruthy()
    })
    test('has loading style', () => {
      const wrapper = shallowMount(PxButton, {
        propsData: {
          loading: true,
        },
      })
      expect(wrapper.classes()).toContain('px-button--progress')
    })
    test('has dropdown style', () => {
      const wrapper = shallowMount(PxButton, {
        propsData: {
          dropdown: true,
        },
      })
      expect(wrapper.classes()).toContain('px-button--dropdown')
    })
    describe('has sizes', () => {
      test.each(['small', 'micro'])('%s', size => {
        const wrapper = shallowMount(PxButton, {
          propsData: {
            size: size,
          },
        })
        expect(wrapper.classes()).toContain(`px-button--${size}`)
      })
    })
    describe('text cta', () => {
      test('default', () => {
        const wrapper = shallowMount(PxButton, {
          propsData: {
            textCta: true,
          },
        })
        expect(wrapper.classes()).toContain('px-button--text-cta')
      })
      test('responsive', () => {
        const wrapper = shallowMount(PxButton, {
          propsData: {
            textCta: 'responsive',
          },
        })
        expect(wrapper.classes()).toContain('px-button--text-cta-responsive')
      })
    })
  })
  test('passes and merges all attributes down', () => {
    const wrapper = shallowMount(PxButton, {
      attrs: {
        'aria-label': 'label',
        type: 'reset',
        id: 'special-id',
        class: 'special-class',
      },
    })
    expect(wrapper.attributes('aria-label')).toBe('label')
    expect(wrapper.attributes('type')).toBe('reset')
    expect(wrapper.attributes('id')).toBe('special-id')
    expect(wrapper.classes()).toContain('special-class')
  })
})
