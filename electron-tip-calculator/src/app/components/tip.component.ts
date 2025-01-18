import {Component, OnInit} from '@angular/core';
import {TableModule} from 'primeng/table';
import {TipHead} from '../models/tip-head';
import {TipService} from '../services/tip.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {TipDialogComponent} from './tip-dialog.component';
import {Tip} from '../models/tip';
import {InputNumberModule} from 'primeng/inputnumber';
import {FloatLabel} from 'primeng/floatlabel';
import {Fluid} from 'primeng/fluid';

@Component({
  selector: 'app-tip',
  imports: [
    FormsModule,
    ButtonModule,
    CommonModule,
    TipDialogComponent,
    InputNumberModule,
    TableModule,
    FloatLabel,
    Fluid
  ],
  template: `
    <div class="w-full md:w-1/2 lg:w-1/2 pt-8">
      <div class="grid grid-cols-2 gap-5">
        <div>
          <p-fluid>
            <div>
              <p-floatlabel>
                <p-inputNumber [(ngModel)]="tipHead.totTip" mode="decimal" [min]="1"
                               [maxFractionDigits]="2" [showButtons]="false"
                               (ngModelChange)="updateTipHead()">
                </p-inputNumber>
                <label>Trinkgeld</label>
              </p-floatlabel>
            </div>
          </p-fluid>
        </div>
        <div>
          <p-fluid>
            <div>
              <p-floatlabel>
                <p-inputNumber [(ngModel)]="tipHead.totDays" mode="decimal" [showButtons]="false"
                               [disabled]="true">
                </p-inputNumber>
                <label>Gesamte Tage</label>
              </p-floatlabel>
            </div>
          </p-fluid>
        </div>
      </div>
    </div>

    <div class="pt-5">
      <p-table [value]="tipHead?.tips"
               [autoLayout]="true"
               styleClass="p-datatable-sm p-datatable-striped">
        <ng-template pTemplate="header">
          <tr>
            <th>
              <i class="pi pi-plus" (click)="onCreateTipDialog()"
                 style="cursor: pointer; font-size: 1rem; color: green;"></i>
            </th>
            <th>Name</th>
            <th>Tage</th>
            <th>Trinkgeld</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-tip>
          <tr>
            <td>
              <i class="pi pi-pencil" (click)="onEditTipDialog(tip)" style="cursor: pointer; font-size: 1rem"></i>
              <i class="pi pi-times" (click)="onRemoveTip(tip)"
                 style="cursor: pointer; font-size: 1rem; color: red; padding-left: .3rem"></i>
            </td>
            <td>{{ tip.username }}</td>
            <td>{{ tip.days }}</td>
            <td>{{ tip.amount | number : '1.2-2' }}</td>
          </tr>
        </ng-template>
      </p-table>
    </div>

    <app-tip-dialog [visible]="showTipDialog"
                    [tip]="selectedTip"
                    [tips]="tipHead.tips"
                    [editMode]="editTip"
                    (save)="onSaveTipDialog($event)"
                    (cancel)="onCancelDialog()"
    ></app-tip-dialog>
  `
})
export class TipComponent implements OnInit {

  tipHead: TipHead;

  showTipDialog: boolean;
  selectedTip: Tip;

  editTip: boolean;

  constructor(private tipService: TipService) {
  }

  ngOnInit(): void {
    this.tipHead = this.tipService.getTipHead()
  }

  onCreateTipDialog() {
    this.selectedTip = {days: null, username: null}
    this.editTip = false;
    this.showTipDialog = true;
  }

  onSaveTipDialog(tip: Tip) {
    this.showTipDialog = false;
    let checkUnique = this.checkUnique(tip.username);
    if (checkUnique == null) {
      this.tipHead.tips.push(tip);
    } else {
      checkUnique.days = tip.days;
    }
    this.updateTipHead();
    this.resetValues();
  }

  onEditTipDialog(tip: Tip) {
    this.selectedTip = {...tip};
    this.editTip = true;
    this.showTipDialog = true;
  }

  onCancelDialog() {
    this.resetValues();
  }

  onRemoveTip(tip: any) {
    const index: number = this.tipHead.tips.findIndex(x => x.username === tip.username);
    if (index !== -1) {
      this.tipHead.tips.splice(index, 1);
      this.updateTipHead();
    }
  }

  updateTipHead() {
    if (this.tipHead.tips.length > 0) {
      const totDays = this.tipHead.tips.map(t => t.days).reduce((a, b) => a + b);
      this.tipHead.totDays = totDays;

      this.tipHead.tips.forEach(tip => {
        tip.percentage = (tip.days / this.tipHead.totDays) * 100;
        tip.amount = (tip.percentage / 100) * this.tipHead.totTip;
      })
    }
  }

  private checkUnique(username: string): Tip {
    return this.tipHead.tips.find(tip => tip.username === username);
  }

  private resetValues() {
    this.showTipDialog = false;
    this.selectedTip = null;
    this.editTip = false;
  }
}
