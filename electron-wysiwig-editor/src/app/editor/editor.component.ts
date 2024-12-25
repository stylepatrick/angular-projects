import {Component, OnInit} from '@angular/core';
import {NgxWigModule} from 'ngx-wig';
import {EditorService} from '../service/editor.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-editor',
  imports: [
    NgxWigModule,
    FormsModule
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent implements OnInit {
  myContent = '';

  constructor(private editorService: EditorService) {
  }

  ngOnInit(): void {
    this.getContent();
  }

  private async getContent() {
    this.myContent = await this.editorService.getContent();
  }

  saveContent(content: string) {
    this.editorService.setContent(content);
  }

}
