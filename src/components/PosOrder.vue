<template>
  <section>
    <div>
      <div v-if="order">
        <header>
          <h2>Order #{{ order.id }}</h2>
          <p>{{ formatDateTime(order.timestamp) }} | {{ order.itemCount }} items</p>
          <span class="stamp">Paid</span>
        </header>

        <ul>
          <li v-for="product in order.cart" :key="product.id">
            <figure><img :src="product.image" alt=""></figure>
            <span>
              <h3><span>{{ product.qty }}</span> {{ product.title }}</h3>
            </span>
            <strong>{{ formatMoney(product.price * product.qty) }}</strong>
          </li>
        </ul>
        <footer>
          <PosCartSummary :subtotal="order.subtotal" :discounts="order.discounts" :tax="order.tax" :total="order.total" />
        </footer>
      </div>
    </div>

    <footer>
      <button class="button back" @click="changeSection(0)"><svg width="24" height="24" viewBox="0 0 24 24"><path d="M0 3.795l2.995-2.98 11.132 11.185-11.132 11.186-2.995-2.981 8.167-8.205-8.167-8.205zm18.04 8.205l-8.167 8.205 2.995 2.98 11.132-11.185-11.132-11.186-2.995 2.98 8.167 8.206z" transform = "rotate(180 12 12)" /></svg> Done</button>
    </footer>
  </section>
</template>

<script>
import PosCartSummary from './Cart/PosCartSummary.vue';
import { helpers } from './mixins/helpers';

export default {
  name: 'PosOrder',
  mixins: [helpers],
  components: {
    PosCartSummary
  },
  props: {
    order: Object
  },
  methods: {
    changeSection(section) {
      this.$emit('change-section', section);
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
main {
  //grid-template-columns: 1fr;
}

section {
  align-items: start;
  display: grid;
  grid-template-rows: auto 5rem;
  padding: $base-padding;

  > div {
    max-height: 100%;
    overflow-y: auto;
    padding: $base-padding 0;

    > div {
      background-color: #fff;
      box-shadow: $box-shadow;
      width: 100%;
      padding: $base-padding;
      margin: 0 auto;
      max-width: 40rem;
    }
  }
}

header {
  position: relative;
}

li {
  padding: $base-padding;
  display: flex;
  width: 100%;
  text-align: left;
  align-items: center;

  > * {
    flex: 0 0 3rem;
  }

  > span {
    flex: 1;
  }

  figure {
    margin-right: $base-padding;

    img {
      width: 3rem;
    }
  }

  h3 {
    display: block;
    font-size: 1rem;

    span {
      display: inline-block;
      padding: 0 $base-padding 0 $base-padding/2;
    }
  }

  strong {
    color: $color-grey-blue;
    text-align: right;
  }
}

.stamp {
  color: red;
  border: 2px solid red;
  border-radius: $border-radius;
  font-size: 1.5rem;
  letter-spacing: 0.06rem;
  line-height: 1;
  padding: $base-padding $base-padding * 2;
  position: absolute;
  right: $base-padding;
  text-transform: uppercase;
  top: 0;
  transform: rotate(16deg);
}
</style>
