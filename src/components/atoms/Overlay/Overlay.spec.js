import { mount, shallowMount } from '@vue/test-utils'
import PxOverlay from './PxOverlay.vue'

describe('Overlay', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(PxOverlay)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('renders correctly', () => {
    const wrapper = mount(PxOverlay)
    expect(wrapper).toMatchSnapshot()
  })

  it('is initially hidden', () => {
    const wrapper = shallowMount(PxOverlay)
    expect(wrapper.props('showOverlay')).toBe(false)
    expect(wrapper.isVisible()).toBe(false)
  })

  it('should display the overlay on showOverlay=true', () => {
    const wrapper = mount(PxOverlay)
    wrapper.setProps({ showOverlay: true })
    expect(wrapper.isVisible()).toBe(true)
  })

  it('should emit close event', () => {
    const wrapper = mount(PxOverlay)
    wrapper.setProps({ showOverlay: true })
    wrapper.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
