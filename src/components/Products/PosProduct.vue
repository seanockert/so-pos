<template>
  <li :data-id="product.id">
    <button @click.prevent="addToCart" :class="{ 'low-stock' : product.stock == 1}" :disabled="product.stock == 0">
      <figure>
        <img :src="product.image" alt="" height="512" width="512">
        <h3>{{ product.title }}</h3>
        {{ product.description }}
      </figure>
      <div :class="{ 'discount' : product.discount }">
        <em v-if="product.discount">{{ formatMoney(applyDiscount(product.price, product.discount)) }}</em> 
        <strong>{{ formatMoney(product.price) }}</strong> 
        <svg width="24" height="24" viewBox="0 0 24 24"><title>Add</title><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg>
      </div>
    </button>
  </li>
</template>

<script>
import { helpers } from '../mixins/helpers';

export default {
  name: 'PosProduct',
  mixins: [helpers],
  props: {
    product: Object
  },
  methods: {
    addToCart: function() {
      this.$emit('add-to-cart', this.product.id);
    }
  }
};
</script>

<style lang="scss" scoped>
li {
  align-self: end;
  height: 100%;
}

button {
  background-color: $color-light-grey;
  border-radius: $border-radius;
  color: $color-grey-blue;
  height: inherit;
  padding: 0;
  position: relative;
  width: 100%;
  box-shadow: $box-shadow;

  &:disabled {
    background-color: transparent;
    box-shadow: none;
    overflow: hidden;

    > * {
      background-color: transparent;
      filter: grayscale(100%);
      opacity: 0.8;
    }

    &:before {
      background-color: rgba(230, 235, 241, 0.8);
      color: $color-text;
      content: 'Out of stock';
      display: block;
      font-size: 1.25rem;
      left: -10%;
      padding: $base-padding;
      position: absolute;
      text-align: center;
      top: 30%;
      transform: rotate(-10deg);
      width: 120%;
      z-index: 10;
    }
  }

  &:active:not(:disabled) {
    animation: scale 0.15s ease-out;
    animation-fill-mode: forwards;

    svg {
      fill: $color-green;
    }
  }

  &:focus {
    transform: scale(1);
    box-shadow: $box-shadow;
  }
}

// Encloses the image, title, description
figure {
  background-color: #fff;
  border-radius: $border-radius;
  overflow: hidden;
  padding-bottom: 1rem;
  //height: calc(100% - 3rem);

  img {
    height: auto;
    width: 100%;

    &:before {
      content: '';
      display: block;
      padding-top: 100%;
    }
  }
}

h3 {
  font-size: 1.25rem;
  margin: 0.5rem;
}

// Encloses the price
div {
  font-weight: bold;
  line-height: 2rem;
  padding: 0.5rem;
  text-align: left;

  em {
    color: $color-grey-blue;
    font-style: normal;
    margin-right: $base-padding/2;
  }

  &.discount {
    strong {
      text-decoration: line-through;
    }
  }
}

// Add icon
svg {
  fill: $color-grey-blue;
  float: right;
  margin-top: 0.25rem;
  transition: all 0.15s ease-out;
  transform-origin: center center;
}

@keyframes scale {
  0% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}
</style>
