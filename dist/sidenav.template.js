import { html } from 'lit-element';
export default function template() {
    return html `
        <ul
          ?multi-level="${this.multiLevel}"
          ?first-level="${this.firstLevel}"
          ?second-level="${this.secondLevel}"
          class="spectrum-SideNav spectrum-SideNav--multiLevel">
          <slot></slot>
        </ul>
        `;
}
//# sourceMappingURL=sidenav.template.js.map