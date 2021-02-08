<template>
  <div>
    <h1>{{ category.cName }}</h1>
    <p>{{ category.cDesc }}</p>
    <div :class="$style.productList">
      <div v-for="product in category.products" :key="product.id">
        <ProductBrief :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductBrief from '~/components/ProductBrief';

export default {
  components: { ProductBrief },
  async asyncData({ app, params, route, error }) {
    try {
      await app.store.dispatch('getCurrentCategory', { route });
    } catch (e) {
      console.log(e);
      return error({
        statusCode: 404,
        message: 'Категория не найдена или сервер не доступен',
      });
    }
  },
  head() {
    return {
      title: this.category.cTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.category.cMetaDescription,
        },
      ],
    };
  },
  computed: {
    ...mapState({
      category: 'currentCategory',
    }),
  },
};
</script>

<style lang="scss" module>
.productList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
