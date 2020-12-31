<template>
  <px-modal
    :show="visible"
    :show-close-button="showCloseButton"
    @close-modal="handleCloseModal"
  >
    <template v-slot:header>{{ title }}</template>
    <template v-slot:body>
      <component :is="bodyComponent" v-if="bodyComponent"></component>
      <template v-else>{{ text }}</template>
    </template>
    <template v-slot:footer>
      <component :is="footerComponent" v-if="footerComponent"></component>
      <template v-else>{{ footer }}</template>
    </template>
  </px-modal>
</template>

<script>
import ModalPlugin from '../../../plugins/modalPlugin'

import PxModal from './PxModal'
export default {
  name: 'PxPxModalContainer',
  components: {
    PxModal,
  },
  data() {
    return {
      visible: false,
      title: '',
      text: '',
      footer: '',
      bodyComponent: null,
      footerComponent: null,
      showCloseButton: true,
    }
  },
  beforeMount() {
    // here we need to listen for emitted events
    // we declared those events inside our plugin
    ModalPlugin.EventBus.$on('show', (params = {}) => {
      this.show(params)
    })
    ModalPlugin.EventBus.$on('dismiss', () => {
      this.dismiss()
    })
  },
  methods: {
    dismiss() {
      this.visible = false
    },
    show(params) {
      // making modal visible
      this.visible = true
      // setting title and text
      this.title = params.title
      this.text = params.text
      this.footer = params.footer
      this.footerComponent = params.footerComponent
      this.bodyComponent = params.body
      this.showCloseButton = !params.hideCloseButton
    },
    handleCloseModal() {
      // We go through the official channel here rather than just setting
      // `this.visible` to `false`) so that all "cleanup" runs (i.e. the "show"
      // promise resolves, but maybe other stuff in the future)
      ModalPlugin.dismiss()
    },
  },
}
</script>
