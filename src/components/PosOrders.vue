<template>
  <section>
    <div>
      <header>
        <h2>All orders</h2>
      </header>
      <ul>
        <li v-for="order in sortedOrders" :key="order.id">
          <button @click="viewOrder(order.id)" :class="{ 'active' : order.active }">
            <h3>Order #{{ order.id }}</h3>
            <p>{{ formatDateTime(order.timestamp) }}</p>
          </button>
        </li>
      </ul>
    </div>
    <footer>
      <button class="button back" @click="changeSection(0)"><svg width="24" height="24" viewBox="0 0 24 24"><path d="M0 3.795l2.995-2.98 11.132 11.185-11.132 11.186-2.995-2.981 8.167-8.205-8.167-8.205zm18.04 8.205l-8.167 8.205 2.995 2.98 11.132-11.185-11.132-11.186-2.995 2.98 8.167 8.206z" transform = "rotate(180 12 12)" /></svg> Done</button>
    </footer>
  </section>
</template>

<script>
import { helpers } from './mixins/helpers';

export default {
  name: 'PosOrders',
  mixins: [helpers],
  props: {
    orders: Array
  },
  data() {
    return {
      sortedOrders: []
    }
  },
  created: function() {
    this.sortedOrders = this.sortByDate(JSON.parse(JSON.stringify(this.orders)));
    console.log(this.sortedOrders)
  },
  methods: {
    viewOrder: function(id) {
      this.$emit('view-order', id);
    },
    changeSection(section) {
      this.$emit('change-section', section);
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  align-items: start;
  display: grid;
  grid-template-rows: auto 5rem;
  padding: $base-padding;
}

footer {
  align-self: end;
}

h2 {
  margin-top: $base-padding / 2;
}

h3 {
  font-size: 1.25em;
}

ul {
  display: grid;
  grid-gap: 0.75rem;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  transition: none;
}

button {
  background-color: $color-light-grey;
  border-radius: $border-radius;
  color: $color-grey-blue;
  height: 100%;
  padding: $base-padding;
  width: 100%;

  input {
    display: none;
  }

  &:hover,
  &:focus {
    background-color: #fff;
  }

  &:active,
  &.active {
    background-color: $color-grey-blue;
    color: #fff;
  }
}
</style>
