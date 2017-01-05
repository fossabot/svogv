﻿import { Component, Input, Output, EventEmitter, OnInit, ElementRef, Renderer } from '@angular/core';
import { TextTreeNode, ComponentTreeNode, TreeNode, TreeNodeOptions, TreeNodeState } from './Models/index';

@Component({
    selector: 'ac-treenode',
    template: `<li class="treeview" (click)="handleClick($event)">
                   <i class="ac-collapse" [ngClass]="collapseClasses" *ngIf="node.hasChildren" (click)="handleCollapse()"></i>
                   <i class="ac-collapse" *ngIf="!node.hasChildren"></i>
                   <i class="ac-icon" [ngClass]="iconClasses" [style.color]="node.options.iconColor" *ngIf="!node.options.checkable"></i>
                   <input type="checkbox" [id]="node.name" *ngIf="node.options.checkable" [checked]="node.stateIsChecked" (click)="handleCheckChange()">
                   <label [attr.for]="node.name"></label>
                   <a class="ac-container"
                         [href]="href"
                         [style.color]="foreColor" 
                         [style.background-color]="backColor" 
                         (mouseover)="handlePreSelection(true)"
                         (mouseout)="handlePreSelection(false)"
                         (click)="handleSelection($event)">
                       {{ node.text }}
                   </a>
                   <ul class="treeview" *ngIf="node.hasChildren" [hidden]="!isExpanded">
                       <ac-treenode *ngFor="let child of node.children" 
                                    [node]="child"
                                    (nodeClick)="onNodeClick($event)" 
                                    (checkChanged)="onCheckChanged($event)"
                                    (selectedChanged)="onSelectedChanged($event)"
                                    (collapseChanged)="onCollapseChanged($event)">
                       </ac-treenode>
                   </ul>                   
               </li>`,
    styles: [
        'ul.treeview { list-style: none; margin-left: -2em; }',
        'li.treeview  { margin-left: 10px; margin-bottom: 3px; box-sizing: border-box; }',
        'li.treeview a.ac-container { border-radius: 2px; display: inline-block; padding: 3px; text-decoration: none; }',
        'li.treeview input[type="checkbox"] { display: none; }',
        'li.treeview input[type="checkbox"] + label:before { font-family: FontAwesome; }',
        'li.treeview input[type="checkbox"] + label:before { content: "\\f096"; }',
        'li.treeview input[type="checkbox"]:checked + label:before { content: "\\f046"; }',
        'li.treeview input[type="checkbox"] + label { display:inline-block; width:15px; height: 20px; margin: -1px 4px 0 0; vertical-align:middle; cursor: pointer; }',
        'li.treeview i.ac-collapse { width: 15px; cursor: pointer; display: inline-block; margin-left: -1.7em; }',
        'li.treeview i.ac-icon { width: 15px; cursor: pointer; display: inline-block }',
        'li.treeview .ac-node-disabled { color: silver; cursor: not-allowed; }']
})
export class AcTreeViewNode implements OnInit {
    @Input() node: TextTreeNode;
    @Output() nodeClick: EventEmitter<TreeNode>; 
    @Output() checkChanged: EventEmitter<TreeNode>;
    @Output() selectedChanged: EventEmitter<TreeNode>;
    @Output() collapseChanged: EventEmitter<TreeNode>;
    private href: string;
    private collapseClasses: Array<string>;
    private iconClasses: Array<string>;
    private foreColor: string;
    private backColor: string;
    private isExpanded: boolean = false;
    private static pfxIcon: string = "fa";
    private static opnIcon: string = "fa-plus";
    private static clsIcon: string = "fa-minus";

    constructor(private el: ElementRef, private renderer: Renderer) {
        this.nodeClick = new EventEmitter<TreeNode>();
        this.checkChanged = new EventEmitter<TreeNode>();
        this.selectedChanged = new EventEmitter<TreeNode>();
        this.collapseChanged = new EventEmitter<TreeNode>();
    }

