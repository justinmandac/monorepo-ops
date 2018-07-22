import MonoAppHeader from './src/mono-app-header.js'

function register() {
   if (customElements.get(MonoAppHeader.is) === undefined) {
     customElements.define(MonoAppHeader.is, MonoAppHeader);
   }
}

export default {
  MonoAppHeader,
  register,
};
