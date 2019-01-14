<template>
  <section>
    <header>
      <PosProductsSearch :products="products" @filter-products="filterProducts" @open-modal="openModal" />
      <PosProductsCategories :categories="categories" @filter-products="filterProducts" />
    </header>
    <PosProductsList v-if="!loading" :products="products" @add-to-cart="addToCart" @add-new-product="openModal" />
    
    <transition-group name="list-item" tag="ul" class="skeleton-products" v-if="loading">
      <li key="sk1"></li>
      <li key="sk2"></li>
      <li key="sk3"></li>
      <li key="sk4"></li>
      <li key="sk5"></li>
      <li key="sk6"></li>
    </transition-group>
  </section>
</template>

<script>
import PosProductsCategories from './PosProductsCategories.vue';
import PosProductsSearch from './PosProductsSearch.vue';
import PosProductsList from './PosProductsList.vue';

export default {
  name: 'PosProducts',
  components: {
    PosProductsCategories,
    PosProductsSearch,
    PosProductsList
  },
  props: {
    products: Array,
    categories: Array,
    cart: Array,
    loading: Boolean
  },
  created() {
    window.addEventListener('scroll', this.scrollProducts);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollProducts);
  },
  methods: {
    addToCart: function(id) {
      this.$emit('add-to-cart', id);
    },
    scrollProducts(e) {
      console.log(e);
    },
    filterProducts(value, type) {
      this.$emit('filter-products', value, type);
    },
    openModal: function(type) {
      this.$emit('open-modal', type);
    }
  }
};
</script>


<style lang="scss" scoped>
@import '../../assets/scss/_skeleton.scss';
</style>
