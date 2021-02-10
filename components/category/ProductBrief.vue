<template>
  <div :class="$style.wrapper">
    <nuxt-link :to="`/product/${product.pSlug}`">
      <p>{{ product.pName }}</p>
      <img
        v-lazy="product.image.imgL"
        :class="$style.image"
      />
    </nuxt-link>
    <p>Price {{ product.pPrice }}</p>
    <BuyButton :product="product" />
  </div>
</template>

<script>
import BuyButton from '@/components/common/BuyButton';
export default {
  name: 'ProductBrief',
  components: { BuyButton },
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
  @include globalWrapper;
  display: flex;
  flex-direction: column;
}

.image {
  width: 300px;
  height: 300px;
}
</style>
