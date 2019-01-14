<template>
  <section>
    <header>
      <h2>Add a new product</h2>
    </header>
    <form @submit.prevent="addProduct">
      <div>
        <label for="title">Title</label>
        <input type="text" name="title" v-model="title">

        <label for="sku">SKU</label>
        <input type="text" name="sku" v-model="sku">

        <label for="description">Description</label>
        <input type="text" name="description" v-model="description">

        <label for="price">Price</label>
        <input type="text" name="Price" v-model="price">

        <label for="quantity">Quantity</label>
        <input type="text" name="quantity" v-model="quantity">

        <label for="category">Category</label>
        <select name="category" v-model="category">
          <option value="0">None</option>
          <option value="1">Junk food</option>
          <option value="2">Fruit</option>
          <option value="3">Drinks</option>
          <option value="4">Alcohol</option>
        </select>

        <p><button type="submit" class="button confirm">Add product</button></p>
      </div>

    </form>
  </section>
</template>

<script>
// https://github.com/saivarunk/vue-simple-upload
import FileUpload from 'vue-simple-upload/dist/FileUpload';

export default {
  name: 'PosNewProduct',
  components: {
    fileupload: FileUpload
  },
  data() {
    return {
      product: {},
      title: 'Product',
      description: '',
      sku: 1234,
      price: '1.00',
      quantity: 10,
      category: 2,
      image: 'images/drink.png'
    };
  },
  methods: {
    addProduct: function() {
      this.product.title = this.title;
      this.product.sku = this.sku;
      this.product.description = this.description;
      this.product.price = this.price * 100;
      this.product.quantity = this.quantity;
      this.product.category = this.category;
      this.product.image = this.image;

      this.$emit('add-product', this.product);
    },
    validate: function() {}
  }
};
</script>

<style lang="scss" scoped>
section {
  min-width: 560px !important;
  max-width: 100%;
  overflow-y: scroll;
  padding: $base-padding * 2;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

h2 {
  margin-top: 0;
}

form {
  //display: flex;
  //justify-content: space-between;
  width: 100%;

  > * {
    //flex: 0 0 auto;
  }


  :last-child {
    margin-bottom: 0;
  }
}

label,
input {
  font-size: inherit;
  width: 100%;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: $base-padding/2;

  &.inline {
    font-weight: normal;
  }
}

input,
select {
  padding: $base-padding;
  margin-bottom: $base-padding;

  &[name='title'] {
    font-size: 1.5rem;
  }
}

.button.confirm {
  @include button(#fff, $color-green);

  svg {
    float: right;
    fill: #fff;
    opacity: 0.7;
  }
}
</style>
