<template>
  
  <div id="app" :class="{ 'show-modal' : showModal }">   
    <PosMain 
      :categories="categories"
      :products="products"
      :filteredProducts="filteredProducts"
      :payments="payments"
      :orders="orders"
      :currentOrder="currentOrder"
      :cart="cart"
      :tax="tax"
      :loading="loading" 
      @add-to-cart="addToCart"
      @remove-from-cart="removeFromCart"  
      @filter-products="filterProducts"  
      @select-payment="selectPayment"  
      @view-order="viewOrder"  
      @add-order="addOrder"  
      @add-product="addProduct"  
      @open-modal="openModal" 
    />
    <router-view>Page.</router-view>
    
    <div class="modal">
      <PosCalculator v-if="modalType == 'calculator'" />
      <PosSettings v-if="modalType == 'settings'" />
      <PosNewProduct v-if="modalType == 'product'" @add-product="addProduct" />
      <button class="modal-close" @click="showModal = false">&times;</button>
    </div>
    <div class="overlay" @click="showModal = false"></div>
  </div>
</template>

<script>
import PosMain from './components/PosMain.vue';
import PosCalculator from './components/PosCalculator.vue';
import PosSettings from './components/PosSettings.vue';
import PosNewProduct from './components/Products/PosNewProduct.vue';

// localStorage persistence
const STORAGE_KEY = 'so-pos-orders';

export default {
  name: 'app',
  components: {
    PosMain,
    PosCalculator,
    PosSettings,
    PosNewProduct
  },
  data() {
    return {
      categories: [],
      currentCategory: { id: 0 },
      products: [],
      filteredProducts: [],
      payments: [],
      orders: [],
      cart: {
        items: [],
        subtotal: 0,
        discounts: 0,
        total: 0
      },
      currentOrder: null,
      tax: 10,
      loading: true,
      useLocalData: true,
      showModal: false,
      modalType: ''
    };
  },
  created: function() {
    this.init();
  },
  methods: {
    init: function() {
      this.loading = true;

      // Get all data from a JSON endpoint or local
      this.$http.get('data/products.json').then(
        response => {
          // Original unchanged values
          this.products = response.body.products;
          this.categories = response.body.categories;
          this.payments = response.body.payments;
          this.orders = this.fetchOrders();

          // Duplicate the array but keep the original for any variable changes
          this.filteredProducts = JSON.parse(
            JSON.stringify(response.body.products)
          );

          this.loading = false;
        },
        response => {
          console.log('Sorry, no products available.');
          this.loading = false;
        }
      );
    },
    addToCart: function(id) {
      // Check if product exists
      const product = this.products.filter(product => {
        return product.id === id;
      })[0];

      // Don't add if no stock
      if (!product || !product.stock) return;

      // Check if product is already in the cart
      const productInCart = this.cart.items.filter(product => {
        return product.id === id;
      })[0];

      if (productInCart) {
        // Update quantity
        productInCart.qty++;
      } else {
        // Add new product to cart
        let cartProduct = Object.assign({}, product);

        cartProduct.qty = 1;
        cartProduct.timestamp = Date.now();

        this.cart.items.push(cartProduct);
      }

      this.updateStock(id, 'decrement');
      this.updateTotal();
    },
    removeFromCart: function(id) {
      if (!this.cart.items) return;

      this.cart.items = this.cart.items.filter(product => {
        if (product.qty > 1 && product.id === id) {
          product.qty--;
          return true;
        }
        return product.id !== id;
      });

      this.updateStock(id, 'increment');
      this.updateTotal();
    },
    updateStock: function(id, type = 'decrement') {
      this.products = this.products.map(product => {
        if (product.id == id) {
          if (type == 'decrement' && product.stock > 0) {
            product.stock--;
          } else if (type == 'increment') {
            product.stock++;
          }
        }
        return product;
      });

      // Refilter products
      this.filterProducts(this.currentCategory.id, 'category');
    },
    updateTotal: function() {
      this.cart.subtotal = this.cart.items.reduce((acc, product) => {
        return acc + parseInt(product.price) * product.qty;
      }, 0);

      // Use helper function instead
      this.cart.discounts = this.cart.items.reduce((acc, product) => {
        if (product.discount) {
          if (product.discount.type == 'percent') {
            return (
              acc + (product.discount.value / 100) * product.price * product.qty
            );
          }
        } else {
          return acc;
        }
      }, 0);

      this.cart.total = this.cart.subtotal - this.cart.discounts;
    },
    filterProducts: function(value, type = '') {
      // @todo more advanced search queries eg. "price < 10"

      if (type == 'search') {
        const regexp = new RegExp(value, 'i');

        this.filteredProducts = this.products.filter(product => {
          return regexp.test(product.title) || regexp.test(product.description);
        });
      } else if (type == 'category') {
        if (value > 0) {
          this.filteredProducts = this.products.filter(product => {
            return product.category == value;
          });
        } else {
          this.filteredProducts = JSON.parse(JSON.stringify(this.products));
        }

        this.categories = this.categories.map(category => {
          if (category.id === value) {
            category.active = true;
            this.currentCategory = category;
          } else {
            category.active = false;
          }
          // Alternative to above
          //category.active = category.id === value ? true : false
          return category;
        });
      }
    },
    selectPayment: function(id) {
      // @todo callback for each payment
      this.payments = this.payments.map(payment => {
        payment.active = payment.id === id ? true : false;
        return payment;
      });
    },
    viewOrder: function(id) {
      this.currentOrder = this.orders.filter(order => {
        return order.id === id;
      })[0];
    },
    addOrder: function() {
      // Called when an order is successful. Create a finalised order
      let order = JSON.parse(JSON.stringify(this.cart));

      order.terminal = 1; // Give each terminal an ID
      order.timestamp = Date.now();
      order.id = order.timestamp; //@todo replace this
      order.tax = this.tax;
      order.itemCount = this.cart.items.reduce((acc, value) => {
        return acc + value.qty;
      }, 0);

      order.payment = this.payments.filter(payment => {
        return payment.active == true;
      })[0];

      this.currentOrder = order;
      // Add to order array @todo push to API endpoint
      this.orders.push(order);
      this.saveOrders();

      this.cart = [];
    },
    fetchOrders: function() {
      if (this.useLocalData) {
        console.log('Fetch orders from local storage');
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      }
      return;
    },
    deleteOrders: function() {
      if (confirm('Delete all orders?')) {
        if (this.useLocalData) {
          localStorage.setItem(STORAGE_KEY, '');
        }
      }
    },
    saveOrders: function() {
      if (this.useLocalData) {
        // Save as stringified array
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.orders));
        console.log('Save orders to local storage');
      }
    },
    openModal: function(type) {
      this.showModal = true;
      this.modalType = type;
    },
    addProduct: function(product) {
      if (!product) return;

      this.showModal = false;

      product.id = this.products.length;
      this.products.push(product);
      console.log('Added new product');
      this.filterProducts(product.category, 'category');
    }
  }
};
</script>

