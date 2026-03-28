import {Component} from "vue";

export interface IAccessibilityCard {
    label: string;
    icon?: Component;
    active: boolean;
    click(): void;
}