// function for Mock API
// eslint-disable-next-line promise/param-names
const sleep = (m) => new Promise((r) => setTimeout(r, m));
const categories = [
  {
    id: 'cats',
    cTitle: 'Котики',
    cName: 'Котики',
    cSlug: 'cats',
    cMetaDescription: 'Мета описание',
    cDesc: 'Описание',
    cImage: 'https://source.unsplash.com/300x300/?cat,cats',
    products: [],
  },
  {
    id: 'dogs',
    cTitle: 'Собачки',
    cName: 'Собачки',
    cSlug: 'dogs',
    cMetaDescription: 'Мета описание',
    cDesc: 'Описание',
    cImage: 'https://source.unsplash.com/300x300/?dog,dogs',
    products: [],
  },
  {
    id: 'wolfs',
    cTitle: 'Волчки',
    cName: 'Волчки',
    cSlug: 'wolfs',
    cMetaDescription: 'Мета описание',
    cDesc: 'Описание',
    cImage: 'https://source.unsplash.com/300x300/?wolf',
    products: [],
  },
  {
    id: 'bulls',
    cTitle: 'Бычки',
    cName: 'Бычки',
    cSlug: 'bulls',
    cMetaDescription: 'Мета описание',
    cDesc: 'Описание',
    cImage: 'https://source.unsplash.com/300x300/?bull',
    products: [],
  },
];

function getProduct(products, productImages, productSlug) {
  const innerProduct = products.find((p) => p.pSlug === productSlug);
  if (!innerProduct) return null;
  return {
    ...innerProduct,
    images: productImages.find((img) => img.id === innerProduct.id).urls,
    category: categories.find((cat) => cat.id === innerProduct.category_id),
  };
}

function addProductsToCategory(products, productImages, category) {
  const categoryInner = { ...category, products: [] };

  products.forEach((p) => {
    if (p.category_id === category.id) {
      categoryInner.products.push({
        id: p.id,
        pName: p.pName,
        pSlug: p.pSlug,
        pPrice: p.pPrice,
        image: productImages.find((img) => img.id === p.id).urls,
      });
    }
  });
  return categoryInner;
}

function getBreadcrumbs(pageType, route, data) {
  const crumbs = [];
  crumbs.push({
    title: 'Главная',
    url: `/category/${data.cSlug}`,
  });
  switch (pageType) {
    case 'category':
      crumbs.push({
        title: data.cName,
        url: `/category/${data.cSlug}`,
      });
      break;
    case 'product':
      crumbs.push({
        title: data.category.cName,
        url: `/category/${data.category.cSlug}`,
      });
      crumbs.push({
        title: data.pName,
        url: `/product/${data.pSlug}`,
      });

      break;

    default:
      break;
  }
  return crumbs;
}

export const state = () => ({
  categoriesList: [],
  currentCategory: {},
  currentProduct: {},
  breadcrumbs: [],
});

export const mutations = {
  SET_CATEGORIES_LIST(state, categories) {
    state.categoriesList = categories;
  },
  SET_CURRENT_CATEGORY(state, category) {
    state.currentCategory = category;
  },
  SET_CURRENT_PRODUCT(state, product) {
    state.currentProduct = product;
  },
  SET_BREADCRUMBS(state, crumbs) {
    state.breadcrumbs = crumbs;
  },
  RESET_BREADCRUMBS(state) {
    state.breadcrumbs = [];
  },
};

export const actions = {
  async setBreadcrumbs({ commit }, data) {
    await commit('SET_BREADCRUMBS', data);
  },

  async getCategoriesList({ commit }) {
    try {
      await sleep(1000);
      await commit('SET_CATEGORIES_LIST', categories);
    } catch (err) {
      console.log(err);
      throw new Error('Внутренняя ошибка');
    }
  },

  async getCurrentCategory({ commit, dispatch }, { route }) {
    await sleep(1000);
    const category = categories.find(
      (cat) => cat.cSlug === route.params.CategorySlug
    );

    const [products, productImages] = await Promise.all([
      this.$axios.$get('/mock/products.json'),
      this.$axios.$get('/mock/products-images.json'),
    ]);
    const crumbs = getBreadcrumbs('category', route, category);
    await dispatch('setBreadcrumbs', crumbs);
    await commit(
      'SET_CURRENT_CATEGORY',
      addProductsToCategory(products, productImages, category)
    );
  },

  async getCurrentProduct({ commit, dispatch }, { route }) {
    await sleep(300);
    const productSlug = route.params.ProductSlug;
    const [products, productImages] = await Promise.all([
      this.$axios.$get('/mock/products.json'),
      this.$axios.$get('/mock/products-images.json'),
    ]);
    const product = getProduct(products, productImages, productSlug);
    const crumbs = getBreadcrumbs('product', route, product);
    await dispatch('setBreadcrumbs', crumbs);
    await commit('SET_CURRENT_PRODUCT', product);
  },
};
