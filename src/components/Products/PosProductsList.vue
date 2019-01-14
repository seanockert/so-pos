<template>
  <!--@enter="enter" @leave="leave" @after-enter="afterEnter" @before-leave="beforeLeave"-->
  <transition-group name="list-item" tag="ul" class="pos-products-list">
    <PosProduct v-for="(product, index) in products" :product="product" :key="product.id" :data-index="index" @add-to-cart="addToCart" />
    <li class="no-products" v-if="!products.length" key="no-products">No products found. <button class="add-product-link" @click="addProduct">Add one</button></li>
    <li class="add-product" v-if="products.length" @click="addProduct" key="add-product"><button>+</button></li>
  </transition-group>
</template>

<script>
import PosProduct from './PosProduct.vue';

export default {
  name: 'PosProductsList',
  components: {
    PosProduct
  },
  props: {
    products: Array
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    addToCart: function(id) {
      this.$emit('add-to-cart', id);
    },
    addProduct: function() {
      this.$emit('add-new-product', 'product');
    },
    // todo fix this
    afterEnter: function(el) {
      //el.classList.remove('fado-in')
    },
    enter: function(el, done) {
      var delay = el.dataset.index * 100;

      setTimeout(function() {
        el.classList.add('fado-in');
      }, delay);
    },
    beforeLeave: function(el) {
      //el.classList.remove('fado-out')
    },
    leave: function(el, done) {
      var delay = el.dataset.index * 100;
      setTimeout(function() {
        console.log(el);
        el.classList.add('fado-out');
      }, delay);
    }
  }
};
</script>

<style lang="scss" scoped>
.pos-products-list {
  display: grid;
  grid-auto-rows: 1fr;
  grid-gap: $base-padding;
  grid-template-columns: repeat(2, minmax(120px, 1fr));
  padding: $base-padding;

  > * {
    transition: all 0.15s ease-out;
  }
}

.no-products {
  font-size: 1.25rem;
  grid-column: 1/5;
  grid-row: 1;
  padding-top: $base-padding * 2;
  text-align: center;
}

.add-product-link {
  background-color: transparent;
  border-radius: $border-radius;
  color: $color-green;
  display: inline-block;
  margin: -$base-padding;
  padding: $base-padding;
  text-decoration: underline;
}

.add-product {
  button {
    background-color: transparent;
    border: 2px dashed $color-grey-blue;
    border-radius: $border-radius;
    color: $color-grey-blue;
    font-size: 4rem;
    height: 100%;
    opacity: 0.5;
    width: 100%;

    &:focus {
      background-color: #fff;
      box-shadow: none;
      opacity: 1;
    }

    &:active {
      background-color: $color-green;
      border: 2px solid $color-green;
      color: #fff;
      transform: scale(0.95);
    }
  }
}
/**/
.list-item-enter-active,
.list-item-leave-active {
  transition: opacity 0.15s, transform 0.15s;
  transform-origin: left center;
}

.list-item-enter,
.list-item-leave-to {
  opacity: 0;
  transform: translate3d(-2rem, 0, 0);
}

.fade-in {
  transition: opacity 3.15s, transform 3.15s;
  transform-origin: left center;
}

.fade-out {
  transition: opacity 3.15s, transform 3.15s;
  opacity: 0;
  transform: translate3d(-2rem, 0, 0);
}

@media screen and (min-width: 54.1rem) {
  .pos-products-list {
    grid-template-columns: repeat(3, minmax(160px, 1fr));
  }
}

@media screen and (min-width: 64.1rem) {
  .pos-products-list {
    grid-template-columns: repeat(4, minmax(160px, 1fr));
  }
}

@media screen and (min-width: 80.1rem) {
  .pos-products-list {
    grid-template-columns: repeat(5, minmax(160px, 1fr));
  }
}
</style>
