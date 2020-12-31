<template>
  <transition name="fade">
    <div v-show="showOverlay" class="px-overlay" @click.stop="handleClick" />
  </transition>
</template>

<script>
export default {
  name: 'PxOverlay',

  props: {
    showOverlay: Boolean,
  },

  methods: {
    handleClick() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../../sass/framework/framework.scss';

.px-overlay {
  background-color: rgba(44, 62, 73, 0.55);
  bottom: 0;
  display: block;
  height: 100%;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: $zindex-modal-overlay;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
