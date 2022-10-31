const format = require('date-format');

module.exports = {
  format_date: (date) => {
    return format.asString('yyyy-MM-dd', new Date(date));
  },
};
