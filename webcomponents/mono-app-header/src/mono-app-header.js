import { LitElement, html } from '@polymer/lit-element';
import template from './mono-app-header.template.html';

class MonoAppHeader extends LitElement {
  static get is() { return 'mono-app-header'; }
  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  _render() {
    return html([template]);
  }
}

export default MonoAppHeader;
