<template>
  <form class="pos-search">
    <input type="search" name="q" placeholder="Search items..." autocomplete="off" v-model="query">
    <svg width="24" height="24" viewBox="0 0 24 24" class="icon-search"><path d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z"/></svg>
    <button type="button" @click="openModal('calculator')" class="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 2v20h-16v-20h16zm2-2h-20v24h20v-24zm-13 21h-4v-3h4v3zm0-4h-4v-3h4v3zm0-4h-4v-3h4v3zm5 8h-4v-3h4v3zm0-4h-4v-3h4v3zm0-4h-4v-3h4v3zm5 8h-4v-7h4v7zm0-8h-4v-3h4v3zm0-10h-14v5h14v-5z"/></svg></button>
  </form>
</template>

<script>
import { helpers } from '../mixins/helpers';

// Debounce input changes
const debounce = require('lodash.debounce');

export default {
  name: 'PosProductsSearch',
  props: {
    products: Array
  },
  mixins: [helpers],
  data: function() {
    return {
      query: ''
    };
  },
  watch: {
    query: function(newValue, oldValue) {
      this.search();
    }
  },
  methods: {
    search: debounce(function() {
      const query = this.query && this.query.trim();
      this.$emit('filter-products', query, 'search');
    }, 100),
    openModal: function(type) {
      this.$emit('open-modal', type);
    }
  }
};
</script>


<style lang="scss" scoped>
form {
  display: flex;
  font-size: 1.25em;
  position: relative;
  padding: $base-padding $base-padding 0 $base-padding;
}

input {
  background-color: $color-light-grey;
  border: none;
  border-radius: $border-radius;
  font-size: inherit;
  padding: $base-padding;
  padding-left: $base-padding * 4;
  transition: all 0.15s ease-out;
  width: 100%;
  -webkit-appearance: none;

  &:focus,
  &:active {
    background-color: #fff;
  }
}

.icon-search {
  background-color: transparent;
  margin: $base-padding $base-padding * 2;
  position: absolute;
  fill: $color-grey-blue;
  left: 0;
  opacity: 0.7;
}

.button {
  @include button($color-text, transparent);
  padding: $base-padding/2 $base-padding;
  width: auto;

  svg {
    fill: $color-grey-blue;
  }

  &:active {
    background-color: $color-green;
  }
}
</style>
