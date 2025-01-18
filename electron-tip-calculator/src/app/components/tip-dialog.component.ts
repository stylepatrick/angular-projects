import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {Tip} from '../models/tip';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {MessageModule} from 'primeng/message';
import {FloatLabel} from 'primeng/floatlabel';
import {Fluid} from 'primeng/fluid';

@Component({
    selector: 'app-tip-dialog',
  imports: [
    DialogModule,
    ButtonModule,
    FormsModule,
    CommonModule,
    InputTextModule,
    InputNumberModule,
    MessageModule,
    FloatLabel,
    Fluid
  ],
    template: `
    <p-dialog header="Hinzufügen" [modal]="true"
              [(visible)]="visible" [style]="{width: '90vw'}"
              (onHide)="onCancel()">
      <p-fluid>
        <div *ngIf="tip" class="flex items-center pt-5 grid grid-rows-4 gap-6">
          <div>
            <p-floatlabel>
              <input type="text" [disabled]="editMode" pInputText [(ngModel)]="tip.username">
              <label>Name</label>
            </p-floatlabel>
          </div>
          <div>
            <p-floatlabel>
              <p-inputNumber [(ngModel)]="tip.days" mode="decimal" [min]="1" [showButtons]="false">
              </p-inputNumber>
              <label>Tage</label>
            </p-floatlabel>
          </div>
          <div *ngIf="isUsernamePresent() && !editMode">
            <p-message severity="info" text="Name bereits vorhanden!"
                       styleClass="p-mr-2">
            </p-message>
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <p-button icon="pi pi-save" styleClass="p-button-primary"
                    label="Speichern"
                    [disabled]="tip?.days == null || tip?.username == null || (isUsernamePresent() && !editMode)"
                    (onClick)="onSave()"
          ></p-button>
          <p-button icon="pi pi-times" styleClass="p-button-outlined"
                    label="Abbrechen"
                    (onClick)="onCancel()"
          ></p-button>
        </div>
      </p-fluid>
    </p-dialog>
  `
})
export class TipDialogComponent {

  @Input()
  visible: boolean;

  @Input()
  editMode: boolean;

  @Input()
  tip: Tip;

  @Input()
  tips: Tip[];

  @Output()
  save: EventEmitter<Tip> = new EventEmitter();

  @Output()
  cancel: EventEmitter<void> = new EventEmitter();

  onSave() {
    this.save.emit(this.tip);
  }

  onCancel() {
    this.cancel.emit();
  }

  isUsernamePresent(): boolean {
    return this.tips.find(tip => tip.username === this.tip.username) != null;
  }
}
