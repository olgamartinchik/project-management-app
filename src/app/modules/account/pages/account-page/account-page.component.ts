import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// sevices
import { ApiService } from '../../../core/services/api/api.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ConfirmService } from '../../../core/services/confirm.service';

// models
import { UserModel } from '../../../core/models/user.model';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountPageComponent implements OnInit {
  public currentUser$!: Observable<UserModel>;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    public confirmService: ConfirmService,
  ) {}

  public ngOnInit(): void {
    this.getUserData();
  }

  public confirmationDeleteUser(): void {
    this.confirmService.open(this.deleteUser);
  }

  public deleteUser = (): void => {
    this.apiService.deleteUser(this.authService.getItem('userId')!).subscribe(() => {
      this.authService.clearStorage();
      this.router.navigateByUrl('/auth');
    });
  };

  public getUserData(): void {
    this.currentUser$ = this.apiService.getUserById(this.authService.getItem('userId')!);
  }
}
