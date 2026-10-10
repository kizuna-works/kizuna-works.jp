/*
 * Normalize a kintone domain typed by an applicant.
 * Shared by the supporter form, the trial form and the application confirmation page.
 * Mirrors normalizeApplicationDomain() in the license GAS (ApplicationConfirm.gs).
 * Both are checked against the same vectors: scripts/kintone-domain-vectors.json
 * (node scripts/check-kintone-domain.mjs for this file; the GAS side is checked in the test environment).
 *
 *   - whitespace (including full-width) is removed wherever it appears
 *   - full-width characters become half-width (NFKC), lower case
 *   - a pasted URL is reduced to its host (https://, /k/..., ?, #, user@, :port, trailing dots)
 *   - subdomain only (acme) or a truncated base (acme.cybozu) is completed to .cybozu.com / .com
 *
 * Returns { input, domain, completed, valid }.
 */
(function (root) {
  var BASES = ['cybozu.com', 'kintone.com', 'cybozu-dev.com', 'cybozu.cn'];

  function host(raw) {
    var h = String(raw == null ? '' : raw).replace(/[\s　]+/g, '');
    if (typeof h.normalize === 'function') h = h.normalize('NFKC');
    h = h.replace(/[\s　]+/g, '').toLowerCase();
    h = h.replace(/^[a-z]+:\/\//, '');
    h = h.split('/')[0].split('?')[0].split('#')[0];
    h = h.split('@').pop().split(':')[0];
    return h.replace(/\.+$/, '');
  }

  function isFull(h) {
    return BASES.some(function (b) {
      return new RegExp('^[a-z0-9][a-z0-9-]*(\\.s)?\\.' + b.replace(/\./g, '\\.') + '$').test(h);
    });
  }

  function normalizeKintoneDomain(raw) {
    var input = String(raw == null ? '' : raw);
    var h = host(input);
    var completed = false;
    if (h && h.indexOf('.') === -1) { h = h + '.cybozu.com'; completed = true; }
    else if (/^[a-z0-9][a-z0-9-]*(\.s)?\.(cybozu|kintone|cybozu-dev)$/.test(h)) { h = h + '.com'; completed = true; }
    return { input: input, domain: h, completed: completed, valid: isFull(h) };
  }

  root.KZ = root.KZ || {};
  root.KZ.normalizeKintoneDomain = normalizeKintoneDomain;
  if (typeof module !== 'undefined' && module.exports) module.exports = { normalizeKintoneDomain: normalizeKintoneDomain };
})(typeof window !== 'undefined' ? window : globalThis);
