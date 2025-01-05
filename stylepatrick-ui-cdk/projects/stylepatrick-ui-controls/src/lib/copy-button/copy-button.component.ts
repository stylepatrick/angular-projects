import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ClipboardModule} from '@angular/cdk/clipboard';

@Component({
  selector: 'lib-copy-button',
  imports: [ClipboardModule],
  templateUrl: './copy-button.component.html',
  styleUrl: './copy-button.component.css'
})
export class CopyButtonComponent {

  @Input() data = '';
  @Output() copied = new EventEmitter<void>();

  onCopy() {
    this.copied.next();
  }

}
