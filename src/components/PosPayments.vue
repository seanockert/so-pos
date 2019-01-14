<template>
  <section>
    <div>
      <header>
        <h2>Choose a payment option</h2>
      </header>
      <ul>
        <li v-for="payment in payments" :key="payment.id">
          <button @click="selectPayment(payment.id)" :class="{ 'active' : payment.active }">
            <input type="radio" name="paymentType" :value="payment.type"><h3>
            {{ payment.type }}</h3>
          </button>
        </li>
      </ul>
    </div>

    <footer>
      <button class="button confirm" @click="buildOrder" :disabled="!payment || cart.total == 0">Confirm order <svg width="24" height="24" viewBox="0 0 24 24"><path d="M0 3.795l2.995-2.98 11.132 11.185-11.132 11.186-2.995-2.981 8.167-8.205-8.167-8.205zm18.04 8.205l-8.167 8.205 2.995 2.98 11.132-11.185-11.132-11.186-2.995 2.98 8.167 8.206z"/></svg></button>
    </footer>
  </section>
</template>

<script>
export default {
  name: 'PosPayments',
  props: {
    payments: Array,
    cart: Object
  },
  computed: {
    payment: function() {
      return this.payments.filter(payment => {
        return payment.active === true
      })[0]
    }
  },
  methods: {
    buildOrder: function() {
      this.$emit('add-order')
    },
    selectPayment: function(id) {
      this.$emit('select-payment', id)
    }
  }
}
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
  margin-top: $base-padding /2;
}

h3 {
  font-size: 1.25em;
}

ul {
  display: grid;
  grid-gap: 0.75rem;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
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
