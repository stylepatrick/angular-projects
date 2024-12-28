import {Component, OnInit} from '@angular/core';
import {Organization} from '../../models/organization';
import {Observable} from 'rxjs';
import {GithubService} from '../../service/github.service';
import {AsyncPipe, CommonModule} from '@angular/common';
import {PanelComponent} from '../panel/panel.component';

@Component({
  selector: 'app-organizations',
  imports: [
    CommonModule,
    AsyncPipe,
    PanelComponent
  ],
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.css'
})
export class OrganizationsComponent implements OnInit {

  orgs$: Observable<Organization[]> | undefined;

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    this.orgs$ =
      this.githubService.getOrganizations();
  }
}
