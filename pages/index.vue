<template>
  <div :class="$style.wrapper">
    <h1>Интернет-магазин "Хвостики"</h1>
    <CategoriesList :categories="categories" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CategoriesList from '~/components/CategoriesList';

export default {
  components: { CategoriesList },
  async asyncData({ app, route, params, error, store }) {
    try {
      await store.dispatch('getCategoriesList');
    } catch (e) {
      return error({
        statusCode: 404,
        message: 'Категории не найдены',
      });
    }
  },
  computed: {
    ...mapState({
      categories: 'categoriesList',
    }),
  },
};
</script>

<style lang="scss" module>
.wrapper {
  @include globalWrapper;
}
</style>
