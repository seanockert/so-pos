<template>
  <section class="pos-calculator">
    <GlobalEvents @keyup.prevent="keyPress" />
    <div class="result-wrapper">
      <div class="calculation">
        {{ calculation | number | calculation}}
      </div>
      <div class="result">
        <div v-if="tempResult !== ''">{{ tempResult | number | hugeNumber }}</div>
      </div>
    </div>
    <div class="pad">
      <button @click.prevent="append('Escape')" class="button clear">AC</button>
      <button @click.prevent="append('/', true)" :class="[{ 'active' : opActive == '/' }, 'button op']">÷</button>
      <button @click.prevent="append('7')" class="button">7</button>
      <button @click.prevent="append('8')" class="button">8</button>
      <button @click.prevent="append('9')" class="button">9</button>
      <button @click.prevent="append('*', true)" :class="[{ 'active' : opActive == '*' }, 'button op']">&times;</button>
      <button @click.prevent="append('4')" class="button">4</button>
      <button @click.prevent="append('5')" class="button">5</button>
      <button @click.prevent="append('6')" class="button">6</button>
      <button @click.prevent="append('-', true)" :class="[{ 'active' : opActive == '-' }, 'button op']">-</button>
      <button @click.prevent="append('1')" class="button">1</button>
      <button @click.prevent="append('2')" class="button">2</button>
      <button @click.prevent="append('3')" class="button">3</button>
      <button @click.prevent="append('+', true)" :class="[{ 'active' : opActive == '+' }, 'button op']">+</button>
      <button @click.prevent="append('0')" class="button zero">0</button>
      <button @click.prevent="append('.', true)" class="button point">.</button>
      <button @click.prevent="append('Enter')" class="button equal">=</button>
    </div>
  </section>
</template>

<script>
import GlobalEvents from 'vue-global-events';

// Adapted from: https://codepen.io/ClementRoche/pen/zmzwEJ

String.prototype.replaceAll = function(search, replacement) {
  let target = this;
  return target.split(search).join(replacement);
};

export default {
  name: 'PosCalculator',
  components: { GlobalEvents },
  data() {
    return {
      calculation: '',
      tempResult: '0',
      opActive: null,
      keys: [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 
        '.', '/', '*', '+', '-', '=',
        'Enter', 'Escape', 'Backspace'
      ]
    };
  },
  watch: {
    calculation: function() {
      if (
        this.calculation !== '' &&
        !isNaN(this.calculation.slice(-1)) &&
        this.calculation != this.result
      ) {
        if (this.countDecimals(this.result) > 2) {
          this.tempResult = this.result.toFixed(2);
        } else {
          this.tempResult = this.result.toString();
        }
      }
    }
  },
  computed: {
    result: function() {
      if (!isNaN(this.calculation.slice(-1))) {
        return eval(this.calculation);
      } else {
        return eval(this.calculation.slice(0, -1));
      }
    }
  },
  methods: {
    append: function(value, operation = false) {
      // Non-calculation operations
      switch (value) {
        case 'Escape':
          this.clear();
          return;
        case 'Enter':
        case '=':
          this.getResult();
          return;
        case 'Backspace':
          this.backspace();
          return;
        default:
          break;
      }

      // If the previous character is zero, not followed by a point, then remove it
      // @todo also capture multiple zeros without a non-zero start number eg. 00000
      if (!operation && this.calculation.slice(-1) == 0 && value != 0) {
        this.calculation = this.calculation.slice(0, -1);
      }

      if (
        !operation ||
        (!isNaN(this.calculation.slice(-1)) &&
          (this.calculation.length > 0 || value == '-' || value == '.')) ||
        (this.calculation.slice(-1) != '.' && value == '.')
      ) {
        // A value or a non-consecutive operation. Can only start with '.' or '-'
        this.opActive = operation == true ? value : null;
        this.calculation += value.toString();
      }
    },
    clear: function() {
      this.calculation = '';
      this.tempResult = '0';
    },
    getResult: function() {
      if (this.tempResult.length > 0) {
        this.calculation = this.tempResult;
        //this.calculation = ''
      }
    },
    keyPress: function(e) {
      let operation = false;
      if (e.key && this.keys.includes(e.key)) {
        if (
          e.key == '/' ||
          e.key == '*' ||
          e.key == '+' ||
          e.key == '-' ||
          e.key == '.'
        ) {
          operation = true;
        }
        // Trigger key event on keypress
        this.append(e.key, operation);
      }
    },
    backspace: function() {
      this.calculation = this.calculation.slice(0, -1);
    },
    countDecimals: function(value) {
      if (Math.floor(value.valueOf()) === value.valueOf()) {
        return 0;
      }
      return value.toString().split('.')[1].length || 0;
    }
  },
  filters: {
    hugeNumber: function(value) {
      if (value.length > 10) value = parseFloat(value).toExponential();
      
      let parts = value.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    },
    number: function(value) {
      return value.replaceAll('*', 'x');
    },
    calculation: function(value) {
      return value
        .replaceAll('x', ' x ')
        .replaceAll('/', ' / ')
        .replaceAll('+', ' + ')
        .replaceAll('-', ' - ');
    }
  }
};
</script>

<style lang="scss" scoped>
.result-wrapper {
  background-color: $color-grey-blue;
  color: #fff;
  line-height: 1;
  overflow: hidden;
  padding: $base-padding * 2;
  text-align: right;
}

.result,
.calculation {
  font-size: 1.5rem;
}

.result {
  font-size: 3rem;
  font-weight: bold;
  padding-top: $base-padding/2;
  min-height: 3.5rem;
  width: 100%;
}

.calculation {
  min-height: 1.5rem;
  opacity: 0.8;
  overflow-x: auto;
  white-space: nowrap;
}

.pad {
  display: grid;
  grid-gap: 0;
  grid-template-columns: repeat(4, minmax(60px, 1fr));
}

button {
  align-items: center;
  background: #fff;
  display: grid;
  font-size: 2rem;
  justify-items: center;
  margin: 0;
  padding: $base-padding * 2 $base-padding;
  position: relative;
  -webkit-appearance: none;

  &:focus {
    box-shadow: none;
  }

  &:active:not(.op) {
    animation: flashColor 0.1s ease-out;
    animation-fill-mode: forwards;
    z-index: 10;
  }

  &.op {
    background-color: $color-light-grey;
  }

  &.active {
    background-color: $color-grey-blue;
    background: $color-green;
  }

  &.clear {
    grid-column: 1/4;
    background-color: $color-lightest-grey;
  }

  &.zero {
    grid-column: 1/3;
  }

  &.equal {
    background-color: $color-grey-blue;
    color: #fff;
  }
}

@keyframes flashColor {
  0%,
  100% {
    background: transparent;
  }
  50%,
  90% {
    background: $color-green;
  }
}

@keyframes flashColorDark {
  0%,
  100% {
    background: $color-grey-blue;
  }
  50%,
  90% {
    background: darken($color-grey-blue, 30%);
  }
}
</style>
