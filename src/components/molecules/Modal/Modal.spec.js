import { mount, shallowMount } from '@vue/test-utils'
import PxModal from './PxModal'
import PxOverlay from '../../atoms/Overlay/PxOverlay'

const modalSelector = '.px-modal'
const modalCloseButtonSelector = '.px-modal__close'
const modalDialogSelector = '.px-modal__dialog'

describe('Modal', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(PxModal, {
      propsData: {
        show: true,
      },
      slots: {
        header: '<p>This is the header</p>',
        body: '<p>This is the body</p>',
        footer: '<p>This is the body text</p>',
      },
    })
    expect(wrapper).toMatchSnapshot()
  })

  test('the modal is initially hidden', () => {
    const wrapper = mount(PxModal)
    expect(wrapper.props().show).toBe(false)

    expect(wrapper.find(modalSelector).exists()).toBeFalsy()
    expect(wrapper.find(PxOverlay).isVisible()).toBeFalsy()
  })

  test('should display the modal on show=true', () => {
    const wrapper = mount(PxModal)

    wrapper.setProps({ show: true })

    expect(wrapper.find(modalSelector).exists()).toBeTruthy()
    expect(wrapper.find(PxOverlay).isVisible()).toBeTruthy()
  })

  test('should hide the modal on show=false', () => {
    const wrapper = mount(PxModal, {
      propsData: {
        show: true,
      },
    })

    expect(wrapper.find(modalSelector).exists()).toBeTruthy()
    expect(wrapper.find(PxOverlay).isVisible()).toBeTruthy()

    wrapper.setProps({ show: false })

    expect(wrapper.find(modalSelector).exists()).toBeFalsy()
    expect(wrapper.find(PxOverlay).isVisible()).toBeFalsy()
  })

  test('the close button can be hidden', () => {
    const wrapper = shallowMount(PxModal, {
      propsData: {
        show: true,
        showCloseButton: false,
      },
    })

    expect(wrapper.find(modalCloseButtonSelector).exists()).toBeFalsy()
  })

  test('the default position is center', () => {
    const wrapper = shallowMount(PxModal, {
      propsData: {
        show: true,
      },
    })

    expect(wrapper.find(modalSelector).classes()).toContain('px-modal--center')
  })

  test('the position can be changed', () => {
    const wrapper = shallowMount(PxModal, {
      propsData: {
        show: true,
        position: 'top',
      },
    })

    expect(wrapper.find(modalSelector).classes()).toContain('px-modal--top')
    expect(wrapper.find(modalSelector).classes()).not.toContain(
      'modal--center modal--bottom'
    )

    wrapper.setProps({ position: 'bottom' })

    expect(wrapper.find(modalSelector).classes()).toContain('px-modal--bottom')
    expect(wrapper.find(modalSelector).classes()).not.toContain(
      'modal--center modal--top'
    )
  })

  test('the modal width can be restricted', () => {
    const wrapper = shallowMount(PxModal, {
      propsData: {
        show: true,
        narrow: true,
      },
    })

    expect(wrapper.find(modalSelector).classes()).toContain('px-modal--narrow')
  })

  test('the aria role can be changed', () => {
    const wrapper = shallowMount(PxModal, {
      propsData: {
        show: true,
      },
    })

    // Default value
    expect(wrapper.find(modalSelector).attributes().role).toEqual('dialog')

    wrapper.setProps({ ariaRole: 'alert' })
    expect(wrapper.find(modalSelector).attributes().role).toEqual('alert')

    wrapper.setProps({ ariaRole: 'alertdialog' })
    expect(wrapper.find(modalSelector).attributes().role).toEqual('alertdialog')

    wrapper.setProps({ ariaRole: 'dialog' })
    expect(wrapper.find(modalSelector).attributes().role).toEqual('dialog')
  })

  describe('modal close event', () => {
    test('clicking on the modal backdrop emit the close event', () => {
      const wrapper = shallowMount(PxModal, {
        propsData: {
          show: true,
        },
      })

      wrapper.find(modalSelector).trigger('click')
      expect(wrapper.emitted('close-modal')).toBeTruthy()
    })

    test('clicking on the modal dialog does not emit the close event', () => {
      const wrapper = shallowMount(PxModal, {
        propsData: {
          show: true,
        },
      })

      wrapper.find(modalDialogSelector).trigger('click')
      expect(wrapper.emitted('close-modal')).toBeFalsy()
    })

    test('clicking on the modal close button emits the close event', () => {
      const wrapper = shallowMount(PxModal, {
        propsData: {
          show: true,
        },
      })

      wrapper.find(modalCloseButtonSelector).trigger('click')
      expect(wrapper.emitted('close-modal')).toBeTruthy()
    })

    test('disabling clickaway prevents emitting the close event on backdrop click', () => {
      const wrapper = shallowMount(PxModal, {
        propsData: {
          show: true,
          clickaway: false,
        },
      })

      wrapper.find(modalSelector).trigger('click')
      expect(wrapper.emitted('close-modal')).toBeFalsy()
    })
  })

  /**FIXME: JSDOM currently stubs some layout apis to return dummy values which,
  /*  without defining all the various missing properties on element, makes this
  /*  test unable to be completed.
  /* https://github.com/jsdom/jsdom#unimplemented-parts-of-the-web-platform
  **/
  /* eslint-disable jest/no-disabled-tests */
  describe.skip('scrollbar behaviour', () => {
    test.skip('when open, if the body has overflow, the body overflow is hidden and padding which equals the width of the scrollbar added to the body or any fixed/sticky element', () => {})

    test.skip('when closed, the body overflow/padding and any fixed/sticky elements padding are restored to what they were before the modal opened', () => {})
  })
  /* eslint-enable jest/no-disabled-tests */
})
