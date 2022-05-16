import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  Type,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { PopupHostDirective } from '../../directives/popup-host.directive';

// services
import { ConfirmService } from '../../services/confirm.service';
import { BoardPopupService } from '../../services/board-popup.service';
import { ToggleScrollService } from '../../services/toggle-scroll.service';

// components
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { BoardPopupComponent } from '../board-popup/board-popup.component';

@Component({
  selector: 'app-popup-container',
  templateUrl: './popup-container.component.html',
  styleUrls: ['./popup-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupContainerComponent implements OnInit, OnDestroy {
  @ViewChild(PopupHostDirective, { static: true }) private popupHost!: PopupHostDirective;

  public isOpen = false;

  private subscription: Subscription = new Subscription();

  constructor(
    private confirmService: ConfirmService,
    private boardPopupService: BoardPopupService,
    private toggleScrollService: ToggleScrollService,
    private cdr: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.subscription.add(
      this.confirmService.subject$.subscribe((value) => {
        this.loadComponent(value.isOpen, ConfirmPopupComponent);
      }),
    );

    this.subscription.add(
      this.boardPopupService.subject$.subscribe((value) => {
        this.loadComponent(value.isOpen, BoardPopupComponent);
      }),
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public clear(): void {
    this.isOpen = false;
    this.toggleScrollService.showScroll();

    // очищаем контейнер через пол секунды, чтобы отобразить анимацию
    setTimeout(() => this.popupHost.viewContainerRef.clear(), 500);
  }

  private loadComponent(
    isOpen: boolean,
    component: Type<ConfirmPopupComponent | BoardPopupComponent>,
  ): void {
    this.isOpen = isOpen;

    if (this.isOpen) {
      this.popupHost.viewContainerRef.createComponent(component);
      this.toggleScrollService.hiddenScroll();
    } else {
      this.clear();
    }

    this.cdr.markForCheck();
  }
}
