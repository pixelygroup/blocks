<template>
  <div>
    <px-overlay :show-overlay="show" @close="clickaway && closeModal()" />

    <transition
      name="fade"
      @before-enter="beforeEnterTransition"
      @after-leave="afterLeaveTransition"
    >
      <!--
        TODO: aria-labelledby
          This is tricky because it very much depends on what is passed into
          the slots by the parent. The ID use by the attribute must also be
          unique.
      -->
      <div
        v-if="show"
        class="px-modal"
        :class="[
          { 'px-modal--narrow': narrow, 'px-modal--wide': wide },
          `px-modal--${position}`,
        ]"
        :role="ariaRole"
        aria-modal="true"
        tabindex="-1"
        @click.self="clickaway && closeModal()"
      >
        <div class="px-modal__dialog" role="document" tabindex="0">
          <button
            v-if="showCloseButton"
            :aria-label="ariaLabel"
            data-qa-locator="modal-close-btn"
            type="button"
            class="px-modal__close"
            @click="closeModal"
          >
            <span class="sr-only">Close modal</span>
          </button>

          <!-- @slot Modal header -->
          <slot name="header"></slot>

          <!-- @slot Modal body -->
          <slot name="body"></slot>

          <!-- @slot Modal footer -->
          <slot name="footer"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import PxOverlay from '../../atoms/Overlay/PxOverlay'

