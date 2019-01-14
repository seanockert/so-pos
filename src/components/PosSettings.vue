<template>
  <section class="pos-settings">
    <header>
      <h2>Settings</h2>
    </header>
    <form>
      <div>
        <label>Currency</label>
        <label class="inline"><input type="radio" name="" value="AUD" v-model="currency">AUD</label>
        <label class="inline"><input type="radio" name="" value="USD" v-model="currency">USD</label>
      </div>
      <div>
        <label>Tax (%)</label>
        <input type="text" v-model="tax" placeholder="eg. 10">
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: 'PosSettings',
  data() {
    return {
      currency: 'AUD',
      tax: '10'
    };
  },
  watch: {
    tax: function() {
      this.$emit('update-settings', this.tax, 'tax');
    }
  }
};
</script>


<style lang="scss" scoped>
section {
  overflow-y: scroll;
  padding: $base-padding * 2;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

h2 {
  margin-top: 0;
}

label,
input {
  font-size: inherit;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: $base-padding/2;

  &.inline {
    font-weight: normal;
  }
}
</style>
