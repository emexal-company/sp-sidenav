/**
    @license
    Copyright 2020 EMEXAL All Rights Reserved.
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
        http://www.apache.org/licenses/LICENSE-2.0
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

import { query, css, customElement, LitElement, property, PropertyValues } from 'lit-element';

import { Base } from '@spectrum/sp-base';

import sidenavStyles from './sidenav.styles';
import template from './sidenav.template';
import { SideNavItem } from '@spectrum/sp-sidenavitem';

@customElement('sp-sidenav')
export class SideNav extends Base {
  public static componentStyles = [sidenavStyles];

  @property({ type: Boolean, attribute: 'multi-level' }) public multiLevel: boolean = false;
  @property({ type: Boolean, attribute: 'first-level' }) public firstLevel: boolean = false;
  @property({ type: Boolean, attribute: 'second-level' }) public secondLevel: boolean = false;

  @query('slot') protected items!: HTMLElement;

  private selectedElement: SideNavItem;

  protected render() {
    return template.call(this);
  }

  protected connectedCallback() {
    super.connectedCallback();

    // Handle the click event only inside the root <sp-sidenav>
    if (!((this as any as HTMLElement).parentNode instanceof SideNavItem)) {
      (this as any as HTMLElement).addEventListener('click', this.onClicked.bind(this));
    }
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();

    if (!((this as any as HTMLElement).parentNode instanceof SideNavItem)) {
      (this as any as HTMLElement).removeEventListener('click', this.onClicked.bind(this));
    }
  }

  protected updated() {
    const items = this.getItems();
    items.forEach((item) => {
      item.multiLevel = this.multiLevel;
      item.secondLevel = this.secondLevel;
      item.firstLevel = this.firstLevel;
    });
  }

  private getItems(): SideNavItem[] {
    return (this.items as HTMLSlotElement)
      .assignedNodes({ flatten: true })
      .filter((e: Node) => e instanceof SideNavItem) as any as SideNavItem[];
  }

  private onClicked(e: MouseEvent) {
    // Find the <sp-sidenav> items
    const items = e.composedPath().filter((t: EventTarget) => t instanceof SideNavItem) as any as SideNavItem[];
    if (items.length > 0) {
      //e.stopPropagation();

      // Remove selection from the previously selected element
      if (this.selectedElement) {
        this.selectedElement.selected = false;
      }

      // Select the new clicked element
      this.selectedElement = items[0];
      this.selectedElement.selected = true;
    }

  }

}

declare global {
  interface HTMLElementTagNameMap {
    'sp-sidenav': SideNav;
  }
}
