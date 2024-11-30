import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Issue} from "../issue";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IssuesService} from "../issues.service";

interface EditIssueForm {
  title: FormControl<string>;
  description: FormControl<string>;
  priority: FormControl<string>;
  type: FormControl<string>;
}

@Component({
  selector: 'app-edit-issue',
  templateUrl: './edit-issue.component.html',
  styleUrls: ['./edit-issue.component.css']
})
export class EditIssueComponent implements OnInit {

  @Input() issue: Issue | null = null;

  @Output() formClose = new EventEmitter();

  editIssueForm: FormGroup<EditIssueForm> | undefined;

  suggestions: Issue[]= [];

  constructor(
    private issueService: IssuesService
  ) {
  }

  ngOnInit(): void {
    if (this.issue) {
      this.editIssueForm = new FormGroup<EditIssueForm>({
        title: new FormControl(this.issue.title, { nonNullable: true, validators: Validators.required }),
        description: new FormControl(this.issue.description, { nonNullable: true }),
        priority: new FormControl(this.issue.priority, { nonNullable: true, validators: Validators.required }),
        type: new FormControl(this.issue.type, { nonNullable: true, validators: Validators.required })
      })
      this.editIssueForm.controls.title.valueChanges.subscribe(title => {
        this.suggestions = this.issueService.getSuggestions(title);
      });
    }
  }

  editIssue() {
    if (this.issue) {
      const issue: Issue = this.editIssueForm?.getRawValue() as Issue;
      issue.issueNo = this.issue?.issueNo;
      this.issueService.editIssue(issue);
      this.formClose.emit();
    }
  }
}
