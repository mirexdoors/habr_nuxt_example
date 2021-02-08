<template>
  <div :class="$style.wrapper">
    <nuxt-link :to="`/product/${product.pSlug}`">
      <p>{{ product.pName }}</p>
      <img v-lazy="product.image" :class="$style.image" />
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'ProductBrief',
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" module>
.wrapper {
  display: flex;
  flex-direction: column;
}

.image {
  width: 300px;
  height: 300px;
}
</style>
