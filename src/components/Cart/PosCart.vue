<template>
  <section>
    <header>
      <h2>{{ itemCount }}</h2>
      <span>
        <button @click="changeSection(3)"> <!--@click="openModal('settings')"-->
          <svg width="20" height="20" viewBox="0 0 24 24"><title>Settings</title><path d="M6 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"/></svg>
        </button>
      </span>
    </header>

    <ul>
      <PosCartItem v-for="item in cart.items" :item="item" @remove-from-cart="removeFromCart" />
      <li v-show="cart.length == 0" class="empty">Cart empty</li>
    </ul>

    <footer>
      <PosCartSummary :subtotal="cart.subtotal" :discounts="cart.discounts" :tax="tax" :total="cart.total" />

      <button v-show="section == 0" class="button confirm" @click="changeSection(1)" :disabled="cart.items.length == 0">Pay <svg width="24" height="24" viewBox="0 0 24 24"><path d="M0 3.795l2.995-2.98 11.132 11.185-11.132 11.186-2.995-2.981 8.167-8.205-8.167-8.205zm18.04 8.205l-8.167 8.205 2.995 2.98 11.132-11.185-11.132-11.186-2.995 2.98 8.167 8.206z"/></svg></button>
 
      <button v-show="section == 1" class="button back" @click="changeSection(section-1)"><svg width="24" height="24" viewBox="0 0 24 24"><path d="M0 3.795l2.995-2.98 11.132 11.185-11.132 11.186-2.995-2.981 8.167-8.205-8.167-8.205zm18.04 8.205l-8.167 8.205 2.995 2.98 11.132-11.185-11.132-11.186-2.995 2.98 8.167 8.206z" transform = "rotate(180 12 12)" /></svg> Back</button>
    </footer>
  </section>
</template>

<script>
import PosCartSummary from './PosCartSummary.vue';
import PosCartItem from './PosCartItem.vue';
import { helpers } from '../mixins/helpers';

export default {
  name: 'PosCart',
  components: {
    PosCartSummary,
    PosCartItem
  },
  mixins: [helpers],
  props: {
    cart: Object,
    section: Number,
    tax: Number,
  },
  computed: {
    itemCount: function() {
      // Sum up quantities of all items in cart
      const count = this.cart.items.reduce((acc, value) => {
        return acc + value.qty;
      }, 0);
      return count > 0
        ? count + ' ' + this.$options.filters.pluralise('item', count)
        : 'Current order';
    }
  },
  methods: {
    removeFromCart: function(id) {
      this.$emit('remove-from-cart', id);
    },
    changeSection: function(section) {
      this.$emit('change-section', section);
    },
    openModal: function(type) {
      this.$emit('open-modal', type);
    }
  },
  filters: {
    pluralise: function(word, n) {
      return n === 1 ? word : word + 's';
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  align-items: start;
  background: #fff;
  display: grid;
  grid-template-rows: 3.5rem auto 14rem;
  height: 100vh;
  overflow: hidden;

  > ul {
    max-height: calc(100vh - 17.5rem);
    overflow-y: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
  }
}

header {
  align-items: center;
  border-bottom: 1px solid $color-lightest-grey;
  display: flex;
  justify-content: space-between;
  padding: $base-padding;
  text-align: left;

  > * {
    flex: 1 1 auto;
  }

  time {
    font-weight: normal;
  }

  span {
    text-align: right;
  }

  button {
    padding: $base-padding/2 $base-padding;
    background-color: $color-light-grey;
    border-radius: $border-radius;
    text-align: right;

    svg {
      display: block;
      fill: $color-grey-blue;
    }

    &:active {
      background-color: $color-grey-blue;

      svg {
        fill: #fff;
      }
    }
  }
}

h2,
h3 {
  margin: 0;
  font-size: 1.25rem;
  display: inline-block;
}

li {
  &.empty {
    text-align: center;
    opacity: 0.5;
    padding-top: $base-padding * 2;
  }
}

footer {
  align-self: end;
  background-color: #fff;
  padding: $base-padding;
  position: relative;

  &::before {
    top: -1rem;
    background: linear-gradient(to top, #fff, rgba(255, 255, 255, 0));
    content: '';
    display: block;
    height: 1rem;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 10;
  }

  .button {
    margin-top: $base-padding;
  }
}

@media screen and (max-width: 40rem) {
  /*section {
    position: fixed;
    bottom: 0;
    transform: translate3d(0, 52%, 0);
    width: 100%;
  }*/

  h2 {
    font-size: 1rem;
  }
}


</style>
