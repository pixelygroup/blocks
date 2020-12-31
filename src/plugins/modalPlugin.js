import PxModalContainer from '../components/molecules/Modal/PxModalContainer'

const ModalPlugin = {
  // every plugin for Vue.js needs install method
  // this method will run after Vue.use(<your-plugin-here>) is executed
  install(Vue, config = {}) {
    // We must create new Eventbus
    // which is just another Vue instance that will be listening for and emitting events from our main instance
    // this EventBus will be available as ModalPlugin.EventBus
    this.EventBus = new Vue()

    const self = this

    // exposing global $modal object with method show()
    // method show() takes object params as argument
    // inside this object we can have modal title, text, styles... and also our callback confirm function
    Vue.prototype.$modal = {
      show(...args) {
        return self.show(...args)
      },
      dismiss(...args) {
        return self.dismiss(...args)
      },
      // Could also expose the EventBus here, and inline the show/hide functions
      // above into this modal to 1. save on that repetition and 2. make it so
      // that no-one has to talk directly to this plugin singleton, but instead
      // `this.$modal`
    }
    if (config.autoMount) {
      // This creates an empty PxPxModalContainer instance, then mounts it at the end of the DOM
      let ComponentClass = Vue.extend(PxPxModalContainer)
      let instance = new ComponentClass()
      instance.$mount() // pass nothing to create an appendable instance
      document.body.appendChild(instance.$el)
    }
  },
  show(params) {
    return new Promise(resolve => {
      // if we use this.$modal.show(params) inside our original Vue instance
      // we will emit 'show' event with parameters 'params'
      this.EventBus.$emit('show', params)

      this.EventBus.$once('dismiss', result => {
        resolve(result)
      })
    })
  },
  dismiss(result) {
    this.EventBus.$emit('dismiss', result)
  },
}

export default ModalPlugin
