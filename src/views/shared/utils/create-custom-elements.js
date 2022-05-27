export function createCustomElements(customs) {
  for (const [key, value] of Object.entries(customs)) {
    customElements.define(key, value);
  }
}
