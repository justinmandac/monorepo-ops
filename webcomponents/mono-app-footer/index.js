import MonoAppFooter from './src/mono-app-footer';

function register() {
  if (customElements.get(MonoAppFooter.is) === undefined) {
    customElements.define(MonoAppFooter.is, MonoAppFooter);
  }
}

export default {
  MonoAppFooter,
  register,
};