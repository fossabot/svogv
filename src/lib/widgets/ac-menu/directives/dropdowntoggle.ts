import { Directive, 
         ElementRef, 
         Host, 
         HostBinding, 
         HostListener, 
         OnInit, 
         Input } from '@angular/core';
import { DropdownToggleInterface } from '../services/ac-dropdowninterface';
import { Dropdown } from './dropdown';

@Directive({ selector: '[dropdownToggle]' })
export class DropdownToggle implements OnInit, DropdownToggleInterface {
    @HostBinding('class.disabled')
    @Input() private disabled:boolean = false;

    @HostBinding('class.dropdown-toggle')
    @HostBinding('attr.aria-haspopup')
    private addClass = true;

    constructor(@Host() public dropdown:Dropdown, public el:ElementRef) {
    }

    public ngOnInit() {
        this.dropdown.dropDownToggle = this;
    }

    @HostBinding('attr.aria-expanded')
    public get isOpen() {
        return this.dropdown.isOpen;
    }

    @HostListener('click', ['$event'])
    public toggleDropdown(event:MouseEvent) {
        event.stopPropagation();

        if (!this.disabled) {
            this.dropdown.toggle();
        }
        return false;
    }
}