<style lang="scss">
@import './assets/scss/_modal.scss';

/* Boilerplate */
*,
*:before,
*:after {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
  font-size: 1em;
  line-height: 1.5;
  background-color: $color-lightest-grey;
  color: $color-grey-blue;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  height: 100vh;
  overflow: hidden;
  position: relative;
}

html,
body,
ul,
figure {
  margin: 0;
  padding: 0;
}

figure {
  overflow: hidden;

  img {
    display: block;
    height: inherit;
    width: 100%;
  }
}

h2,
h3 {
  line-height: 1.3;
}

ul {
  list-style: none;
}

button {
  font-size: inherit;
  border: none;
  transition: transform 0.15s ease-out, background-color 0.15s ease-out;
}

button,
input {
  line-height: 1;
}

button,
a,
input,
select {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-appearance: none;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px lightBlue;
  }
}

// Global button styles
.button.confirm {
  @include button(#fff, $color-green);

  svg {
    float: right;
    fill: #fff;
    opacity: 0.7;
  }

  &:disabled {
    //background-color: $color-grey-blue;
  }
}

.button.back {
  @include button($color-text, #ddd);

  svg {
    float: left;
    fill: $color-text;
    opacity: 0.7;
  }
}

section {
  header {
    text-align: center;
  }
}

// @todo move to own file
input,
select,
textarea {
  border: 1px solid #ddd;
  font-family: inherit;
  font-size: inherit;
  padding: $base-padding/2;
  width: 100%;
}
</style>
