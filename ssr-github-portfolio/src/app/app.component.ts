import {Component, OnInit} from '@angular/core';
import {GithubService} from './service/github.service';
import {PersonalInfoComponent} from './component/personal-info/personal-info.component';
import {RepositoriesComponent} from './component/repositories/repositories.component';
import {OrganizationsComponent} from './component/organizations/organizations.component';

@Component({
  selector: 'app-root',
  imports: [
    PersonalInfoComponent,
    RepositoriesComponent,
    OrganizationsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'stylepatrick';
  username = '';

  constructor(private githubService: GithubService) {}
  ngOnInit(): void {
    this.username = this.githubService.username;
  }
}
