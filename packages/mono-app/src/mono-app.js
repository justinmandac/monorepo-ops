import { LitElement, html } from '@polymer/lit-element';
import template from './mono-app.template.html';
import MonoAppHeader from 'mono-app-header'

MonoAppHeader.register();

class MonoApp extends LitElement {
  _render() {
    return html([template]);
  }
}

customElements.define('mono-app', MonoApp);
