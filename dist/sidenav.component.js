import { __decorate, __metadata } from "tslib";
import { query, customElement, property } from 'lit-element';
import { Base } from '@spectrum/sp-base';
import sidenavStyles from './sidenav.styles';
import template from './sidenav.template';
import { SideNavItem } from '@spectrum/sp-sidenavitem';
let SideNav = class SideNav extends Base {
    constructor() {
        super(...arguments);
        this.multiLevel = false;
        this.firstLevel = false;
        this.secondLevel = false;
    }
    render() {
        return template.call(this);
    }
    connectedCallback() {
        super.connectedCallback();
        // Handle the click event only inside the root <sp-sidenav>
        if (!(this.parentNode instanceof SideNavItem)) {
            this.addEventListener('click', this.onClicked.bind(this));
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (!(this.parentNode instanceof SideNavItem)) {
            this.removeEventListener('click', this.onClicked.bind(this));
        }
    }
    updated() {
        const items = this.getItems();
        items.forEach((item) => {
            item.multiLevel = this.multiLevel;
            item.secondLevel = this.secondLevel;
            item.firstLevel = this.firstLevel;
        });
    }
    getItems() {
        return this.items
            .assignedNodes({ flatten: true })
            .filter((e) => e instanceof SideNavItem);
    }
    onClicked(e) {
        // Find the <sp-sidenav> items
        const items = e.composedPath().filter((t) => t instanceof SideNavItem);
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
};
SideNav.componentStyles = [sidenavStyles];
__decorate([
    property({ type: Boolean, attribute: 'multi-level' }),
    __metadata("design:type", Boolean)
], SideNav.prototype, "multiLevel", void 0);
__decorate([
    property({ type: Boolean, attribute: 'first-level' }),
    __metadata("design:type", Boolean)
], SideNav.prototype, "firstLevel", void 0);
__decorate([
    property({ type: Boolean, attribute: 'second-level' }),
    __metadata("design:type", Boolean)
], SideNav.prototype, "secondLevel", void 0);
__decorate([
    query('slot'),
    __metadata("design:type", HTMLElement)
], SideNav.prototype, "items", void 0);
SideNav = __decorate([
    customElement('sp-sidenav')
], SideNav);
export { SideNav };
//# sourceMappingURL=sidenav.component.js.map