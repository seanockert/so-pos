export const helpers = {
  methods: {
    formatMoney(
      value,
      decimalCount = 2,
      decimal = '.',
      thousands = ',',
      symbol = '$'
    ) {
      try {
        let amount = value / 100;
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? '-' : '';

        let i = parseInt(
          (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
        ).toString();
        let j = i.length > 3 ? i.length % 3 : 0;

        return (
          symbol +
          negativeSign +
          (j ? i.substr(0, j) + thousands : '') +
          i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
          (decimalCount
            ? decimal +
              Math.abs(amount - i)
                .toFixed(decimalCount)
                .slice(2)
            : '')
        );
      } catch (e) {
        return value;
      }
    },
    formatPercent(value) {
      if (value) {
        // let percent = value/100
        return value + '%';
      }
    },
    applyDiscount: function(price, discount = null) {
      if (!discount) return price

      let value = price
      if (discount.type == 'percent') {
        value = (1 - discount.value/100) * price
      }
      return value
    },
    sortByDate: function(items) {
      return items.sort(function(a, b) { 
        return b.timestamp - a.timestamp;
      })
    },
    formatDateTime(timestamp) {
      const now = new Date(timestamp);

      // Create an array with the current month, day and time
      let date = [now.getDate(), now.getMonth() + 1, now.getFullYear()];

      // Create an array with the current hour, minute
      let time = [now.getHours(), now.getMinutes()]; //, now.getSeconds()

      const suffix = time[0] < 12 ? 'AM' : 'PM';

      // Convert hour from military time
      time[0] = time[0] < 12 ? time[0] : time[0] - 12;

      // If hour is 0, set it to 12
      time[0] = time[0] || 12;

      // If seconds and minutes are less than 10, add a zero
      for (let i = 1; i < 3; i++) {
        if (time[i] < 10) {
          time[i] = '0' + time[i];
        }
      }

      return time.join(':') + suffix + ' ' + date.join('/');
    },
    calcTax(value, tax = 0) {
      return this.formatMoney((value * tax) / 100);
    }
  }
};
