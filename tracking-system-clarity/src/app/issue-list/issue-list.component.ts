import { Component, OnInit } from '@angular/core';
import { Issue } from '../issue';
import { IssuesService } from '../issues.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
  issues: Issue[] = [];
  showReportIssue = false;
  showEditIssue = false;
  showResolveIssue = false;
  selectedIssue: Issue | null = null;

  constructor(private issueService: IssuesService) { }

  ngOnInit(): void {
    this.getIssues();
  }

  private getIssues() {
    this.issues = this.issueService.getPendingIssues();
  }

  onOpenReport() {
    this.showReportIssue = true;
  }

  onCloseReport() {
    this.showReportIssue = false;
    this.getIssues();
  }

  onConfirm(confirmed: boolean) {
    if (confirmed && this.selectedIssue) {
      this.issueService.completeIssue(this.selectedIssue);
      this.getIssues();
    }
    this.selectedIssue = null;
  }

  onCloseEdit() {
    this.showEditIssue = false;
    this.getIssues();
  }

  onEdit(issue: Issue) {
    this.selectedIssue = issue;
    this.showEditIssue = true;
  }

  onResolve(issue: Issue) {
    this.selectedIssue = issue
    this.showResolveIssue = true;
  }
}