export default {
  name: 'PxModal',

  components: { PxOverlay },

  props: {
    /**
     * Whether to show the modal dialog
     */
    show: {
      type: Boolean,
      default: false,
    },
    /**
     * Whether to show the close button
     */
    showCloseButton: {
      type: Boolean,
      required: false,
      default: true,
    },
    /**
     * Whether the modal should be narrow (500px)
     */
    narrow: {
      type: Boolean,
      default: false,
    },
    /**
     * Whether the modal should be wide (700px)
     */
    wide: {
      type: Boolean,
      default: false,
    },
    /**
     * Position of the modal on the screen
     */
    position: {
      type: String,
      default: 'center',
      validator: value => ['top', 'bottom', 'center'].includes(value),
    },
    /**
     * Whether the modal can be dimissed by clicking on the overlay
     */
    clickaway: {
      type: Boolean,
      default: true,
    },

    /**
     * The modal ARIA role
     */
    ariaRole: {
      type: String,
      default: 'dialog',
      validator: value => ['dialog', 'alert', 'alertdialog'].includes(value),
    },

    /**
     * The modal button ARIA Label
     */
    ariaLabel: {
      type: String,
      default: 'Dismiss modal',
      required: false,
    },
  },

  data() {
    return {
      scrollbarWidth: 0,
      bodyElement: null,
      fixedElements: [],
      paddedElements: [],
    }
  },

  mounted() {
    this.bodyElement = document.body
    // TODO: find all fixed elements
    const siteHeader = document.querySelector('.m-site-header')

    siteHeader && this.fixedElements.push(siteHeader)
  },

  beforeDestroy() {
    // before the modal is unmounted, ensure that it tidies up after itself
    this.afterLeaveTransition()
  },

  methods: {
    /**
     * Sets up scrollbar and body before modal opens
     */
    beforeEnterTransition() {
      this.setScrollbarPadding()

      this.bodyElement.dataset.overflow = this.bodyElement.style.overflow
      this.bodyElement.classList.add('modal-open')
      this.bodyElement.style.overflow = 'hidden'
    },

    /**
     * Sets up scrollbar and body after modal closes
     */
    afterLeaveTransition() {
      const bodyOverflow = this.bodyElement.dataset.overflow

      if (typeof bodyOverflow === 'undefined' || bodyOverflow === '') {
        this.bodyElement.style.overflow = ''
      } else {
        this.bodyElement.style.bodyOverflow = bodyOverflow
        delete this.bodyElement.dataset.bodyOverflow
      }

      this.bodyElement.classList.remove('modal-open')
      this.resetScrollbarPadding()
    },

    /**
     * Emit the close modal event
     */
    closeModal() {
      /**
       * Close modal event
       *
       * @type {string}
       * @event 'close-modal'
       */
      this.$emit('close-modal')
    },

    /**
     * Gets the width of the browser's scrollbar
     *
     * @returns {number} the scrollbar width in pixels
     */
    getScrollbarWidth() {
      const scrollDiv = document.createElement('div')

      scrollDiv.style.cssText =
        'position: absolute; top: -9999px;width: 50px; height: 50px; overflow: scroll;'

      this.bodyElement.appendChild(scrollDiv)

      const scrollbarWidth =
        scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth

      this.bodyElement.removeChild(scrollDiv)

      return scrollbarWidth
    },

    /**
     * Check if the body is overflowing vertically
     *
     * @returns {boolean} whether the body is overflowing
     */
    isBodyOverflowing() {
      const rect = document.body.getBoundingClientRect()
      return rect.left + rect.right < window.innerWidth
    },

    /**
     * Sets the padding needed on elements if a scrollbar is present
     *
     * FIXME: if the modal isn't overflowing but the body is then the modal
     *  will appear too far to the right (by the scrollbar's width) due to
     *  there being no scrollbar on the overlay.
     * TODO: this currently doesn't consider position:sticky elements
     */
    setScrollbarPadding() {
      if (this.isBodyOverflowing()) {
        const scrollbarWidth = this.getScrollbarWidth()

        // Adjust the padding on any elements which are currently fixed position
        this.fixedElements.forEach(element => {
          if (window.getComputedStyle(element)['position'] === 'fixed') {
            this.setElementPadding(element, scrollbarWidth)
          }
        })

        // Adjust body padding
        this.setElementPadding(this.bodyElement, scrollbarWidth)
      }
    },

    /**
     * Get an element's padding
     *
     * @param {HTMLElement} element the element to get the padding from
     * @returns {object} the element's actual and calculated padding
     */
    getElementPadding(element) {
      const actualPadding = element.style.paddingRight
      const calculatedPadding = window.getComputedStyle(element)[
        'padding-right'
      ]

      return { actualPadding, calculatedPadding }
    },

    /**
     * Set an element's padding
     *
     * @param {HTMLElement} element the element on which to set the padding
     * @param {number} scrollbarWidth the scrollbar width
     */
    setElementPadding(element, scrollbarWidth) {
      const { actualPadding, calculatedPadding } = this.getElementPadding(
        element
      )

      element.dataset.paddingRight = actualPadding
      element.style.paddingRight = `${parseFloat(calculatedPadding) +
        scrollbarWidth}px`

      this.paddedElements.push(element)
    },

    /**
     * Reset the padding applied to element's for the scrollbar
     */
    resetScrollbarPadding() {
      this.paddedElements.forEach(element => this.resetElementPadding(element))
      this.paddedElements = []
    },

    /**
     * Reset an element's padding
     *
     * @param {HTMLElement} element the element on which to reset the padding
     */
    resetElementPadding(element) {
      const paddingRight = element.dataset.paddingRight

      if (typeof paddingRight === 'undefined') {
        element.style.paddingRight = ''
      } else {
        delete element.dataset.paddingRight
        element.style.paddingRight = paddingRight
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../../sass/framework/framework.scss';

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.px-modal {
  bottom: 0;
  display: flex;
  flex-direction: column;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  right: 0;
  top: 0;
  z-index: $zindex-modal-overlay + 1;

  // @include breakpoint(xs-up) {
  //   padding: 30px 15px;
  // }

  // // This forces a 30px margin below the overflowed modal
  // @include breakpoint(xs-up) {
  //   &::after {
  //     content: '';
  //     display: block;
  //     flex-shrink: 0;
  //     height: 30px;
  //     width: 100%;
  //   }
  // }

  // &__dialog {
  //   background-color: #fff;
  //   border-radius: 0;
  //   flex: 1 0 auto;
  //   margin: auto;
  //   max-width: 500px;
  //   padding: 50px 40px;
  //   position: relative;

  //   @include breakpoint(xs-up) {
  //     border-radius: 10px;
  //     flex: 0 0 auto;
  //     width: 80vw;
  //   }

  //   @include breakpoint(sm-up) {
  //     padding: 50px 60px;
  //     width: 70vw;
  //   }

  //   @include breakpoint(md-up) {
  //     width: 60vw;
  //   }
  // }

  &--top {
    .modal__dialog {
      margin: 0 auto auto auto;
    }
  }

  &--bottom {
    .modal__dialog {
      margin: auto auto 0 auto;
    }
  }

  &--narrow {
    padding: 30px 15px;

    .modal__dialog {
      border-radius: 10px;
      flex: 0 0;
      margin-left: auto;
      margin-right: auto;
      max-width: 350px;
    }
  }

  &--wide {
    .px-modal__dialog {
      max-width: $container-xs;
    }
  }

  &__close {
    background-color: #fff;
    border: none;
    color: $color-primary;
    cursor: pointer;
    font-size: 1.5em;
    height: 30px;
    padding: 0;
    position: absolute;
    right: 15px;
    top: 15px;
    transition: scale 0.5s;
    width: 30px;

    &::after {
      content: '\2715';
      display: block;
    }

    &:hover {
      scale: 1.2;
    }
  }
}
</style>
