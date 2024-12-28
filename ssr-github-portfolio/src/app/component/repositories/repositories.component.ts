import {Component, OnInit} from '@angular/core';
import {map, Observable} from 'rxjs';
import {Repository} from '../../models/repository';
import {GithubService} from '../../service/github.service';
import {PanelComponent} from '../panel/panel.component';
import {AsyncPipe, CommonModule} from '@angular/common';

@Component({
  selector: 'app-repositories',
  imports: [
    PanelComponent,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './repositories.component.html',
  styleUrl: './repositories.component.css'
})
export class RepositoriesComponent implements OnInit {

  repos$: Observable<Repository[]> | undefined;

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    this.repos$ = this.githubService.getRepos().pipe(
      map(repos => repos
        .filter(repo => !repo.fork)
        .sort((a, b) => {
          if (a.stargazers_count === b.stargazers_count) {
            return b.forks_count - a.forks_count;
          } else {
            return b.stargazers_count - a.stargazers_count
          }
        })
        .slice(0, 12)
      )
    );
  }
}
