<template>
  <!--<transition-group name="main" tag="main" :class="{['pos-section-' + section] : true }">-->
  <main :class="{['pos-section-' + section] : true }">
    <PosProducts 
      :products="filteredProducts" 
      :categories="categories"
      :loading="loading"
      @add-to-cart="addToCart" 
      @open-modal="openModal"
      @filter-products="filterProducts"
      v-show="section == 0"
      class="pos-products"
    />
    <PosCart 
      :cart="cart" 
      :section="section"
      :tax="tax" 
      @open-modal="openModal"
      @remove-from-cart="removeFromCart" 
      @change-section="changeSection"
      v-show="section < 2"
      class="pos-cart"
    />
    <PosPayments 
      :payments="payments"
      :cart="cart"
      @select-payment="selectPayment"
      @add-order="addOrder" 
      @change-section="changeSection"
      v-show="section < 2"
      class="pos-payments"
    />
    <PosOrders
      :orders="orders"
      @view-order="viewOrder"
      @change-section="changeSection"
      v-show="section == 3"
      class="pos-orders"
    />
    <PosOrder
      :order="currentOrder" 
      @change-section="changeSection" 
      v-show="section == 2"
      class="pos-order"
    />
  </main>
</template>

<script>
import PosProducts from './Products/PosProducts.vue';
import PosPayments from './PosPayments.vue';
import PosOrders from './PosOrders.vue';
import PosOrder from './PosOrder.vue';
import PosCart from './Cart/PosCart.vue';

// localStorage persistence
const STORAGE_KEY = 'so-pos-orders';

export default {
  name: 'PosMain',
  components: {
    PosProducts,
    PosPayments,
    PosOrders,
    PosOrder,
    PosCart
  },
  props: {
    categories: Array,
    products: Array,
    filteredProducts: Array,
    payments: Array,
    orders: Array,
    cart: Object,
    currentOrder: Object,
    loading: Boolean,
    tax: Number
  },
  data() {
    return {
      section: 0
    };
  },
  methods: {
    changeSection: function(section) {
      this.section = section;
    },
    addToCart: function(id) {
      this.$emit('add-to-cart', id);
    },
    removeFromCart: function(id) {
      this.$emit('remove-from-cart', id);
    },
    filterProducts: function(value, type = '') {
      this.$emit('filter-products', value, type);
    },
    selectPayment: function(id) {
      this.$emit('select-payment', id);
    },
    addOrder: function() {
      this.$emit('add-order');

      // Proceed to order summary
      this.changeSection(2);
    },
    viewOrder: function(id) {
      // Change the current order
      this.$emit('view-order');

      // Change view to order
      this.changeSection(2);
    },
    openModal: function(type) {
      this.$emit('open-modal', type);
    },
    addProduct: function(product) {
      this.$emit('add-product', product);
    }
  }
};
</script>

<style lang="scss">
/* Product layout - essential grid classes */
main {
  background-color: $color-lightest-grey;
  display: grid;
  align-items: center;
  grid-template-columns: minmax(10rem, 20rem) auto minmax(10rem, 20rem);
  //grid-template-areas: 'a b c';
  overflow: hidden;

  > * {
    align-self: start;
    transition: all 0.15s ease-out;
    height: 100vh;
    overflow-y: scroll;
    position: relative;
    -webkit-overflow-scrolling: touch;
  }

  &.pos-section-1 {
    .pos-products {
      grid-column: 1 / -1;
      transform: translate3d(-100%, 0, 0);
    }

    .pos-cart {
      grid-column: 1 / 2;

      header {
        button {
          opacity: 0;
        }
      }
    }

    .pos-payments {
      grid-column: 2 / 4;
      transform: translate3d(0, 0, 0);
    }
  }

  &.pos-section-2 {
    .pos-payments {
      grid-column: 1 / 4;
      transform: translate3d(-100%, 0, 0);
    }

    .pos-order {
      grid-column: 1 / 4;
      transform: translate3d(0, 0, 0);
    }
  }

  &.pos-section-3 {
    .pos-orders {
      grid-column: 1 / 4;
    }
  }
}

.pos-products {
  grid-column: 1 / 3;
  transform: translate3d(0, 0, 0);
}

.pos-cart {
  grid-column: 3 / 4;
}

.pos-payments {
  grid-column: 2 / 4;
  transform: translate3d(100%, 0, 0);
}

@media screen and (max-width: 40rem) {
  main {
    display: block;
    grid-template-columns: none;
    padding-bottom: $base-padding * 6;
  }
}

/*
.main-enter-active, 
.main-leave-active {
  //transform: translate3d(0,0,0)
}

.main-enter {
  //transform: translate3d(100%,0,0)
  //opacity: 0;
}

.main-enter-to {
  transform: translate3d(0,0,0);
}

.main-leave-to {
  transform: translate3d(-100%,0,0);
  //opacity: 0;
}
*/
</style>
