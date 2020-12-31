<template>
  <div
    class="docs-swatch"
    :style="{ background: color }"
    :class="{
      'docs-swatch--light': light,
    }"
  >
    <div class="docs-swatch__inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'docs-swatch',
  props: {
    color: {
      type: String,
      required: true,
    },
    // For light colours, change the text to dark
    light: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style scoped lang="scss">
@import '~@/sass/framework/framework';
.docs-swatch {
  align-items: center;
  color: $color-white;
  display: inline-flex;
  height: 5em;
  justify-content: center;
  padding: $pad-v-sm $pad-h-sm;
  text-align: center;
  vertical-align: middle;
  width: 5em;

  &--light {
    color: $color-black;
  }
}
</style>
