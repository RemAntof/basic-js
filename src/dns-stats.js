const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  const dnsCount = {};
  for (const domain of domains) {
    const domainParts = domain.split('.').reverse();
    let currentDomain = '';
    for (const part of domainParts) {
      currentDomain += `.${part}`;
      if (dnsCount[currentDomain]) {
        dnsCount[currentDomain]++;
      } else {
        dnsCount[currentDomain] = 1;
      }
    }
  }
  return dnsCount;
}

module.exports = {
  getDNSStats
};