    ngOnInit() {
        // set HTML according to options
        this.collapseClasses = new Array<string>();
        this.iconClasses = new Array<string>();
        // expander area with icon 
        if (this.node) {
            // expect a font-awesome class with or without fa class
            if (this.node.options && this.node.options.icon) {
                if (this.node.options.icon.indexOf(`${AcTreeViewNode.pfxIcon} `) !== 0) {
                    this.iconClasses.push('fa');
                }
                this.iconClasses.push(this.node.options.icon);
            }
            if (this.node.options && this.node.options.href) {
                this.href = this.node.options.href;
            } else {
                this.href = "javascript:void(0)";
                // robust way to prevent link due to router bug in earlier NG2 releases
                // see https://github.com/angular/angular/issues/7294
            }
        }
        // open/close area for elements with children
        if (this.node && this.node.hasChildren) {
            this.collapseClasses.push('ac-icon'); // base class
            this.collapseClasses.push(AcTreeViewNode.pfxIcon);
            this.collapseClasses.push(AcTreeViewNode.opnIcon);
            // collapsed by default
            this.node.state &= ~TreeNodeState.checked;
        }
        if (this.node.options && this.node.options.color) {
            this.foreColor = this.node.options.color;
        }
        if (this.node.options && this.node.options.backColor) {
            this.backColor = this.node.options.backColor;
        }
        this.node.stateChange.subscribe((se : any) => {
            this.collapseChanged.emit(this.node);
            if (!this.node.stateIsExpandend) {
                this.collapseClasses = this.collapseClasses.filter(s => s != AcTreeViewNode.clsIcon);
                this.collapseClasses.push(AcTreeViewNode.opnIcon);
            } else {
                this.collapseClasses = this.collapseClasses.filter(s => s != AcTreeViewNode.opnIcon);
                this.collapseClasses.push(AcTreeViewNode.clsIcon);
            }
            this.isExpanded = this.node.stateIsExpandend;
        });
    }

    // forward events in the node tree

    private onNodeClick(node: TreeNode) {
        this.nodeClick.emit(node);
    }

    private onCheckChanged(node: TreeNode) {
        this.checkChanged.emit(node);
    }

    private onSelectedChanged(node: TreeNode) {
        this.selectedChanged.emit(node);
    }

    private onCollapseChanged(node: TreeNode) {
        this.collapseChanged.emit(node);
    }

    handleCheckChange(): void {
        if (this.node.options.checkable && !this.node.stateIsDisabled) {
            if (this.node.state & TreeNodeState.checked) {
                this.node.state &= ~TreeNodeState.checked;
            } else {
                this.node.state |= TreeNodeState.checked;
            }
            this.checkChanged.emit(this.node);
        }
    }

    handleClick($event : any): void {
        $event.stopPropagation();
        // always emit click
        this.nodeClick.emit(this.node);
    }

    handleCollapse(): void {
        // if collapsable handle icons and view state
        if (this.node.options.collapsable) {
            // toggle state
            if (this.node.state && (this.node.state & TreeNodeState.expanded)) {
                this.node.state &= ~TreeNodeState.expanded;
            } else {
                this.node.state |= TreeNodeState.expanded;
            }
        }
    }

    private preSelectState: boolean;

    handlePreSelection(state: boolean): void {
        // handle the states according to options
        if (this.node.options.selectable && !this.node.stateIsDisabled) {
            if (state) {
                if (this.node.options && this.node.options.color) {
                    this.foreColor = this.node.options.backColor;
                } else {
                    this.foreColor = '#fff';
                }
                if (this.node.options && this.node.options.backColor) {
                    this.backColor = this.node.options.color;
                } else {
                    this.backColor = '#000';
                }
            } else {
                if (this.node.options && this.node.options.color) {
                    this.foreColor = this.node.options.color;
                } else {
                    this.foreColor = '#000';
                }
                if (this.node.options && this.node.options.backColor) {
                    this.backColor = this.node.options.backColor;
                } else {
                    this.backColor = '#fff';
                }
            }
            this.preSelectState = state;
        }

    }

    handleSelection($event : any): void {
        // handle the states according to options
        if (this.node.options.selectable && !this.node.stateIsDisabled && this.preSelectState === true) {
            if (this.node.state & TreeNodeState.selected) {
                this.node.state &= ~TreeNodeState.selected;
            } else {
                this.node.state |= TreeNodeState.selected;
            }
            if (this.node.stateIsSelected) {
                if (this.node.options && this.node.options.color) {
                    this.foreColor = this.node.options.backColor;
                } else {
                    this.foreColor = '#fff';
                }
                if (this.node.options && this.node.options.backColor) {
                    this.backColor = this.node.options.color;
                } else {
                    this.backColor = '#000';
                }
            } else {
                if (this.node.options && this.node.options.color) {
                    this.foreColor = this.node.options.color;
                } else {
                    this.foreColor = '#000';
                }
                if (this.node.options && this.node.options.backColor) {
                    this.backColor = this.node.options.backColor;
                } else {
                    this.backColor = '#fff';
                }
            }
            this.selectedChanged.emit(this.node);
        }

    }

}