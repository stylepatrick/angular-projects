import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {Tip} from '../models/tip';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {MessageModule} from 'primeng/message';

@Component({
  selector: 'app-tip-dialog',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    FormsModule,
    CommonModule,
    InputTextModule,
    InputNumberModule,
    MessageModule
  ],
  template: `
    <p-dialog header="Hinzufügen" [modal]="true"
              [(visible)]="visible" [style]="{width: '25vw'}"
              (onHide)="onCancel()">
      <div *ngIf="tip" class="grid" style="padding-top: 1.2rem">
        <div class="col-12 p-fluid">
          <span class="p-float-label">
            <input type="text" [disabled]="editMode" pInputText [(ngModel)]="tip.username">
            <label>Name</label>
          </span>
        </div>
        <div class="col-12 p-fluid" style="padding-top: 1.2rem">
          <span class="p-float-label">
            <p-inputNumber [(ngModel)]="tip.days" mode="decimal" [min]="1" [showButtons]="false">
            </p-inputNumber>
            <label>Tage</label>
          </span>
        </div>
        <div *ngIf="isUsernamePresent()" class="col-12 p-fluid">
          <p-message severity="info" text="Name bereits vorhanden!"
                     styleClass="p-mr-2">
          </p-message>
        </div>
      </div>
      <p-footer>
        <p-button icon="pi pi-save" styleClass="p-button-primary mr-2 mb-2"
                  label="Speichern"
                  [disabled]="tip?.days == null || tip?.username == null || isUsernamePresent()"
                  (onClick)="onSave()"
        ></p-button>
        <p-button icon="pi pi-times" styleClass="p-button-outlined mr-2 mb-2"
                  label="Abbrechen"
                  (onClick)="onCancel()"
        ></p-button>
      </p-footer>
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
