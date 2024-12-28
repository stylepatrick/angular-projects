import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {Repository} from '../models/repository';
import {Organization} from '../models/organization';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  readonly username = 'stylepatrick';
  private userUrl = 'https://api.github.com/users/' + this.username;

  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    return this.http.get<User>(this.userUrl);
  }

  getRepos(): Observable<Repository[]> {
    return this.http.get<Repository[]>(this.userUrl + '/repos');
  }

  getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.userUrl + '/orgs');
  }

}
