module.exports = function (date) {
    function pad(number) {
        if (number < 10) {
          return `0${number}`;
        }
        return number;
      }
      return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}