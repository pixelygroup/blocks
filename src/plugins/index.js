import ModalPlugin from './modalPlugin'

const defaults = {
  modalPlugin: true,
  modalPluginAutoMount: true,
  components: null,
  settings: {
    SiteHeader: {
      headroom: false,
    },
  },
}

const BlocksPlugin = {
  install(Vue, options) {
    // Merge defaults with options
    const config = {
      ...defaults,
      ...options,
    }

    // Optionally include modal plugin
    if (config.modalPlugin) {
      Vue.use(ModalPlugin, { autoMount: config.modalPluginAutoMount })
    }

    // Optionally select components to global import
    if (config.components) {
      Object.keys(config.components).forEach(componentKey => {
        Vue.component(componentKey, config.components[componentKey])
      })
    }

    // Define $blocks which can be used for global config
    Vue.prototype.$blocks = new Vue({
      data: () => ({
        settings: config.settings,
      }),
    })
  },
}

export default BlocksPlugin
export { default as modalPlugin } from './modalPlugin'
