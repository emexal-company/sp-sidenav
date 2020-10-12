import { Base } from '@spectrum/sp-base';
export declare class SideNav extends Base {
    static componentStyles: import("lit-element").CSSResult[];
    multiLevel: boolean;
    firstLevel: boolean;
    secondLevel: boolean;
    protected items: HTMLElement;
    private selectedElement;
    protected render(): import("lit-element").TemplateResult;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected updated(): void;
    private getItems;
    private onClicked;
}
declare global {
    interface HTMLElementTagNameMap {
        'sp-sidenav': SideNav;
    }
}
