<template>
  <li :key="item.id">
    <button @click="removeFromCart(item.id)">
      <figure><img :src="item.image" alt=""></figure>
      <span>{{ item.qty }}</span>
      <h3>{{ item.title }}</h3>
      <strong>{{ formatMoney(applyDiscount(item.price, item.discount) * item.qty) }}</strong>
    </button>
  </li>
</template>

<script>
import { helpers } from '../mixins/helpers';

export default {
  name: 'PosCartItem',
  mixins: [helpers],
  props: {
    item: Object
  },
  methods: {
    removeFromCart: function(id) {
      this.$emit('remove-from-cart', id);
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  align-items: center;
  background-color: transparent;
  display: flex;
  font-weight: bold;
  padding: $base-padding;
  text-align: left;
  width: 100%;

  > * {
    flex: 0 0 2.5rem;
  }

  > h3 {
    flex: 1;
  }

  &:focus {
    background-color: $color-lightest-grey;
    z-index: 10;
  }

  &:active {
    background-color: $color-light-grey;
  }
}

span {
  text-align: center;
}

h3 {
  display: block;
  font-size: 1rem;
}

strong {
  color: $color-grey-blue;
}
</style>
