import { LitElement, html } from '@polymer/lit-element';

export default class MonoAppFooter extends LitElement {
  static get is() { return 'mono-app-footer'; }
  static get template() {
    return html`
      <footer>
        App Footer
      </footer>
    `;
  }
}