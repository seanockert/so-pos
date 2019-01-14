<template>
  <ul>
    <li><span>Subtotal:</span> <strong>{{ formatMoney(subtotal) }}</strong></li>
    <li><span>Discounts:</span> <strong>{{ formatMoney(discounts) }}</strong></li>
    <li v-if="tax > 0"><span>Tax ({{ tax }}%):</span> <strong>{{ calcTax(total, tax) }}</strong></li>
    <li class="pos-cart-total"><span>Total:</span> <strong>{{ formatMoney(total) }}</strong></li>
  </ul>
</template>

<script>
import { helpers } from '../mixins/helpers';

export default {
  name: 'PosCartSummary',
  mixins: [helpers],
  props: {
    subtotal: Number,
    discounts: Number,
    tax: Number,
    total: Number
  }
};
</script>

<style lang="scss" scoped>
ul {
  background-color: $color-lightest-grey;
  border-radius: $border-radius;
  padding: $base-padding;

  > * + * {
    padding-top: $base-padding;
  }
}

li {
  align-items: center;
  display: flex;
  justify-content: space-between;

  &.pos-cart-total {
    strong {
      font-size: 1.5rem;
    }
  }
}

strong {
  color: $color-text;
}
</style>
