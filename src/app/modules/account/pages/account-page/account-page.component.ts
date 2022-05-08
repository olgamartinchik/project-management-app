import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../core/services/api/api.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { UserModel } from '../../../core/models/api.service.models';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountPageComponent implements OnInit {
  public currentUser$!: Observable<UserModel>;

  constructor(private apiService: ApiService, private authService: AuthService) {}

  public ngOnInit(): void {
    this.getUserData();
  }

  public getUserData(): void {
    this.currentUser$ = this.apiService.getUserById(this.authService.getItem('userId')!);
  }
}
