<template>
  <div class="pos-categories">
    <button v-for="category in categories" :key="category.id" :data-id="category.id" :class="{ active: category.active }" @click="changeCategory(category.id)">{{ category.label }}</button>
  </div>
</template>

<script>
export default {
  name: 'PosProductsCategories',
  props: {
    categories: Array
  },
  methods: {
    changeCategory: function(id) {
      this.$emit('filter-products', id, 'category');
    }
  }
};
</script>

<style lang="scss" scoped>
.pos-categories {
  display: flex;
  flex-wrap: nowrap;
  padding: $base-padding;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  z-index: 99;
  -webkit-overflow-scrolling: touch;

  button {
    background-color: transparent;
    border-radius: $border-radius;
    color: $color-grey-blue;
    flex: 0 0 25%;
    font-weight: bold;
    padding: $base-padding;
    scroll-snap-align: center;
    white-space: nowrap;

    &:focus,
    &:active {
      background-color: #fff;
      transform: scale(0.95);
    }

    &.active {
      background-color: $color-grey-blue;
      color: #fff;
    }

    svg {
      color: $color-grey-blue;
      opacity: 0.7;
    }
  }
}
</style>
